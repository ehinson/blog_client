import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import RegistrationForm from '../components/Form/RegistrationForm';

const Registration = () => (
  <div>
    <h1>Any place in your app!</h1>
    <Formik
      initialValues={{ username: '', email: '', password: '', password_confirmation: '' }}
      validate={values => {
        const errors = {};
        if (!values.email) {
          errors.email = 'Required';
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
          errors.email = 'Invalid email address';
        }
        return errors;
      }}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          console.log(JSON.stringify(values, null, 2));
          setSubmitting(false);
        }, 400);
      }}
    >
      {({ isSubmitting }) => <RegistrationForm />}
    </Formik>
  </div>
);

export default Registration;
