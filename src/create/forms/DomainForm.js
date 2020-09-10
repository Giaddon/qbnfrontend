import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

import { addDomainToCreate, selectCreate } from '../createToolsSlice';
import { CreateFormDiv, FormDividerDiv, FormSectionTitle } from './formStyles';

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
      text: values.domainText,
      staticActions: values.domainStaticActions,
      dynamicActions: values.domainDynamicActions,
      slotsCount: values.domainSlots,
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
          domainText: data.text || '',
          domainLocked: data.locked || false,
          domainSlots: data.slotsCount === 0 ? 0 : 2,
          domainStaticActions: data.staticActions || [
            {id: '1'},
          ],
          domainDynamicActions: data.dynamicActions?.length > 0 ? data.dynamicActions :   [],
        }}
        validate={null}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            submitForm(values)
            actions.setSubmitting(false);
          }, 400);
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
            
            <label htmlFor="domainText">Text</label>
            <Field as="textarea" name="domainText" />
            <ErrorMessage name="domainText" component="div" />
            
            <label htmlFor="domainLocked">Locked</label> 
            <Field type='checkbox' name="domainLocked" />
            <ErrorMessage name="domainLocked" component="div" />
            
            <label htmlFor="domainSlots">Available Slots</label> 
            <Field type='number' min="0" name="domainSlots" />
            <ErrorMessage name="domainSlots" component="div" />

            <FormDividerDiv>
              <FormSectionTitle htmlFor="domainStaticActions">Static Actions</FormSectionTitle>
              <FieldArray name="domainStaticActions">
                {({ insert, remove, push }) => (
                  <div>
                    {values.domainStaticActions.length > 0 &&
                      values.domainStaticActions.map((actions, index) => (
                        <div key={index}>
                          <label htmlFor={`domainStaticActions.${index}.id`}>Action</label>
                          <Field name={`domainStaticActions.${index}.id`} as="select">
                            {Object.values(createData.actions).map(action =>
                              <option key={action.id} value={action.id}>{action.title} (id: {action.id})</option>
                            )}
                          </Field>
                          <button type="button" onClick={() => remove(index)}>
                            Remove Action
                          </button>
                        </div>
                      ))}
                    <button type="button" onClick={() => push({id: ''})}>
                      Add an Action
                    </button>
                  </div>
                )}
              </FieldArray>
            </FormDividerDiv>

            <FormDividerDiv>
              <FormSectionTitle htmlFor="domainDynamicActions">Dynamic Actions</FormSectionTitle>
              <FieldArray name="domainDynamicActions">
                {({ insert, remove, push }) => (
                  <div>
                    {values.domainDynamicActions.length > 0 &&
                      values.domainDynamicActions.map((actions, index) => (
                        <div key={index}>
                          <label htmlFor={`domainDynamicActions.${index}.id`}>Action</label>
                          <Field name={`domainDynamicActions.${index}.id`} as="select">
                            {Object.values(createData.actions).map(action =>
                              <option key={action.id} value={action.id}>{action.title} (id: {action.id})</option>
                            )}
                          </Field>
                          <button type="button" onClick={() => remove(index)}>
                            Remove Action
                          </button>
                        </div>
                      ))}
                    <button type="button" onClick={() => push({ id: ''})}>
                      Add an Action
                    </button>
                  </div>
                )}
              </FieldArray>
            </FormDividerDiv>

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