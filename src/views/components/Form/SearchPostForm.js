import { Field, Form, Formik, FormikProps } from 'formik';
import { func, bool } from 'prop-types';
import styled from 'styled-components';
import { updateUser } from 'state/operations';
import { UserContext, AuthContext, PostsContext } from 'views/components/App';
import { useHistory, useParams, Redirect, Link } from 'react-router-dom';
import React, { useContext, useCallback } from 'react';
import { useAxios } from 'state/hooks/useAxios';
import * as Yup from 'yup';

import InputField from './InputField';

const propTypes = {};


const StyledButton = styled.button`
  margin: 15px;
  outline: none;
  border: 1px solid #286c81;
  font-size: 0.85em;
  text-transform: uppercase;
  padding: 10px 15px;
`;

const SearchPostForm = ({ isSubmitting, handleSearch }) => {
  return (
    <Formik
      initialValues={{
        search: '',
      }}
      onSubmit={handleSearch}
    >
      {({ isSubmitting, values }) => (
        <Form>
          <Field
            name="search"
            type="text"
            component={InputField}
            placeholder="search"
            label="Search..."
          />
          <div>
            <StyledButton type="submit">Search</StyledButton>
            <StyledButton type="reset">Reset</StyledButton>
          </div>
        </Form>
      )}
    </Formik>
  );
};

SearchPostForm.propTypes = propTypes;

export default SearchPostForm;
