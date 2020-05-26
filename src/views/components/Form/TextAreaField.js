import React from 'react';
import { oneOfType, object, string, node } from 'prop-types';
import styled from 'styled-components';
import ReactQuill from 'react-quill';

import 'react-quill/dist/quill.snow.css';

export const StyledTextArea = styled.textarea`
  background: none;
  outline: none;
  border: 1px solid black;
  background-image: none;
  margin: 0.5rem;
  width: 100%;
  font-family: sans-serif;
  -webkit-appearance: none;
`;

const StyledLabel = styled.label`
  font-size: 0.85em;
  text-transform: uppercase;
  text-align: center;
`;

const StyledError = styled.strong`
  color: red;
  font-size: 0.85em;
  text-transform: uppercase;
  font-style: italic;
  text-align: center;
  display: inline-block;
`;

const TextArea = ({ field, form, label, type, placeholder, ...props }) => (
  <div>
    <StyledLabel>{label}</StyledLabel>
    <div>
      <ReactQuill
        {...field}
        {...props}
        placeholder={placeholder}
        type={type}
        onChange={field.onChange(field.name)}
      />
      <StyledError>Error</StyledError>
    </div>
  </div>
);

TextArea.propTypes = {};

export default TextArea;
