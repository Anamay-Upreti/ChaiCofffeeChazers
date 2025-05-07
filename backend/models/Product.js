import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
{
    name: {
    required: true,
    type: String,
},
    description: String,
    price:{
        required: true,
        type: Number
    },
    image: String,
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
},
     {timestamps: true}
);

const Product = mongoose.model('Product', productSchema);

export default Product;