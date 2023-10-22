import Order from '../models/orderModel.js'
import randomstring from 'randomstring'

const createPODorder = async(req, res) => {
  try {
    const {orderItems, address} = req.body
    console.log(orderItems)
    const totalPrice = orderItems.reduce((acc, item) => acc + item.price * item.qty, 0)

    console.log(totalPrice)

    const orderRef = randomstring.generate({
      length: 10,
      charset: 'alphanumeric'
    })

    const newOrder = new Order({
      orderItems,   
      totalPrice, 
      address,
      user: req.user._id,
      orderRef
    })

    const saveOrder = await newOrder.save()

    if(saveOrder){
      res.json({status: true, message: "success", saveOrder})
    }else{
      throw new Error('unable to create order')
    }

  } catch (error) {
    throw new Error(error)
  }
}


const allUserOrders = async(req, res) => {
  try {
    const orders = await Order.find({user: req.user._id})
    if(orders){
      res.json({status: true, message: 'success', orders})
    }else{
      throw new Error('No order found')
    }
  } catch (err) {
    throw new Error(err)
  }
}

const allOrders = async(req, res) => {
  try {
    const orders = await Order.find({})
    if(orders){
      res.json({status: true, message: 'success', orders})
    }else{
      throw new Error('No order found')
    }
  } catch (err) {
    throw new Error(err)
  }
}

export {createPODorder, allUserOrders, allOrders}