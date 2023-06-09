const AWS = require('aws-sdk')

module.exports.handler = async event => {

    const dynamoDB = new AWS.DynamoDB.DocumentClient()
    let items

    try {
        const results = await dynamoDB.scan({
            TableName: "ItemTableNew"
        }).promise()

        items = results.Items
    }
    catch (error) {
        console.log(error)        
    }

    return {
        statusCode: 200,
        body: JSON.stringify(items)
    }
}
