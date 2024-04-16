import { body, param } from 'express-validator';

//auth validation
export const loginValidation = [
    body('email', 'Invalid email format').notEmpty().isEmail(),
    body('password', 'Password shoud be at least 5 symbols').isLength({ min: 8 }),
];

export const registerValidation = [
    body('email', 'Invalid email format').notEmpty().isEmail(),
    body('password', 'Password should be at least 8 symbols').isLength({ min: 8 }),
    body('name', 'Name is too short').isLength({ min: 2 }),
    body('surname', 'Name is too short').isLength({ min: 2 }),
    body('role', 'Invalid role').custom((value) => {
        const roles = ['student', 'admin', 'teacher'];
        if (!roles.includes(value)) {
            throw new Error('Invalid role');
        }
        return true;
    }),
];

// category validations
export const createCategoryValidation = [
    body('name', 'Category name is required and should not be empty')
        .notEmpty().withMessage('Name field is required')
        .isLength({ min: 2, max: 32 }).withMessage('Name must be between 2 and 32 characters'),
    body('description', 'Description is required and should not be empty')
        .notEmpty().withMessage('Description field is required')
        .isLength({ min: 5, max: 200 }).withMessage('Description must be between 5 and 200 characters'),
    body('imageUrl', 'Invalid URL format for image').optional(),
];

export const updateCategoryValidation = [
    body('name', 'Name must be between 2 and 50 characters')
        .optional()
        .notEmpty().withMessage('Name field, if provided, cannot be empty')
        .isLength({ min: 2, max: 32 }).withMessage('Name must be between 2 and 32 characters'),
    body('description', 'Description must be between 5 and 200 characters')
        .optional()
        .notEmpty().withMessage('Description field, if provided, cannot be empty')
        .isLength({ min: 5, max: 200 }).withMessage('Description must be between 5 and 200 characters'),
    body('imageUrl', 'Invalid URL format for image').optional(),
];

// restaurant validation
export const createRestaurantValidation = [
    body('name', 'Restaurant name is required and should not be empty')
        .notEmpty().withMessage('Name field is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('address', 'Address is required and should not be empty')
        .notEmpty().withMessage('Address field is required')
        .isLength({ min: 10, max: 100 }).withMessage('Address must be between 10 and 100 characters'),
    body('description', 'Description is required and should not be empty')
        .notEmpty().withMessage('Description field is required')
        .isLength({ min: 5, max: 200 }).withMessage('Description must be between 5 and 200 characters'),
    body('menu')
        .optional()
        .isArray().withMessage('Menu must be an array of dish IDs'),
    body('rating', 'Rating must be a number between 0 and 5')
        .optional()
        .isFloat({ min: 0, max: 5 }).withMessage('Invalid rating value'),
    body('imageUrl', 'Invalid URL format for image')
        .optional()
        .isURL().withMessage('Must be a valid URL format for the image'),
];

export const updateRestaurantValidation = [
    body('name', 'Name must be between 2 and 50 characters')
        .optional()
        .notEmpty().withMessage('Name field, if provided, cannot be empty')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('address', 'Address must be between 10 and 100 characters')
        .optional()
        .notEmpty().withMessage('Address field, if provided, cannot be empty')
        .isLength({ min: 10, max: 100 }).withMessage('Address must be between 10 and 100 characters'),
    body('description', 'Description must be between 5 and 200 characters')
        .optional()
        .notEmpty().withMessage('Description field, if provided, cannot be empty')
        .isLength({ min: 5, max: 200 }).withMessage('Description must be between 5 and 200 characters'),
    body('menu')
        .optional()
        .isArray().withMessage('Menu, if provided, must be an array of dish IDs'),
    body('rating', 'Rating must be a number between 0 and 5')
        .optional()
        .isFloat({ min: 0, max: 5 }).withMessage('Invalid rating value'),
    body('imageUrl', 'Invalid URL format for image')
        .optional()
        .isURL().withMessage('Must be a valid URL format for the image'),
];

// dish validations
export const createDishValidation = [
    body('name', 'Dish name is required and should not be empty')
        .notEmpty().withMessage('Name field is required')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('description', 'Description is required and should not be empty')
        .notEmpty().withMessage('Description field is required')
        .isLength({ min: 5, max: 200 }).withMessage('Description must be between 5 and 200 characters'),
    body('price', 'Price is required and must be a number')
        .notEmpty().withMessage('Price field is required')
        .isNumeric().withMessage('Price must be a number')
        .isFloat({ min: 0 }).withMessage('Price must be greater than or equal to 0'),
    body('imageUrl', 'Invalid URL format for image')
        .optional()
        .isURL().withMessage('Must be a valid URL format for the image'),
    body('categories')
        .optional()
        .isArray().withMessage('Categories must be an array of category IDs'),
];

export const updateDishValidation = [
    body('name', 'Name must be between 2 and 50 characters')
        .optional()
        .notEmpty().withMessage('Name field, if provided, cannot be empty')
        .isLength({ min: 2, max: 50 }).withMessage('Name must be between 2 and 50 characters'),
    body('description', 'Description must be between 5 and 200 characters')
        .optional()
        .notEmpty().withMessage('Description field, if provided, cannot be empty')
        .isLength({ min: 5, max: 200 }).withMessage('Description must be between 5 and 200 characters'),
    body('price', 'Price must be a number and greater than or equal to 0')
        .optional()
        .notEmpty().withMessage('Price field, if provided, cannot be empty')
        .isNumeric().withMessage('Price must be a number')
        .isFloat({ min: 0 }).withMessage('Price must be greater than or equal to 0'),
    body('imageUrl', 'Invalid URL format for image')
        .optional()
        .isURL().withMessage('Must be a valid URL format for the image'),
    body('categories')
        .optional()
        .isArray().withMessage('Categories, if provided, must be an array of category IDs'),
];