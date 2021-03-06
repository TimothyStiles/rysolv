import React from 'react';
import T from 'prop-types';

import iconDictionary from 'utils/iconDictionary';
import { formatDollarAmount } from 'utils/globalHelpers';

import ConditionalRender from '../../ConditionalRender';
import { RewardWrapper } from '../../StyledWrappers';
import {
  AddFundsButton,
  FundAmount,
  FundIssueButtonContainer,
  StyledFundingWrapper,
} from './styledComponents';

const AddIcon = iconDictionary('add');

const FundIssueButton = ({
  disabled,
  dispatchOpenModal,
  fundedAmount,
  isInFundingQueue,
  isPullRequestMerged,
  issueId,
  open,
  rep,
}) => (
  <FundIssueButtonContainer>
    <ConditionalRender
      Component={<RewardWrapper fundedAmount={fundedAmount} />}
      FallbackComponent={
        <FundAmount open={open}>
          <StyledFundingWrapper
            open={open}
            value={formatDollarAmount(fundedAmount)}
          />
        </FundAmount>
      }
      shouldRender={!isInFundingQueue && isPullRequestMerged && !open}
    />
    <AddFundsButton
      disabled={disabled}
      open={open}
      onClick={() =>
        dispatchOpenModal({
          modalState: 'fundIssue',
          tableData: {
            fundedAmount,
            issueId,
            open,
            rep,
          },
        })
      }
    >
      {AddIcon}
    </AddFundsButton>
  </FundIssueButtonContainer>
);

FundIssueButton.defaultProps = { disabled: false };

FundIssueButton.propTypes = {
  disabled: T.bool,
  dispatchOpenModal: T.func.isRequired,
  fundedAmount: T.number.isRequired,
  isInFundingQueue: T.bool.isRequired,
  isPullRequestMerged: T.bool.isRequired,
  issueId: T.string.isRequired,
  open: T.bool.isRequired,
  rep: T.number.isRequired,
};

export default FundIssueButton;
