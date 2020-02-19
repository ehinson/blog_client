import { createSelector } from 'reselect';
import { getFormValues } from 'redux-form';
import _ from 'lodash';

import { sortAttributes } from './utils/constants';

export const getAppState = state => state.app;

export const getTokenFormState = state => getFormValues('githubToken')(state);
export const getPrioritizationFormState = state => getFormValues('prioritization')(state);

export const getHasUserToken = createSelector(getAppState, appState => Boolean(appState.userToken));

export const getUserToken = createSelector(getAppState, appState => appState.userToken);

export const getRepoSortParams = createSelector(getAppState, appState => appState.repos.sortParams);

export const getSortOrder = createSelector(
  getPrioritizationFormState,
  formValues => formValues && formValues.sort,
);

export const getSortKey = createSelector(
  getPrioritizationFormState,
  formValues => formValues && formValues.direction,
);

export const getRepoIssues = createSelector(getAppState, appState => appState.issues.results);

export const getUserRepos = createSelector(
  [getAppState, getSortOrder, getSortKey],
  (appState, sort, direction) =>
    _.orderBy(appState.repos.results, [data => data[sort]], [direction]),
);
