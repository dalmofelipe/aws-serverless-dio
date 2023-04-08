
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
        ItemStatus: false
    }

    await dynamoDB.put(
        {
            TableName: 'ItemTableNew',
            Item: newItem 
        }
    )

    return {
        statusCode: 200,
        body: JSON.stringify(newItem)
    }
}

