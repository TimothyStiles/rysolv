const {
  createActivity,
  getOrganizationActivity,
  getUserActivity,
} = require('./queries/activity');
const { createComment, getIssueComments } = require('./queries/comments');
const {
  checkDuplicateIssue,
  closeIssue,
  createIssue,
  downvoteIssue,
  getIssues,
  getOneIssue,
  searchIssues,
  transformIssue,
  updateIssueArray,
  upvoteIssue,
} = require('./queries/issues');
const {
  checkDuplicateOrganization,
  createOrganization,
  getOneOrganization,
  getOrganizations,
  getOrganizationsWhere,
  searchOrganizations,
  transformOrganization,
  updateOrganizationArray,
} = require('./queries/organizations');
const {
  submitAccountDepositUser,
  submitAccountPaymentIssue,
  submitAccountPaymentOrganization,
  submitAccountPaymentUser,
} = require('./queries/payments');
const {
  checkDuplicatePullRequest,
  createPullRequest,
  deletePullRequest,
  getOnePullRequest,
  getPullRequestList,
  getUserPullRequests,
} = require('./queries/pullRequests');
const {
  checkDuplicateUserEmail,
  checkDuplicateUsername,
  createUser,
  getOneUser,
  getOneUserSignUp,
  getUsers,
  getUserWatchList,
  getWatchList,
  searchUsers,
  transformUser,
  updateUserArray,
} = require('./queries/users');
const { toggleWatching } = require('./queries/watching');
const {
  createWithdrawal,
  transformUserBalance,
} = require('./queries/withdrawal');

module.exports = {
  checkDuplicateIssue,
  checkDuplicateOrganization,
  checkDuplicatePullRequest,
  checkDuplicateUserEmail,
  checkDuplicateUsername,
  closeIssue,
  createActivity,
  createComment,
  createIssue,
  createOrganization,
  createPullRequest,
  createUser,
  createWithdrawal,
  deletePullRequest,
  downvoteIssue,
  getIssueComments,
  getIssues,
  getOneIssue,
  getOneOrganization,
  getOnePullRequest,
  getOneUser,
  getOneUserSignUp,
  getOrganizationActivity,
  getOrganizations,
  getOrganizationsWhere,
  getPullRequestList,
  getUserActivity,
  getUserPullRequests,
  getUsers,
  getUserWatchList,
  getWatchList,
  searchIssues,
  searchOrganizations,
  searchUsers,
  submitAccountDepositUser,
  submitAccountPaymentIssue,
  submitAccountPaymentOrganization,
  submitAccountPaymentUser,
  toggleWatching,
  transformIssue,
  transformOrganization,
  transformUser,
  transformUserBalance,
  updateIssueArray,
  updateOrganizationArray,
  updateUserArray,
  upvoteIssue,
};
