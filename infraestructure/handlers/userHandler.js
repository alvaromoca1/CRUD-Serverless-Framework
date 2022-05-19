'use strict';
const responseHttp = require('../helpers/response')
const { 
  getUsers: getUsersController,
  createUser:createUserController,
  updateUser:updateUserController,
  deleteUser:deleteUserController,
  getDetailUser:getDetailUserController
} = require('../../application/controllers/userController')

module.exports.getUsers = async (event) => {
  const { success, data, message, statusCode } = await getUsersController();
  return responseHttp(success, data, message, statusCode);
};
module.exports.createUser = async (event) => {
  const { success, data, message, statusCode } = await createUserController(JSON.parse(event.body));
  return responseHttp(success, data, message, statusCode);
};
module.exports.updateUser = async (event) => {
  const { success, data, message, statusCode } = await updateUserController(JSON.parse(event.body),event.pathParameters.id);
  return responseHttp(success, data, message, statusCode);
};
module.exports.deleteUser = async (event) => {
  const { success, data, message, statusCode } = await deleteUserController(event.pathParameters.id);
  return responseHttp(success, data, message, statusCode);
};
module.exports.getDetailUser = async (event) => {
  const { success, data, message, statusCode } = await getDetailUserController(event.pathParameters.id);
  return responseHttp(success, data, message, statusCode);
};
