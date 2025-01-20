import React from 'react';
import css from "./Form.module.css";
import { Formik, Form as FormikForm, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const BookingForm = () => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    bookingDate: Yup.date().required('Booking date is required'),
    comment: Yup.string(),
  });

  return (
    <div className={css.bookingForm}>
      <h3>Book your campervan now</h3>
      <p className={css.callToAction}>Stay connected! We are always ready to help you.</p>
      <div className={css.formContainer}>
        <Formik
          initialValues={{
            name: '',
            email: '',
            bookingDate: null, 
            comment: '',
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            console.log('Form data', values);
            alert('Form submitted!');
            resetForm(); 
          }}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <FormikForm className={css.form}>
              <div className={css.formField}>
                <Field name="name" placeholder="Name*" className={css.input} />
                <ErrorMessage name="name" component="div" className={css.error} />
              </div>

              <div className={css.formField}>
                <Field name="email" type="email" placeholder="Email*" className={css.input} />
                <ErrorMessage name="email" component="div" className={css.error} />
              </div>

              <div className={css.formField}>
                <DatePicker
                  selected={values.bookingDate}
                  onChange={(date) => setFieldValue('bookingDate', date)}
                  className={css.input}
                  placeholderText="Booking date*" 
                />
                <ErrorMessage name="bookingDate" component="div" className={css.error} />
              </div>

              <div className={css.formField}>
                <Field
                  name="comment"
                  as="textarea"
                  placeholder="Comment"
                  className={`${css.input} ${css.textarea}`}
                />
                <ErrorMessage name="comment" component="div" className={css.error} />
              </div>

              <button type="submit" disabled={isSubmitting} className={css.submitBtn}>
                Send
              </button>
            </FormikForm>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default BookingForm;
