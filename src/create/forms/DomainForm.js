import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

import { addDomainToCreate, selectCreate } from '../createToolsSlice';
import { CreateFormDiv, FormDividerDiv } from './formStyles';

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

function DomainForm({ data, deleteItem }) {
  const dispatch = useDispatch();
  const createData = useSelector(selectCreate);

  function submitForm(values) {
    const newDomain = {
      id: data.id,
      title: values.domainTitle,
      description: values.domainDescription,
      actions: values.actions,
      locked: values.domainLocked || false,
    }
    
    dispatch(addDomainToCreate(newDomain));

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
          domainTitle: data.title || '', 
          domainDescription: data.description || '',
          domainLocked: data.locked || false,
          actions: data.actions || [
            {id: '1'},
          ]
        }}
        validate={null}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            submitForm(values)
            actions.setSubmitting(false);
          }, 500);
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
            <label htmlFor="domainTitle">Title</label>
            <Field type="text" name="domainTitle" />
            <ErrorMessage name="domainTitle" component="div" />
            
            <label htmlFor="domainDescription">Description</label>
            <Field as="textarea" name="domainDescription" />
            <ErrorMessage name="domainDescription" component="div" />
            
            <label htmlFor="domainLocked" style={{ display: "block" }}>
              Locked</label> 
            <Field type='checkbox' name="domainLocked" />
            <ErrorMessage name="qbnCreateQualityLocked" component="div" />
            
            <label htmlFor="actions">Actions</label>
            <FieldArray name="actions">
              {({ insert, remove, push }) => (
                <div>
                  {values.actions.length > 0 &&
                    values.actions.map((actions, index) => (
                      <FormDividerDiv key={index}>
                        <label htmlFor={`actions.${index}.id`}>Action</label>
                        <Field name={`actions.${index}.id`} as="select">
                          {Object.values(createData.actions).map(action =>
                            <option key={action.id} value={action.id}>{action.title} (id: {action.id})</option>
                          )}
                        </Field>
                        <button type="button" onClick={() => remove(index)}>
                          Remove Change
                        </button>
                      </FormDividerDiv>
                    ))}
                  <button type="button" onClick={() => push({ id: ''})}>
                    Add an Action
                  </button>
                </div>
              )}
            </FieldArray>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
         </Form>
        )}
      </Formik>
        {data.id === 1 ? null : <FormDeleteButton onClick={deleteQuality}><p>Delete Domain</p></FormDeleteButton>}   
    </CreateFormDiv>
  )
}

export default DomainForm;