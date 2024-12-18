import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import UserModel from '../models/user.js';

export const register = async (req, res) => {
    try {
        const { email, password, name, surname, role, imageUrl } = req.body;
        const salt = await bcrypt.genSalt(10);
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email,
            name,
            surname,
            role,
            passwordHash: hash,
            imageUrl: imageUrl || '', // Optional, assuming imageUrl is not required
        });

        const user = await doc.save();

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            'secret123',
            { expiresIn: '30d' }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({ ...userData, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не удалось зарегистрироваться' });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const isValidPass = await bcrypt.compare(req.body.password, user.passwordHash);
        if (!isValidPass) {
            return res.status(400).json({ message: 'Wrong email or password' });
        }

        const token = jwt.sign(
            { _id: user._id, role: user.role },
            'secret123',
            { expiresIn: '30d' }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({ ...userData, token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Не удалось авторизоваться' });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: 'Access denied' });
    }
};

export const getUserById = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        let responseData = {
            _id: user._id,
            name: user.name,
            surname: user.surname,
            role: user.role,
            email: user.email,
            imageUrl: user.imageUrl, // Include imageUrl in the response
        };

        res.json(responseData);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};