import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

import { addStoryletToCreate, selectCreate } from '../createToolsSlice';
import { CreateFormDiv, FormDividerDiv, FormDeleteButton } from './formStyles';

function StoryletForm({ data, deleteItem }) {
  const dispatch = useDispatch();
  const createData = useSelector(selectCreate);

  function submitForm(values) {
    const newStorylet = {
      id: data.id,
      title: values.storyletTitle,
      description: values.storyletDescription,
      actions: values.actions,
      locked: values.storyletLocked || false,
    }
    
    dispatch(addStoryletToCreate(newStorylet));

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
          storyletTitle: data.title || '', 
          storyletDescription: data.description || '',
          storyletLocked: data.locked || false,
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
            <label htmlFor="storyletTitle">Title</label>
            <Field type="text" name="storyletTitle" />
            <ErrorMessage name="storyletTitle" component="div" />
            
            <label htmlFor="storyletDescription">Description</label>
            <Field as="textarea" name="storyletDescription" />
            <ErrorMessage name="storyletDescription" component="div" />
            
            <label htmlFor="storyletLocked" style={{ display: "block" }}>
              Locked</label> 
            <Field type='checkbox' name="storyletLocked" />
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
        {data.id === 1 ? null : <FormDeleteButton onClick={deleteQuality}><p>Delete Storylet</p></FormDeleteButton>}   
    </CreateFormDiv>
  )
}

export default StoryletForm;