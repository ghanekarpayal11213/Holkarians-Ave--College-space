const Stock = require('../models/stock.model')
const { getRandomNumber } = require('../utils')
const { Schema, default: mongoose } = require('mongoose')
module.exports = {
    getAllStocks: () => {

        return Stock.find({})
    },
    addNewStock: async (stock) => {
        const newStock = new Stock()
        newStock.identifier = stock.identifier
        newStock.name = stock.name
        newStock.lastTradedPrice = getRandomNumber() * 100
        newStock.todaysHigh = getRandomNumber() * 100
        newStock.todaysLow = getRandomNumber() * 100
        return await newStock.save()

    },
    getOne: async (id) => {
        console.log('id', id)
        const objectId = new mongoose.Types.ObjectId(id);


        const stock = await Stock.findOne({_id:id})
        if (!stock) throw new Error('Not Found')
        const { name, _id } = stock
        return {
            _id,
            name,
            lastTradedPrice:(getRandomNumber() * 1000).toFixed(2),
            todaysLow:(getRandomNumber() * 1000).toFixed(2),
            todaysHigh:(getRandomNumber() * 1000).toFixed(2),

        }
    }
}