const { Joi } = require('express-validation')
module.exports = {

    addNewStock: {
        body: Joi.object({
            name: Joi.string().required()
        })
    },
    getOneStockValidation: {
        params: Joi.string().required()
    }





}
