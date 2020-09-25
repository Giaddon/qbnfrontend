import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { addDomainToCreate, selectCreate } from '../createToolsSlice';
import { 
  CreateFormDiv, 
  FormDividerDiv, 
  FormSectionTitle, 
  FormArrayDiv, 
  FormArrayElementDiv,
  FormDeleteButton 
} from './formStyles';

function DomainForm({ data, deleteItem }) {
  const dispatch = useDispatch();
  const [changed, setChanged] = useState(false);
  const [staticActions, setStaticActions] = useState([]);
  const [dynamicActions, setDynamicActions] = useState([]);
  const createData = useSelector(selectCreate);

  useEffect(function gatherMyActions() {
    if (data) {
      let gatheredStaticActions = [];
      let gatheredDynamicActions = [];

      for (let action of data.actions) {
        if (createData.actions[action.id]) {
          const {id, title, dynamic} = createData.actions[action.id];
          if (!dynamic) {
            gatheredStaticActions.push({id, title});
            
          } else {
            gatheredDynamicActions.push({id, title});
          }
        }
      } //end for loop
      setStaticActions(gatheredStaticActions);
      setDynamicActions(gatheredDynamicActions);   
    }
  }, [data, createData]);

  function submitForm(values) {
    const newDomain = {
      id: data.id,
      title: values.domainTitle,
      text: values.domainText,
      actions: data.actions,
      slotsCount: values.domainSlots,
      locked: values.domainLocked || false,
      availableAtStart: values.availableAtStart || false,
      discoverable: values.discoverable || false,
    }
    
    dispatch(addDomainToCreate(newDomain));
  }

  function markChanged() {
    setChanged(true);
  }

  function deleteDomain() {
    deleteItem(data.id);
  }

  if (!data) return null;
  
  return(
    <CreateFormDiv changed={changed}>
      <p>ID: {data.id}</p>
      <Formik
        initialValues={{
          domainTitle: data.title || '', 
          domainText: data.text || '',
          domainLocked: data.locked || false,
          availableAtStart: data.availableAtStart || false,
          discoverable: data.discoverable || false,
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
            <label htmlFor="domainTitle">Title</label>
            <Field type="text" name="domainTitle" />
            <ErrorMessage name="domainTitle" component="div" />
            
            <label htmlFor="domainText">Text</label>
            <Field as="textarea" name="domainText" />
            <ErrorMessage name="domainText" component="div" />
            
            <FormArrayDiv>

              <FormArrayElementDiv>
                <label htmlFor="domainLocked">Locked</label> 
                <Field type='checkbox' name="domainLocked" />
              </FormArrayElementDiv>
              
              <FormArrayElementDiv>
                <label htmlFor="availableAtStart">Available at start</label> 
                <Field name="availableAtStart" type='checkbox'  />
              </FormArrayElementDiv>
              
              <FormArrayElementDiv>
                <label htmlFor="discoverable">Discoverable</label> 
                <Field name="discoverable" type='checkbox'  />
              </FormArrayElementDiv>
            
            </FormArrayDiv>
            
            <label htmlFor="domainSlots">Available Slots</label> 
            <Field type='number' min="0" name="domainSlots" />
            <ErrorMessage name="domainSlots" component="div" />

            <FormSectionTitle>Static Actions</FormSectionTitle>    
            <FormDividerDiv>
              <FormArrayDiv>
                {staticActions.length > 0 && staticActions.map(a => (
                  <FormArrayElementDiv key={a.id}>
                    <p>{a.title}</p>
                  </FormArrayElementDiv>
                ))}
              </FormArrayDiv>
            </FormDividerDiv>

            <FormSectionTitle>Dynamic Actions</FormSectionTitle>    
            <FormDividerDiv>
              <FormArrayDiv>
                {dynamicActions.length > 0 && dynamicActions.map(a => (
                  <FormArrayElementDiv key={a.id}>
                    <p>{a.title}</p>
                  </FormArrayElementDiv>
                ))}
              </FormArrayDiv>
            </FormDividerDiv>

            <button type="submit" disabled={isSubmitting}>
              Save
            </button>
         </Form>
        )}
      </Formik>
        {data.id === 1 ? null : <FormDeleteButton onClick={deleteDomain}><p>Delete Domain</p></FormDeleteButton>}   
    </CreateFormDiv>
  )
}

export default DomainForm;