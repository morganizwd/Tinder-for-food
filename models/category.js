import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            maxlength: 32,
        },
        description: {
            type: String,
            required: true,
        },
        imageUrl: String,
    },
    {
        timestamps: true,
    },
);

export default mongoose.model('Category', CategorySchema);