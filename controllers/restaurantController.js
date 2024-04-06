import RestaurantModel from '../models/restaurant.js';

export const create = async (req, res) => {
    try {
        const restaurant = new RestaurantModel({
            name: req.body.name,
            description: req.body.description,
            address: req.body.address,
            menu: req.body.menu,
        });
        await restaurant.save();
        res.status(201).json(restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const update = async (req, res) => {
    try {
        const restaurantId = req.params.id;

        await RestaurantModel.updateOne(
            {
                _id: restaurantId,
            },
            {
                name: req.body.name,
                description: req.body.description,
                address: req.body.address,
                menu: req.body.menu,
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
        const restaurants = await RestaurantModel.find();
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const getOne = async (req, res) => {
    try {
        const restaurant = await RestaurantModel.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'Restaurant not found' });
        }
        res.json(restaurant);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

export const remove = async (req, res) => {
    try {
        const restaurant = await RestaurantModel.findById(req.params.id);
        if (!restaurant) {
            return res.status(404).json({ message: 'restaurant not found' });
        }
        await RestaurantModel.deleteOne({ _id: req.params.id });
        res.json({ message: 'restaurant successfully deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};