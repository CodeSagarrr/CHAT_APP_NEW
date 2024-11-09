
import { RegisterModel } from "../Model/AuthSchema.js";
import { memberModel } from '../Model/chatMembersSchema.js'
import { chatModel } from "../Model/Conversation.js";
import cloudinary from 'cloudinary';


cloudinary.v2;



// getUser

export const getUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await RegisterModel.findById(id);
        if (!user) {
            return res.json({ msg: "User not found" })
        } else {
            res.json(user);
        }
    } catch (error) {
        console.log(error.message)
    }
}

// add user in member array

// export const addTwoUser = async (req, res) => {
//     const { senderId, receiverId } = req.body;
//     try {
//         const user = new memberModel({
//             members: [senderId, receiverId]
//         })
//         await user.save();
//         res.status(200).json(user)
//     } catch (error) {
//         console.log(error.message)
//     }
// }
export const otherUserAdd = async (req, res) => {
    const { currentUser } = req.params;
    const { email } = req.body;
    console.log('email ' , email)
    try {
        const userEmail = await RegisterModel.findOne({email:email});
        if(!userEmail) return res.json({ msg:'User not registered' }); // Send 404 status if user not found
        const conversation = await memberModel.create({
            members: [currentUser, userEmail._id.toString()],
        });
        res.json({ msg:'success', conversation }); // Send 200 status if user added
    } catch (error) {
        console.error(error);
        res.status(500).json({ msg:'Internal server error' }); // 500 status for any other error
    }
};

// get User from member array 
export const getUserFromMember = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await memberModel.find({ members: { $all: [id] } });
        if (!user) {
            return res.json({ msg: "User not found" })
        } else {
            res.json(user)
        }
    } catch (error) {
        console.log(error.message)
    }
}


// add user message in database

export const addMessage = async (req, res) => {
    const { sender, message, receiver } = req.body;
    try {
        const userMessage = new chatModel({
            sender,
            message,
            receiver
        })
        await userMessage.save();
        res.status(200).json(userMessage)
    } catch (error) {
        console.log(error.message)
    }
}

// get user message from message database

export const getUserMessage = async (req, res) => {
    const { receiver } = req.params;
    try {
        const userMessage = await chatModel.find({ receiver });
        if (!userMessage) {
            return res.json({ msg: "User not found" })
        } else {
            res.json(userMessage)
        }
    } catch (error) {
        console.log(error.message)
    }
}

// change user profile pic 
export const changeProfilePic = async (req, res) => {
    const { id } = req.params;
    const dpFilename = req.file.path;

    try {
        const cloudImage = await cloudinary.uploader.upload(dpFilename, { resource_type: 'auto' });
        console.log(cloudImage)
        if (!cloudImage) {
            return res.json({ msg: 'Failed to upload profile picture' });
        }
        const updatedUser = await RegisterModel.findByIdAndUpdate(
            id,
            { profilepic: cloudImage.url },
            { new: true }
        );
        if (!updatedUser) {
            return res.json({ msg: 'User not found' });
        }
        res.status(200).json({ msg: 'Profile Pic Updated', updatedUser });

    } catch (error) {
        res.status(500).json({ msg: 'Server Error', error: error.message });
    }
};