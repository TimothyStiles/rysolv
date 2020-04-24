import styled from 'styled-components';
import { hoverLinkColor, textColor } from 'defaultStyleHelper';
import { FlatIconButton } from '../base_ui';

export const StyledIssueCard = styled.div`
  border-radius: 0 0.5rem 0.5rem;
  width: 80%;
  margin: 0 0 0 10%;
`;

export const MessageWrapper = styled.div`
  align-items: center;
  background-color: white;
  border-radius: 0.5rem;
  color: ${textColor};
  display: flex;
  font-size: 1.6rem;
  height: 55rem;
  justify-content: center;
  text-align: center;
`;

export const StyledListItem = styled.li`
  display: flex;
  border: 1px solid #e0e0e0;
  border-radius: 2px;
  overflow: hidden;
  margin: 1rem;
  flex-direction: row;
  list-style-type: none;
`;

export const StyledIssueContent = styled.div`
  width: 100%;
  padding: 0.5rem;
  background-color: white;
`;

export const StyledIssueHeader = styled.div`
  width: 100%;
  padding: 0.25rem;
  display: flex;
  justify-content: space-between;
`;

export const OrganizationNameWrapper = styled.a`
  display: flex;
  color: ${textColor};
  display: inline-block;
  font-weight: bold;
`;

export const IssueLanguage = styled.div`
  display: flex;
  color: #90a4ae;
  font-weight: bold;
  display: inline-block;
`;

export const UpvotePanel = styled.div`
  background-color: #e0e0e0;
  width: 3rem;
  padding: 0.5rem;
  text-align: center;
`;

export const StyledIssueText = styled.div`
  padding: 0 1rem 0 0;
  height: auto;
  min-height: 4rem;
`;

export const NameWrapper = styled.a`
  font-size: 1.2rem;
  max-height: 3rem;
  overflow: hidden;
  font-weight: bold;
  color: ${textColor};

  &:hover {
    cursor: pointer;
    color: ${hoverLinkColor};
  }
`;

export const BannerWrapper = styled.div`
  font-size: 1.2rem;
  margin: 1rem 0;
`;

export const IssueResolved = styled.div`
  color: red;
`;

export const StyledIssueFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 3rem 0.25rem 0;
  width: 100%;
`;

export const StyledFlatIconButton = styled(FlatIconButton)`
  padding: 0;
  min-width: 0;
`;

export const DollarWrapper = styled.div`
  background-color: rgb(229, 251, 242);
  border-radius: 0.25rem;
  color: rgb(8, 178, 110);
  display: inline-block;
  font-size: 1.2rem;
  font-weight: 700;
  line-height: 1.5;
  min-width: 5rem;
  padding: 0.25rem 0.4rem;
  text-align: center;
  white-space: nowrap;
  width: auto;
`;
