const { Schema, default: mongoose } = require('mongoose')
const stockSchema = new Schema({    
  
    identifier: String,
    name: String,
    lastTradedPrice: Number,
    todaysHigh: Number,
    todaysLow: Number,

})
stockSchema.path('_id')
module.exports = mongoose.model('Stock',stockSchema);