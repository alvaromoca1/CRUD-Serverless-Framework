const { responseSuccess, responseFail } = require('../helpers/responses');
const { StatusCodes } = require('http-status-codes')
const {DynamoConnection} = require('../../infraestructure/repositories/dynamoConnetion');
const { GetItemCommand, ScanCommand,PutItemCommand,DeleteItemCommand } = require('@aws-sdk/client-dynamodb');
const { v4: uuidv4 } = require('uuid');
const { getUserQuery,createUserQuery,updateUserQuery,deleteUserQuery,detailUserQuery} = require('../../infraestructure/repositories/userQuery');

const data = [
    {
        hello:"good code in the day"
    }
];
function userItem(item) {
    const stripped = {
      id: item.id.S,
    };
    stripped.name = item.name ? item.name.S : undefined;
    stripped.lastName = item.lastName ? item.lastName.S : undefined;
    stripped.company = item.company ? item.company.S : undefined;
  
    return stripped;
  }

const getUsers = async() =>{
    let response = null
    try {
        let data = await getUserQuery();
        response = responseSuccess({ data });
    } catch (error) {
        response = responseFail({
            message: "Error inesperado"
        });
    }
    return response;
}

const createUser = async(bodyUser) =>{
    let response = null
    try {
        let data = await createUserQuery(bodyUser);
        response = responseSuccess({ data});
    } catch (error) {
        response = responseFail({
            message: "Error inesperado"
        });
    }
    return response;
}

const updateUser = async(bodyUser, id) =>{
    let response = null
    try {
        const data = await updateUserQuery(bodyUser, id)
        response = responseSuccess({ data });
    } catch (error) {
        response = responseFail({
            message: "Error inesperado"
        });
    }
    return response;
}

const deleteUser = async(id) =>{
    let response = null
    try {
        const data = await deleteUserQuery(id);
        response = responseSuccess({ data });
    } catch (error) {
        response = responseFail({
            message: "Error inesperado"
        });
    }
    return response;
}

const getDetailUser = async(id) =>{
    let response = null
    try {
        const data =await detailUserQuery(id);
        response = responseSuccess({ data });
    } catch (error) {
        response = responseFail({
            message: "Error inesperado"
        });
    }
    return response;
}
module.exports = {
    getUsers,
    createUser,
    updateUser,
    deleteUser,
    getDetailUser
}