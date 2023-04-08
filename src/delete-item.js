const AWS = require('aws-sdk')

module.exports.handler = async event => {

    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    const { id } = event.pathParameters
    
    try {
        await dynamoDB.delete({
            TableName: "ItemTableNew",
            Key: {id}
        }).promise()
    } 
    catch (error) {
        console.log(error)
    }

    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: 'item deleted'
        })
    }
}