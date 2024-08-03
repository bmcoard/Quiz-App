function verifyUser(request, response, next) {
    const{apiKey} = request.query //destructuring: extracting field from object
    console.log(apiKey)

    if(apiKey == null) {
        return response.status(401).json({error: "Invalid API Key"})
    }

    next()
}

module.exports = {  //brckets can hold multiple exports items
    verifyUser
}