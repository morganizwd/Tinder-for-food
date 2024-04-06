import express from 'express';
import mongoose from 'mongoose';
import multer from 'multer';
import cors from 'cors';
import { adminOnlyAuth } from './utils';

import {
    userController,
    categoryController,
    dishController,
    restaurantController,
} from './controllers/index.js';

import {
    loginValidation,
    registerValidation,
    createCategoryValidation,
    updateCategoryValidation,
    createRestaurantValidation,
    updateRestaurantValidation,
    createDishValidation,
    updateDishValidation,
} from './validations.js';

import {
    adminOnlyAuth,
    allRolesAuth,
    handleValidationErrors,
} from './utils/index.js';

mongoose
    .connect('mongodb+srv://admin:Hesus2016@cluster0.vgtv5yo.mongodb.net/Tinder-for-food')
    .then(() => console.log('DB OK'))
    .catch((err) => console.log('DB ERROR', err));

const app = express();

const storage = multer.diskStorage({
    destination: (_, __, cb) => {
        cb(null, 'uploads')
    },
    filename: (_, file, cb) => {
        cb(null, file.originalname)
    },
});

const upload = multer({ storage });

app.use(express.json());
app.use(cors());
app.use('/uploads', express.static('uploads'));

//media upload pathes
app.post('/upload', upload.single('image'), (req, res) => {
    res.json({
        url: `/uploads/${req.file.originalname}`,
    });
});

//auth
app.post('/auth/login', loginValidation, handleValidationErrors, userController.login);
app.post('/auth/register', registerValidation, handleValidationErrors, userController.register);
app.get('/auth/me', allRolesAuth, userController.getMe);
app.get('/user/:userId', allRolesAuth, userController.getUserById);
app.get('/users', userController.getAllUsers);

//category
app.post('/category/create', adminOnlyAuth, createCategoryValidation, handleValidationErrors, categoryController.create);
app.delete('/category/delete/:id', adminOnlyAuth, categoryController.remove);
app.patch('/category/update/:id', adminOnlyAuth, updateCategoryValidation, handleValidationErrors, categoryController.update);
app.get('/categories', allRolesAuth, categoryController.getAll);
app.get('/categories/:id', allRolesAuth, categoryController.getOne);

//dish
app.post('/dish/create', adminOnlyAuth, createDishValidation, handleValidationErrors, dishController.create);
app.delete('/dish/delet/:id', adminOnlyAuth, dishController.remove);
app.patch('/dish/update/:id', adminOnlyAuth, updateDishValidation, handleValidationErrors, dishController.update);
app.get('/dishes', allRolesAuth, dishController.getAll);
app.get('/dishes/:id', allRolesAuth, dishController.getOne);

//restaurant
app.post('/restaurant/create', adminOnlyAuth, createRestaurantValidation, handleValidationErrors, restaurantController.create);
app.delete('/restaurant/delet/:id', adminOnlyAuth, restaurantController.remove);
app.patch('/restaurant/update/:id', adminOnlyAuth, updateRestaurantValidation, handleValidationErrors, restaurantController.update);
app.get('/restaurants', allRolesAuth, restaurantController.getAll);
app.get('/restaurants/:id', allRolesAuth, restaurantController.getOne);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log('Server OK');
});