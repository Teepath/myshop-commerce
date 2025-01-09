const mongoose = require('mongoose');

const productScheme = new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    price: {
        type: Number,
        required:true 
    },
    countInStock: {
        type: Number,
        required:true 
    },
    category: {
        type: String,
        required: true,
      },
    imageUrl: {
        type: String,
        required:true
    },
    createdAt: {
        type: Date,
        default: Date.now,
      },
      currency:{
        type: String,
        default: 'USD',
        enum: ['USD', 'EUR', 'GBP', 'NGN']
      },
      updatedAt: {
        type: Date,
        default: Date.now,
      },

      
},
{ timestamps: true }

)


const Product = mongoose.model('product', productScheme);


module.exports = Product;