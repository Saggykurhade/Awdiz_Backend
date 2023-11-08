import mongoose, { Schema } from "mongoose";

const product = new Schema ({
    name: String,
    price: Number,
    category: String,
    image: String,
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
},{timestamps:true})

export default mongoose.model('Product', product)