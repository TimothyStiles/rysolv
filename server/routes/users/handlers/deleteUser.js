const { users, deleteMessage } = require('../../../mockData/users');

async function deleteUser(req, res, next) {
  try {
    const {
      params: { userId },
    } = req;
    req.data = req.data || {};
    const { username } = users.find(obj => obj.id === userId);
    req.data.message = username.concat(deleteMessage);
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = deleteUser;