const {DynamoConnection} = require('./dynamoConnetion');
const { GetItemCommand, ScanCommand,PutItemCommand,DeleteItemCommand } = require('@aws-sdk/client-dynamodb');
const { v4: uuidv4 } = require('uuid');

function userItem(item) {
    const stripped = {
      id: item.id.S,
    };
    stripped.name = item.name ? item.name.S : undefined;
    stripped.lastName = item.lastName ? item.lastName.S : undefined;
    stripped.company = item.company ? item.company.S : undefined;
  
    return stripped;
}
const getUserQuery = async()=>{
    const scanCommand = new ScanCommand({
        TableName: "Users",
    });
    const items = await DynamoConnection.send(scanCommand);
    let data = items.Items ? items.Items.map(userItem) : []
    return data;
}

const createUserQuery = async(bodyUser)=>{
    const dataBody={
        id:{S:uuidv4(15)},
        name:{S:bodyUser.name},
        lastName:{S:bodyUser.lastName},
        company:{S:bodyUser.company}
    }
    const putItemCommand = new PutItemCommand({
        Item: dataBody,
        TableName: "Users",
      });
    const data = await DynamoConnection.send(putItemCommand);
    return userItem(dataBody);

}

const updateUserQuery = async(bodyUser, id)=>{
    const dataBody={
        id:{S:id},
        name:{S:bodyUser.name},
        lastName:{S:bodyUser.lastName},
        company:{S:bodyUser.company}
    }
    const putItemCommand = new PutItemCommand({
        Item: dataBody,
        TableName: "Users",
      });
    const data=await DynamoConnection.send(putItemCommand);
    return userItem(dataBody);
}

const deleteUserQuery = async(id)=>{
    const deleteItemCommand = new DeleteItemCommand({
        Key: {
          id: {S: id},
        },
        TableName: "Users",
    });
    const data = await DynamoConnection.send(deleteItemCommand);
    return null;
}

const detailUserQuery = async(id)=>{
    const getItemCommand = new GetItemCommand({
        Key: { 
          id: {S: id},
        },
        TableName: "Users",
    });
    const item = await DynamoConnection.send(getItemCommand);
    const data = item.Item ? userItem(item.Item) : null;
    return data;

}

module.exports = {
    getUserQuery,
    createUserQuery,
    updateUserQuery,
    deleteUserQuery,
    detailUserQuery
}