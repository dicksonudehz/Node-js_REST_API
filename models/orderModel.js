import mongoose from 'mongoose'

const orderSchema = mongoose.Schema(
  {
    orderItems:[{
      name: {type: String, required: true},
      price: {type: Number, required: true},
      product: {type:  String, required: true},
      image: {type: String},
      qty: {type: Number}
    }],
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true},
    totalPrice: {type: Number, required: true},
    address: {type: String, required: true},
    isPaid: {type: Boolean, default: false, required: true},
    isDelivered: {type: Boolean, default: false, required: true},
    orderRef: {type: String, required: true}
  },
  {
    timestamps: true,
  }
)

const Order = mongoose.model('Order', orderSchema)

export default Order