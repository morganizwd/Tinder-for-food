import DishModel from '../models/dish.js';

export const create = async (req, res) => {
    try {
        const dish = new DishModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            imageUrl: req.body.imageUrl,
            categories: req.body.categories,
        });
        await dish.save();
        res.status(201).json(dish);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const dishId = req.params.id;

        await DishModel.updateOne(
            {
                _id: dishId,
            },
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                imageUrl: req.body.imageUrl,
                categories: req.body.categories,
            },
        );

        res.json({
            success: true,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: 'Update attempt failed',
        });
    }
};

export const getAll = async (req, res) => {
    try {
        const dishes = await DishModel.find();
        res.json(dishes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getOne = async (req, res) => {
    try {
        const dish = await DishModel.findById(req.params.id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        res.json(dish);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const remove = async (req, res) => {
    try {
        const dish = await DishModel.findById(req.params.id);
        if (!dish) {
            return res.status(404).json({ message: 'Dish not found' });
        }
        await DishModel.deleteOne({ _id: req.params.id });
        res.json({ message: 'Dish successfully deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};