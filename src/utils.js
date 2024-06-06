module.exports = {
    getSuccessResponse: ({ request, response, data }) => {
        response.send({
            status: true,
            data,
        })
    },
    getFailureResponse: ({ request, response, error }) => {
        const message = error.message ?? 'An Internal Server Error'
        response.status(501).send(message)
    },
    getRandomNumber: () => {
        return Math.random()
    }
}