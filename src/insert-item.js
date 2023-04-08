
// npm install uuid aws-sdk
const { v4 } = require('uuid')
const AWS = require('aws-sdk')

module.exports.handler = async event => {
    const { item } = JSON.parse(event.body)
    const createdAt = new Date().toISOString()
    const id = v4()

    const dynamoDB = new AWS.DynamoDB.DocumentClient()

    const newItem = {
        id, 
        item, 
        createdAt, 
        itemStatus: false
    }

    let result = await dynamoDB.put(
        {
            TableName: 'ItemTableNew',
            Item: newItem 
        }
    ).promise()

    return {
        result,
        statusCode: 200,
        body: JSON.stringify(newItem)
    }
}
