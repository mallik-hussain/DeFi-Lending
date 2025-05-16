import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
export const registerUser = async (req, res) => {
    try {
        const { username, fullname, email, password } = req.body;
        if (!username || !fullname || !email || !password) {
            return res.status(400).json({
                status: 'false',
                message: 'Please fill all fields'
            })
        }
        const existingEmail = await User.findOne({ email });
        if(existingEmail){
            return res.status(400).json({
                status: 'false',
                message: 'Email already exists'
            })  
        }
        const existingUsername = await User.findOne({userName:username});
        if(existingUsername){
            return res.status(400).json({
                status: 'false',
                message: 'Username already exists'
            })
        }
        const passwordHash = await bcrypt.hash(password, 12);
        const user = new User({
            userName: username,
            fullName: fullname,
            email,
            password: passwordHash
        })
        await user.save();
        res.status(201).json({
            status: 'success',
            message: 'User registered successfully'
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'false',
            message: err.message
        })
    }
}

export const loginUser = async (req, res) => {
    try {
        const { usernameOrEmail, password } = req.body;
        if (!usernameOrEmail || !password) {
            throw new Error('Please fill all fields')
        }
        const user = await User.findOne({ $or: [{ userName: usernameOrEmail }, { email: usernameOrEmail }] });
        if (!user) {
            return res.status(400).json({
                status: 'false',
                message: 'User do not exist'
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({
                status: 'false',
                message: 'Invalid Credentials'
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '72h' });
        res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            token
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'false',
            message: err.message
        })
    }
}

export const getUser = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.find({ _id: id });
        res.status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'false',
            message: err.message
        })
    }
}

