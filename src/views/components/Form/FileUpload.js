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
  ...props
}) => {
  let file;
  useEffect(() => {
    if (field.value) {
      file = require(`./images${field.value}`).default;
      var reader = new FileReader();
      var url = reader.readAsDataURL(file);
    }
  }, [file]);

  const handleRemoveImage = () => {
    console.log('remove');
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
      props.setState({
        ...props.state,
        file,
        imgSrc: [reader.result],
      });
      setFieldValue(field.name, file);
    };
    console.log('url', url); // Would see a path?
  };

  console.log(props.state);
  console.log(field);

  let imageSrc;
  if (props.state.imgSrc) {
    imageSrc = props.state.imgSrc;
  } else if (props.isEdit && field.value) {
    let img = require(`images/${field.value}`);
    imageSrc = img ? img.default : null;
  }
  return (
    <div>
      <label>{label}</label>
      <div>
        {!!field.value && props.state.progress === -1 && <ImagePreview src={imageSrc} />}
        {props.state.progress > -1 && <progress value={props.state.progress} max={100} />}
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
