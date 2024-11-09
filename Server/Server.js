import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { MongoConnect } from './DB/Mongoose.js';
import { handleRegister, handleLogin , handleLogout } from './Controller/AuthController.js'
import { getUser, otherUserAdd, getUserFromMember, addMessage, getUserMessage , changeProfilePic } from './Controller/ChatController.js';
import { checkToken } from './middleware/checkJwtToken.js'
import { registerSchema, loginSchema } from './Validation/registerValidation.js';
import validation from './middleware/checkValidation.js';
import { Server } from 'socket.io';
import http from 'http'
import cloudinary from 'cloudinary'
import { upload } from './multer/multer.js';


// configuration section 
const app = express();
dotenv.config()
cloudinary.v2
const server = http.createServer(app);

// initialization of sockets 

const io = new Server(server, cors())

// middleware sections

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser())
app.use(express.json())
app.use(cors())
MongoConnect(process.env.MONGODB_URL || ' mongodb://localhost:27017/newChatDatabase')


// routes sections 


app.route('/chat/register').post(validation(registerSchema), handleRegister);
app.route('/chat/login').post(validation(loginSchema), handleLogin);
app.route('/chat/logout').get(handleLogout)
app.route('/chat/:id').get(getUser);
app.route('/chat/chatmember/:currentUser').post(otherUserAdd);
app.route('/chat/chatmember/:id').get(getUserFromMember);
app.route('/chat/message').post(addMessage);
app.route('/chat/message/:receiver').get(getUserMessage);
app.route('/chat/profilePic/:id').put(upload.single('imageFile'),changeProfilePic);


app.get('/chat', checkToken, (req, res) => {
    res.json({ user: req.user, msg: 'access granted' });
})


// cloudinary configuration

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET
});


// socket connection
let activeUser = [];

io.on('connection', (socket) => {
    // add user in array
    socket.on('new-user-add', (newUserId) => {
        if (newUserId) {
            // Check if the user has not already been added
            if (!activeUser.some((user) => user.userId === newUserId)) {
                activeUser.push({ userId: newUserId, socketId: socket.id })
                console.log('new user added', activeUser);
                io.emit('get-user', activeUser);
            }
        }
    })
       // get data from client and send to all users whos connect to sockets

       socket.on('send-message' , (userData) =>{
        const { receiverId} = userData
        const user = activeUser.find((user) => user.userId === receiverId)
        console.log('getting id from recieved user', receiverId);
        console.log(userData)
        if(user){
            io.to(user.socketId).emit('received-message', userData)
        }
       })

         // disconnect the user
    socket.on('disconnect' , ()=>{
        activeUser = activeUser.filter((user)=>user.socketId !== socket.id);
        console.log('User disconnected',activeUser);
        io.emit('get-users',activeUser);
      })
})


// server listening configuration
const port = process.env.PORT || 4000
server.listen(port, () => console.log(`server running on port : ${port}`))