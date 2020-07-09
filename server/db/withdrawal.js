const { singleQuery } = require('../db/query');

// CREATE single withdrawal
const createWithdrawal = async (userId, fee, transferValue) => {
  const withdrawalQuery = `
    INSERT INTO withdrawal(fee, transfer_value, user_id)
    VALUES(${fee}, ${transferValue}, '${userId}')
    RETURNING *`;
  const { rows } = await singleQuery(withdrawalQuery);
  return rows;
};

// PATCH single user balance
const transformUserBalance = async (userId, adjustedBalanceValue) => {
  const userBalanceQuery = `
    UPDATE users SET
      balance = ${adjustedBalanceValue}
    WHERE (id = '${userId}')
    RETURNING *`;
  const { rows } = await singleQuery(userBalanceQuery);
  return rows;
};

module.exports = { createWithdrawal, transformUserBalance };
