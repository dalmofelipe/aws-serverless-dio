const AWS = require('aws-sdk')

module.exports.handler = async event => {

    const { itemStatus } = JSON.parse(event.body)
    const { id } = event.pathParameters

    const dynamoDB = new AWS.DynamoDB.DocumentClient()

    await dynamoDB.update({
        TableName: "ItemTableNew",
        Key: { id },
        UpdateExpression: 'set itemStatus = :itemStatus',
        ExpressionAttributeValues: {
            ':itemStatus': itemStatus
        },
        ReturnValues: "ALL_NEW"
    }).promise()

    // await dynamoDB.update({
    //     TableName: "ItemTableNew",
    //     Key: { id },
    //     UpdateExpression: 'set itemStatus = :itemStatus, item = :item', // item é palavra reservado do DynamoDB
    //     ExpressionAttributeValues: {
    //         ':item': item,
    //         ':itemStatus': itemStatus
    //     },
    //     ReturnValues: "ALL_NEW"
    // }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify({
            msg: 'item updated'
        })
    }
}