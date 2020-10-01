import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';

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
  const [changed, setChanged] = useState(false);
  const [staticActions, setStaticActions] = useState([]);
  const createData = useSelector(selectCreate);

  useEffect(function gatherMyActions() {
    if (data) {
      let gatheredStaticActions = [];

      for (let action of data.actions) {
        if (createData.actions[action.id]) {
          const {id, title} = createData.actions[action.id];     
          gatheredStaticActions.push({id, title});
        }
      } //end for loop
      setStaticActions(gatheredStaticActions);
    }
  }, [data, createData]);

  function submitForm(values) {
    const newContext = {
      id: data.id,
      title: values.contextTitle,
      text: values.contextText,
      actions: data.actions,
      locked: values.contextLocked || false,
    }
    
    dispatch(addContextToCreate(newContext));

  }

  function markChanged() {
    setChanged(true);
  }

  function deleteContext() {
    deleteItem(data.id);
  }

  if (!data) return null;
  
  return(
    <CreateFormDiv changed={changed}>
      <p>ID: {data.id}</p>
      <Formik
        initialValues={{
          contextTitle: data.title || 'New Context Title', 
          contextText: data.text || 'New Context Text',
          contextLocked: data.locked || false,
          contextActions: data.actions || [],
        }}
        validate={null}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            submitForm(values)
            actions.setSubmitting(false);
            setChanged(false);
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
          <Form autoComplete="off" onChange={() => markChanged()}>
            <label htmlFor="contextTitle">Title</label>
            <Field type="text" name="contextTitle" />
            <ErrorMessage name="contextTitle" component="div" />
            
            <label htmlFor="contextText">Text</label>
            <Field as="textarea" name="contextText" />
            <ErrorMessage name="contextText" component="div" />
            
            <label htmlFor="contextLocked">Locked</label> 
            <Field type='checkbox' name="contextLocked" />
          
            <FormSectionTitle htmlFor="contextActions">Actions</FormSectionTitle>
            <FormDividerDiv>
              <FormArrayDiv>
                {staticActions.length > 0 && staticActions.map(a => (
                  <FormArrayElementDiv key={a.id}>
                    <p>{a.title}</p>
                  </FormArrayElementDiv>
                ))}
              </FormArrayDiv>
            </FormDividerDiv>
            <button type="submit" disabled={isSubmitting}>Save</button>
         </Form>
        )}
      </Formik>
      <FormDeleteButton onClick={deleteContext}><p>Delete Context</p></FormDeleteButton>
    </CreateFormDiv>
  )
}

export default ContextForm;