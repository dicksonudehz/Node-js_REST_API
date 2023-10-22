import mongoose from 'mongoose'

const productSchema = mongoose.Schema(
  {
    name: {type: String, required: true},
    price: {type: Number, required: true},
    category: {type: String, required: true},
    image:[{type: String, required: true}],
    review:[{
      name:{type: String},
      date: {type: Date},
      comment:{type: String},
      rating:{type: Number},
      user: {type: mongoose.Schema.Types.ObjectId, ref: "User"}
    }],
    description: {type: String, required: true},
    quantity: {type: Number, required: true},
    discount: {type: Number, default: 0, required: true},
    isDiscount: {type: Boolean, default: false, required: true},
    salesCount: {type: Number, default: 0, required: true},
    isAvailable: {type: Boolean, default: true, required: true},
    rating: {type: Number, default: 5, required: true},
    
  },
  {
    timestamps: true,
  }
);



const Product = mongoose.model('Product', productSchema)

export default Product