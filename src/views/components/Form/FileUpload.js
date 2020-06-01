import React, {useState}  from 'react'
import PropTypes from 'prop-types'

const FileUpload = ({ field, form: {setFieldValue, touched, errors}, label, type, placeholder, meta, ...props }) => {
  
  const handleChange = (e) => {
    console.log("file change", e.target.files)
    console.log(field, props);
    const file = e.target.files[0]
    props.setState({...props.state, file})
    setFieldValue(field.name, file)
  }
  console.log(props.state)
  return (
    <div>
    <label>{label}</label>
    <div>
      <input placeholder={placeholder} type={type} onChange={handleChange} />
    </div>
    {touched[field.name] && errors[field.name] && <StyledError>{errors[field.name]}</StyledError>}
  </div>
  )
}

FileUpload.propTypes = {

}

export default FileUpload
