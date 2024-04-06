import mongoose, { Schema } from "mongoose";

const RestaurantSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        menu: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Dish',
            }
        ],
        rating: Number,
        imageUrl: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Restaurant', RestaurantSchema);