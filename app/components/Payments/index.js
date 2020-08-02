/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import T from 'prop-types';

import { BaseExpansionPanel, ConditionalRender } from 'components/base_ui';
import {
  formatDollarAmount,
  handleZipChange,
} from 'utils/globalHelpers';
import iconDictionary from 'utils/iconDictionary';

import CreditCardView from './CreditCardView';
import DollarValueToggle from './DollarValueToggle';
import PaypalView from './PaypalView';
import YourAccountView from './YourAccountView';
import {
  Amount,
  Divider,
  DollarValueWrapper,
  Funded,
  FundingContainer,
  OverviewWrapper,
  PaymentContainer,
  PaymentInformationWrapper,
  StyledErrorSuccessBanner,
  StyledLabel,
  StyledPaymentTextInput,
} from './styledComponents';

const AccountIcon = iconDictionary('user');
const CreditCardIcon = iconDictionary('creditCard');
const PaypalIcon = iconDictionary('paypal');

const PaymentPortal = ({
  alerts: { error, success },
  balance,
  email,
  errors: {
    email: emailError,
    firstName: firstNameError,
    fundValue: fundValueError,
    lastName: lastNameError,
  },
  firstName,
  fundedAmount,
  handleClearPaymentAlerts,
  handleNav,
  handleStripeToken,
  handleSubmitAccountPayment,
  handleValidateInput,
  isSignedIn,
  issueId,
  lastName,
  open,
  organizationId,
  userId,
  ...restProps
}) => {
  const [emailValue, setEmailValue] = useState(email || '');
  const [fundValue, setFundValue] = useState('2');
  const [isAccountPaymentOpen, setIsAccountPaymentOpen] = useState(true);
  const [isCreditPaymentOpen, setIsCreditPaymentOpen] = useState(false);
  const [isPaypalPaymentOpen, setIsPaypalPaymentOpen] = useState(false);
  const [firstNameValue, setFirstNameValue] = useState(firstName || '');
  const [lastNameValue, setLastNameValue] = useState(lastName || '');
  const [zipValue, setZipValue] = useState('');

  const hasError = !!emailError || !!firstNameError || !!fundValueError || !!lastNameError;
  const values = {
    email: emailValue,
    firstName: firstNameValue,
    fundValue,
    lastName: lastNameValue,
  }
 
  const handleChangeDollarValue = (e, valuePassedIn) => {
    const { value: valueFromTarget } = e.target;
    const value = valuePassedIn || valueFromTarget;
    const compareValue = isSignedIn ? balance : 1000000;
    if (value <= compareValue) {
      const string = value
        ? value
          .replace(',', '.')
          .replace(/[^\d.]/g, '')
          .replace(/\./, 'x')
          .replace(/\./g, '')
          .replace(/x/, '.')
        : '0';
      const formattedString =
        string.length === 1
          ? string.split('.')
          : string.replace(/^0+/, '').split('.');

      if (formattedString.length === 1) {
        const formattedValue = formattedString.join('.');
        setFundValue(formattedValue);
      }
      if (formattedString.length === 2) {
        formattedString[0] = formattedString[0] === '' ? '0' : formattedString[0];
        formattedString[1] = formattedString[1]
          ? formattedString[1].slice(0, 2)
          : '';
        const formattedValue = formattedString.join('.');
        setFundValue(formattedValue);
      }
    }
  };

  const handleChangePaymentPanel = (type) => {
    if (type === 'account') {
      if (isAccountPaymentOpen) {
        setIsAccountPaymentOpen(false);
      } else {
        setIsAccountPaymentOpen(true);
      }
      setIsCreditPaymentOpen(false);
      setIsPaypalPaymentOpen(false);
    }
    if (type === 'credit') {
      if (isCreditPaymentOpen) {
        setIsCreditPaymentOpen(false);
      } else {
        setIsCreditPaymentOpen(true);
      }
      setIsAccountPaymentOpen(false);
      setIsPaypalPaymentOpen(false);
    }
    if (type === 'paypal') {
      if (isPaypalPaymentOpen) {
        setIsPaypalPaymentOpen(false);
      } else {
        setIsPaypalPaymentOpen(true);
      }
      setIsAccountPaymentOpen(false);
      setIsCreditPaymentOpen(false);
    }
  };

  const handleEmailValueChange = (event, newEmail) => {
    setEmailValue(newEmail);
  };

  const handleFirstNameValueChange = (event, newName) => {
    setFirstNameValue(newName);
  };

  const handleLastNameValueChange = (event, newName) => {
    setLastNameValue(newName);
  };
  const propsToPassDown = {
    emailValue,
    firstNameValue,
    fundValue,
    handleStripeToken,
    handleZipChange,
    hasError,
    isCreditPaymentOpen,
    issueId,
    lastNameValue,
    organizationId,
    setZipValue,
    userId,
    zipValue,
  };
  return (
    <PaymentContainer {...restProps}>
      <OverviewWrapper>
        <Amount>{formatDollarAmount(fundedAmount)}</Amount>
        <Funded isFunded={!fundedAmount || !open}>{fundedAmount ? 'Funded' : 'Unfunded'}</Funded>
      </OverviewWrapper>
      <FundingContainer open={open}>
        <DollarValueWrapper>
          <DollarValueToggle
            fundValue={fundValue}
            handleChange={handleChangeDollarValue}
          />
        - or -
          <StyledPaymentTextInput
            adornmentComponent="$"
            error={!!fundValueError}
            fontSize="1.4rem"
            helperText={fundValueError}
            onBlur={() => handleValidateInput({ field: 'fundValue', values })}
            onChange={e => handleChangeDollarValue(e, e.target.value)}
            value={fundValue}
          />
        </DollarValueWrapper>
        <Divider />
        <PaymentInformationWrapper>
          <StyledLabel>Information</StyledLabel>
          <StyledPaymentTextInput
            adornmentComponent="First Name"
            error={!!firstNameError}
            fontSize="1rem"
            helperText={firstNameError}
            onBlur={() => handleValidateInput({ field: 'firstName', values })}
            onChange={e => handleFirstNameValueChange(e, e.target.value)}
            value={firstNameValue}
          />
          <StyledPaymentTextInput
            adornmentComponent="Last Name"
            error={!!lastNameError}
            fontSize="1rem"
            helperText={lastNameError}
            onBlur={() => handleValidateInput({ field: 'lastName', values })}
            onChange={e => handleLastNameValueChange(e, e.target.value)}
            value={lastNameValue}
          />
          <StyledPaymentTextInput
            adornmentComponent="Email"
            error={!!emailError}
            fontSize="1rem"
            helperText={emailError}
            onBlur={() => handleValidateInput({ field: 'email', values })}
            onChange={e => handleEmailValueChange(e, e.target.value)}
            value={emailValue}
          />
        </PaymentInformationWrapper>
        <StyledLabel>Payment Methods</StyledLabel>
        <StyledErrorSuccessBanner
          error={error}
          onClose={handleClearPaymentAlerts}
          success={success}
        />
        <ConditionalRender
          Component={() => (
            <BaseExpansionPanel
              Component={YourAccountView}
              expanded={isAccountPaymentOpen}
              handleLabelClick={() => handleChangePaymentPanel('account')}
              Icon={AccountIcon}
              propsToPassDown={{
                balance,
                emailValue,
                firstNameValue,
                fundValue,
                handleSubmitAccountPayment,
                hasError,
                issueId,
                lastNameValue,
                organizationId,
                setFundValue,
                userId,
              }}
              title="Your Account"
            />
          )}
          shouldRender={isSignedIn}
        />
        <BaseExpansionPanel
          Component={CreditCardView}
          expanded={isCreditPaymentOpen}
          handleLabelClick={() => handleChangePaymentPanel('credit')}
          Icon={CreditCardIcon}
          propsToPassDown={propsToPassDown}
          title="Credit Card"
        />
        <BaseExpansionPanel
          Component={PaypalView}
          expanded={isPaypalPaymentOpen}
          handleLabelClick={() => handleChangePaymentPanel('paypal')}
          Icon={PaypalIcon}
          propsToPassDown={{ isPaypalPaymentOpen }}
          title="Paypal"
        />
      </FundingContainer>
    </PaymentContainer>
  );
};

PaymentPortal.propTypes = {
  alerts: T.object,
  balance: T.number,
  email: T.string,
  errors: T.object,
  firstName: T.string,
  fundedAmount: T.number,
  handleClearPaymentAlerts: T.func,
  handleNav: T.func,
  handleStripeToken: T.func,
  handleSubmitAccountPayment: T.func,
  handleValidateInput: T.func,
  isSignedIn: T.bool,
  issueId: T.string,
  lastName: T.string,
  open: T.bool,
  organizationId: T.string,
  userId: T.string,
};

export default PaymentPortal;
