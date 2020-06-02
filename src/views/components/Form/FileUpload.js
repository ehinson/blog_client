import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ImagePreview = styled.img`
  max-width: 200px;
  height: auto;
`;

const FileUpload = ({
  field,
  form: { setFieldValue, touched, errors },
  label,
  type,
  placeholder,
  meta,
  setState,
  state,
  isEdit,
  ...props
}) => {
  let file;
  let img;
  let imageSrc;

  const handleRemoveImage = () => {
    setFieldValue(field.name, '');
  };
  const handleChange = e => {
    if (!e.target.files) {
      return;
    }
    file = e.target.files[0];
    console.log('file', file);
    var reader = new FileReader();
    var url = reader.readAsDataURL(e.target.files[0]);
    reader.onloadend = function(e) {
      setState({
        ...state,
        file,
        imgSrc: [reader.result],
      });
      setFieldValue(field.name, file);
    };
  };

  if (state.imgSrc) {
    imageSrc = state.imgSrc;
  } else if (isEdit && field.value) {
    img = require(`images/${field.value}`);
    imageSrc = img ? img.default : null;
  }

  console.log(state);
  console.log(field);

  return (
    <div>
      <label>{label}</label>
      <div>
        {!!field.value && state.progress === -1 && <ImagePreview src={imageSrc} />}
        {state.progress > -1 && <progress value={state.progress} max={100} />}
        {field.value && (
          <button type="button" onClick={handleRemoveImage}>
            Remove
          </button>
        )}
      </div>

      <div>
        <input placeholder={placeholder} type={type} onChange={handleChange} />
      </div>
      {touched[field.name] && errors[field.name] && <span>{errors[field.name]}</span>}
    </div>
  );
};

FileUpload.propTypes = {};

export default FileUpload;
