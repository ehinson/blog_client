/* eslint-disable no-nested-ternary */
import React from 'react';
import { array, func, object, bool } from 'prop-types';
import styled, { css } from 'styled-components';
import _ from 'lodash';

import Issues from '../../containers/Issues';

import LoadingDots from '../Loading';

const propTypes = {
  repos: array.isRequired,
  issues: array.isRequired,
  fetchIssues: func.isRequired,
  isIssueLoading: bool.isRequired,
  setActiveRepo: func.isRequired,
  resetActiveRepo: func.isRequired,
  activeRepo: object.isRequired,
};

const StyledWrapper = styled.div`
  background-color: white;
  display: flex;
  flex: 1;
  flex-direction: column;
  margin: 0 30px;
  position: relative;

  ${p =>
    p.isIssueLoading &&
    css`
      opacity: 0.5;
      justify-content: center;
      transition: all 0.3s;
    `}

  @media (min-width: 768px) {
    flex-direction: row;
    margin: 0 100px;
    align-items: flex-start;
  }
`;

const StyledHeader = styled.div`
  background-color: white;
  flex: 0;
  margin: 0 30px;
  text-transform: uppercase;
  font-size: 0.85em;
  text-align: right;

  @media (min-width: 768px) {
    flex: 1;
    margin: 0 100px;
  }
`;

const StyledRepoWrapper = styled.div`
  background-color: white;
  flex: 0 0 200px;
  overflow: scroll;

  @media (min-width: 768px) {
    flex: 1;
    height: calc(100vh - 200px);
    max-width: 100%;
    align-self: flex-start;

    ${p =>
      p.isIssueLoading &&
      css`
        padding-right: 61%;
      `}
  }
`;

const StyledIssueWrapper = styled.div`
  background-color: #eeeeee;
  flex: 1;
  height: calc(100vh - 200px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  transition: all 0.3s;
  padding: 10px 15px;
  overflow: scroll;

  ${p =>
    p.isIssueLoading &&
    css`
      background-color: white;
    `}

  @media (min-width: 768px) {
    flex: 0 0 61%;
    padding: 10px 15px;
  }
`;

const StyledFooter = styled.div`
  background-color: green;
  position: sticky;
  bottom: 0;
`;

const StyledRepo = styled.div`
  padding: 10px 15px;
  letter-spacing: 0.2px;

  ${p =>
    p.active &&
    css`
      background-color: #eeeeee;
      font-weight: 700;
    `}
`;

const PrioritizationInterface = ({
  repos,
  issues,
  fetchIssues,
  isIssueLoading,
  setActiveRepo,
  resetActiveRepo,
  activeRepo,
}) => {
  const activeRepoExists = activeRepo && !_.isEmpty(activeRepo);

  const handleRepoClick = async repo => {
    await setActiveRepo(repo);
    fetchIssues();
  };

  return (
    <>
      <StyledHeader>
        <p>Github Prioritization Interface</p>
      </StyledHeader>
      <StyledWrapper isIssueLoading={isIssueLoading}>
        <StyledRepoWrapper>
          <div>
            {repos.map(repo => (
              <StyledRepo
                key={repo.id}
                onClick={() => handleRepoClick(repo)}
                active={activeRepo && repo.id === activeRepo.id}
              >
                <div>
                  <span>{repo.name}</span>
                </div>
              </StyledRepo>
            ))}
          </div>
        </StyledRepoWrapper>
        {activeRepoExists && (
          <StyledIssueWrapper isIssueLoading={isIssueLoading}>
            {isIssueLoading ? (
              <LoadingDots />
            ) : issues.length > 0 ? (
              <Issues clearActiveRepo={resetActiveRepo} activeRepo={activeRepo} />
            ) : (
              'There are no open issues for this repository'
            )}
          </StyledIssueWrapper>
        )}
      </StyledWrapper>
      <StyledFooter />
    </>
  );
};

PrioritizationInterface.propTypes = propTypes;

export default PrioritizationInterface;
