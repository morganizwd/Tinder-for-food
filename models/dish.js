import mongoose from "mongoose";

const Schema = mongoose.Schema;

const DishSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        imageUrl: String,
        categories: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Category',
            }
        ],
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Dish', DishSchema);