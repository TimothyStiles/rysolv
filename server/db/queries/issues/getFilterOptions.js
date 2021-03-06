const { singleQuery } = require('../../baseQueries');

const getFilterOptions = async () => {
  const queryText = `
    SELECT
    (SELECT COALESCE(ARRAY_AGG(DISTINCT(language)), '{}') FROM languages WHERE issue_id IS NOT NULL) AS "issueLanguages",
    (SELECT COALESCE(ARRAY_AGG(DISTINCT(language)), '{}') FROM languages WHERE organization_id IS NOT NULL) AS "organizationLanguages",
    (SELECT COALESCE(ARRAY_AGG(DISTINCT(language)), '{}') FROM languages WHERE user_id IS NOT NULL) AS "userLanguages",
    (SELECT COUNT(*) FROM issues WHERE funded_amount = 0 AND is_deleted = false AND open = true) AS "unfundedIssues",
    (SELECT COALESCE(ARRAY_AGG(name), '{}') from organizations WHERE is_deleted = false) AS organizations,
    (SELECT COUNT(*) FROM issues WHERE is_deleted = false AND open = false) AS "closedIssues",
    (SELECT COUNT(*) FROM issues WHERE funded_amount > 0 AND is_deleted = false AND open = true) AS "fundedIssues",
    (SELECT COALESCE(MAX(funded_amount), 0) FROM issues WHERE is_deleted = false) AS "maxBounty",
    (SELECT COALESCE(MAX(funded_amount),0) FROM (SELECT organization_id, SUM(funded_amount) as funded_amount FROM payments GROUP BY organization_id) AS sub) AS "maxOrgFunded",
    (SELECT COUNT(*) FROM issues WHERE is_deleted = false AND type = 'Feature') AS "featureTag",
    (SELECT COUNT(*) FROM issues WHERE is_deleted = false AND type = 'Bug') AS "bugTag"
  `;
  const { rows } = await singleQuery({ queryText });
  const [oneRow] = rows;
  return oneRow;
};

module.exports = getFilterOptions;
