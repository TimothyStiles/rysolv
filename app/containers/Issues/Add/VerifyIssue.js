import React, { Fragment } from 'react';
import T from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { push } from 'connected-react-router';

import { PrimaryAsyncButton, SecondaryButton } from 'components/base_ui';
import VerifyForm from 'components/Issues/Add/Verify';

import { incrementStep, saveInfo, verifyInfo } from '../actions';
import { verifyMessage } from '../constants';
import { makeSelectIssues, makeSelectIssuesRequestBody } from '../selectors';
import {
  ButtonGroup,
  SelectedOrganization,
  StyledCheckboxWithLabel,
  StyledH3,
  StyledLink,
  VerifyWrapper,
} from './styledComponents';

// eslint-disable-next-line react/prefer-stateless-function
export class VerifyIssue extends React.PureComponent {
  render() {
    const {
      activeUser,
      issueData,
      dispatchIncrementStep,
      dispatchSaveInfo,
      dispatchVerifyInfo,
      handleNav,
      isVerified,
      organizationData,
      requestBody,
    } = this.props;
    const handleSaveInfo = () => {
      dispatchSaveInfo({ requestBody, activeUser });
      handleNav('/issues');
    };
    return (
      <Fragment>
        <StyledH3>Organization</StyledH3>
        <VerifyWrapper>
          <SelectedOrganization>
            {organizationData.organizationName.value}
          </SelectedOrganization>
          <StyledLink
            href={organizationData.organizationRepo.value}
            target="_blank"
          >
            {organizationData.organizationRepo.value}
          </StyledLink>
        </VerifyWrapper>
        <StyledH3>Issue</StyledH3>
        <VerifyWrapper>
          <VerifyForm activeUser={activeUser} issueData={issueData} />
        </VerifyWrapper>
        <StyledCheckboxWithLabel
          checked={isVerified}
          label={verifyMessage}
          onChange={dispatchVerifyInfo}
        />
        <ButtonGroup>
          <SecondaryButton
            label="Edit Issue"
            onClick={() => dispatchIncrementStep({ step: 3, view: 'addIssue' })}
          />
          <PrimaryAsyncButton
            disabled={!isVerified}
            label="Submit"
            onClick={handleSaveInfo}
          />
        </ButtonGroup>
      </Fragment>
    );
  }
}

VerifyIssue.propTypes = {
  activeUser: T.object,
  issueData: T.object,
  dispatchIncrementStep: T.func,
  dispatchSaveInfo: T.func,
  dispatchVerifyInfo: T.func,
  handleNav: T.func,
  isVerified: T.bool,
  organizationData: T.object,
  requestBody: T.object,
};

const mapStateToProps = createStructuredSelector({
  /**
   * Reducer : Issues
   */
  issueData: makeSelectIssues('issueData'),
  organizationData: makeSelectIssues('organizationData'),
  isVerified: makeSelectIssues('isVerified'),
  requestBody: makeSelectIssuesRequestBody(),
});

function mapDispatchToProps(dispatch) {
  return {
    /**
     * Reducer : Issues
     */
    dispatchIncrementStep: payload => dispatch(incrementStep(payload)),
    dispatchSaveInfo: payload => dispatch(saveInfo(payload)),
    dispatchVerifyInfo: () => dispatch(verifyInfo()),
    /**
     * Reducer : Router
     */
    handleNav: route => dispatch(push(route)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VerifyIssue);
