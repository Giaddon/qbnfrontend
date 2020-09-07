import React from 'react';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { addQualityToCreate } from '../createToolsSlice';
import { CreateFormDiv } from './formStyles';


const FormDeleteButton = styled.div`
  position: relative;
  height: 30px;
  color: white;
  margin: auto;
  max-width: 200px;
  background-color: tomato;
  margin-top:10px;
  cursor:pointer;
  border-radius: 3px;
  p {
    width: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }
`

function QualityForm({ data, deleteItem }) {
  const dispatch = useDispatch();
  
  function submitForm(values) {
    const newQuality = {
      id: data.id,
      name: values.qbnCreateQualityName,
      description: values.qbnCreateQualityDescription,
      block: values.qbnCreateQualityBlock,
      value: values.qbnCreateQualityValue || 0,
      pyramid: values.qbnCreateQualityPyramid || false,
      invisible: values.qbnCreateQualityInvisible || false,
    }
    
    dispatch(addQualityToCreate(newQuality));

  }

  function deleteQuality() {
    deleteItem(data.id);
  }

  if (!data) return null;
  
  return(
    <CreateFormDiv>
      <p>ID: {data.id}</p>
      <Formik
        initialValues={{
          qbnCreateQualityName: data.name || '', 
          qbnCreateQualityValue: data.value || 0, 
          qbnCreateQualityDescription: data.description || '',
          qbnCreateQualityBlock: data.block || '',
          qbnCreateQualityPyramid: data.pyramid || false,
          qbnCreateQualityInvisible: data.invisible || false,
        }}
        validate={null}
        onSubmit={(values, actions) => {
          submitForm(values)
          actions.setSubmitting(false)
        }}
        enableReinitialize={true}
      >
        {({
         values,
         errors,
         touched,
         handleChange,
         handleBlur,
         handleSubmit,
         isSubmitting,
        }) => (
          <Form>
            <label htmlFor="qbnCreateQualityName" style={{ display: "block" }}>
              Name</label>
            <Field type="text" name="qbnCreateQualityName" />
            <ErrorMessage name="qbnCreateQualityName" component="div" />
            <label htmlFor="qbnCreateQualityValue" style={{ display: "block" }}>
              Starting Value</label>
            <Field type="number" name="qbnCreateQualityValue" min='0' />
            <ErrorMessage name="qbnCreateQualityValue" component="div" />
            <label htmlFor="qbnCreateQualityDescription" style={{ display: "block" }}>
              Description</label>
            <Field as="textarea" name="qbnCreateQualityDescription" />
            <ErrorMessage name="qbnCreateQualityDescription" component="div" />
            <label htmlFor="qbnCreateQualityBlock" style={{ display: "block" }}>
              Block</label>
            <Field type="text" name="qbnCreateQualityBlock" />
            <ErrorMessage name="qbnCreateQualityBlock" component="div" />
            <label htmlFor="qbnCreateQualityPyramid" style={{ display: "block" }}>
              Pyramid Type</label> 
            <Field type='checkbox' name="qbnCreateQualityPyramid" />
            <ErrorMessage name="qbnCreateQualityPyramid" component="div" />
            <label htmlFor="qbnCreateQualityInvisible" style={{ display: "block" }}>
              Invisible</label> 
            <Field type='checkbox' name="qbnCreateQualityInvisible" />
            <ErrorMessage name="qbnCreateQualityInvisible" component="div" />
            <br /><button type="submit" disabled={isSubmitting}>
              Submit
            </button>
         </Form>
        )}
      </Formik>
        {data.id === "domain" ? null : <FormDeleteButton onClick={deleteQuality}><p>Delete Quality</p></FormDeleteButton>}   
    </CreateFormDiv>
  )
}

export default QualityForm;