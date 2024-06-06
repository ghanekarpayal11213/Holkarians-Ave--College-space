const router = require('express').Router()
const { getStocks, addStock, getOneStock } = require('../controllers/stock.controller')
const { validate } = require('express-validation')
const { addNewStock, getOneStockValidation } = require('../validations/stock.validation')
/**
 All the routes related to stock module will be here.
 */

router.get('/', (request, response) => getStocks(request, response))
router.post('/', validate(addNewStock), (request, response) => addStock(request, response))
router.get('/:id',(request,response)=>getOneStock(request, response))


module.exports = router