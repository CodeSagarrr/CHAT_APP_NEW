import { RegisterModel } from "../Model/AuthSchema.js";
import bcrypt from 'bcrypt'
import JWT from 'jsonwebtoken'


export const handleRegister = async (req, res) => {
    const { firstname, lastname, email, password } = req.body;
    console.log(password)
    const salt = 8;
    const hashedPassword = await bcrypt.hash(password, salt)
    try {
        const user = new RegisterModel({
            firstname,
            lastname,
            email,
            password: hashedPassword,
        })
        await user.save();
        res.status(200).json({ msg: 'success' })

    } catch (error) {
        console.log(error.message);
    }
}

export const handleLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await RegisterModel.findOne({ email })
        if (!user) {
            return res.json({ msg: 'User not found' })
        } else {
            const passMatch = await bcrypt.compare(password, user.password);
            if (!passMatch) {
                return res.json({ msg: 'Invalid password' })
            } else {
                const token = JWT.sign({ email, password }, process.env.JWT_SECRETE_KEY, { expiresIn: '15days' })
                res.cookie('JWT', token)
                res.status(200).json(user)

            }
        }
    } catch (error) {
        console.log(error.message)
    }
}

// logout user
export const handleLogout = (req, res) => {
    const user = req.cookies.JWT;
    if (user) {
        res.clearCookie('JWT').json({ msg: 'user logged out' });
    }
}