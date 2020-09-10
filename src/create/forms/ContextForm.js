import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

import { addContextToCreate, selectCreate } from '../createToolsSlice';
import { 
  CreateFormDiv,
  FormDividerDiv, 
  FormDeleteButton,
  FormSectionTitle,
  FormArrayDiv,
  FormArrayElementDiv 
} from './formStyles';

function ContextForm({ data, deleteItem }) {
  const dispatch = useDispatch();
  const createData = useSelector(selectCreate);

  function submitForm(values) {
    const newContext = {
      id: data.id,
      title: values.contextTitle,
      text: values.contextText,
      staticActions: values.contextActions,
      locked: values.contextLocked || false,
    }
    
    dispatch(addContextToCreate(newContext));

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
          contextTitle: data.title || '', 
          contextText: data.text || '',
          contextLocked: data.locked || false,
          contextActions: data.staticActions || [{id: '1'}]
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
            <label htmlFor="contextTitle">Title</label>
            <Field type="text" name="contextTitle" />
            <ErrorMessage name="contextTitle" component="div" />
            
            <label htmlFor="contextText">Text</label>
            <Field as="textarea" name="contextText" />
            <ErrorMessage name="contextText" component="div" />
            
            <label htmlFor="contextLocked" style={{ display: "block" }}>
              Locked</label> 
            <Field type='checkbox' name="contextLocked" />
            <ErrorMessage name="qbnCreateQualityLocked" component="div" />
          
           <FormSectionTitle htmlFor="contextActions">Actions</FormSectionTitle>
            <FieldArray name="contextActions">
              {({ insert, remove, push }) => (
                <FormDividerDiv>
                  <FormArrayDiv>
                    {values.contextActions.length > 0 &&
                      values.contextActions.map((actions, index) => (
                        <FormArrayElementDiv key={index}>
                          <label htmlFor={`contextActions.${index}.id`}>Action</label>
                          <Field name={`contextActions.${index}.id`} as="select">
                            {Object.values(createData.actions).map(action =>
                              <option key={action.id} value={action.id}>{action.title} (id: {action.id})</option>
                            )}
                          </Field>
                          <button type="button" onClick={() => remove(index)}>
                            Remove Action
                          </button>
                        </FormArrayElementDiv>
                      ))}
                    </FormArrayDiv>
                    <button type="button" onClick={() => push({id: ''})}>
                      Add an Action
                    </button>
                  </FormDividerDiv>
                )}
              </FieldArray>
            <button type="submit" disabled={isSubmitting}>
              Submit
            </button>
         </Form>
        )}
      </Formik>
        {data.id === 1 ? null : <FormDeleteButton onClick={deleteQuality}><p>Delete Context</p></FormDeleteButton>}   
    </CreateFormDiv>
  )
}

export default ContextForm;