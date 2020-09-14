import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

import { addEventToCreate, selectCreate } from '../createToolsSlice';
import { 
  CreateFormDiv,
  FormDividerDiv, 
  FormDeleteButton,
  FormSectionTitle,
  FormArrayDiv,
  FormArrayElementDiv 
} from './formStyles';

function EventForm({ data, deleteItem }) {
  const dispatch = useDispatch();
  const createData = useSelector(selectCreate);

  function submitForm(values) {
    const newEvent = {
      id: data.id,
      title: values.eventTitle,
      text: values.eventText,
      staticActions: values.eventActions,
      priority: values.eventPriority || 1,
      locked: values.eventLocked || true,
      triggers: values.eventTriggers || []
    }
    
    dispatch(addEventToCreate(newEvent));

  }

  function clickDelete() {
    deleteItem(data.id);
  }

  if (!data) return null;
  
  return(
    <CreateFormDiv>
      <p>ID: {data.id}</p>
      <Formik
        initialValues={{
          eventTitle: data.title || 'New Event Title', 
          eventText: data.text || 'New Event Text',
          eventLocked: data.locked || false,
          eventActions: data.staticActions || [],
          eventPriority: data.priority || 1,
          eventTriggers: data.triggers || [],
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
            <label htmlFor="eventTitle">Title</label>
            <Field type="text" name="eventTitle" />
            <ErrorMessage name="eventTitle" component="div" />
            
            <label htmlFor="eventText">Text</label>
            <Field as="textarea" name="eventText" />
            <ErrorMessage name="eventText" component="div" />

            <label htmlFor="eventPriority">Priority</label>
            <Field name="eventPriority" type="number" min="1" />
            <ErrorMessage name="eventPriority" component="div" />
                
            <FormSectionTitle htmlFor="eventActions">Actions</FormSectionTitle>
            <FieldArray name="eventActions">
              {({ insert, remove, push }) => (
                <FormDividerDiv>
                  <FormArrayDiv>
                    {values.eventActions.length > 0 &&
                      values.eventActions.map((actions, index) => (
                        <FormArrayElementDiv key={index}>
                          <label htmlFor={`eventActions.${index}.id`}>Action</label>
                          <Field name={`eventActions.${index}.id`} as="select">
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
                  <button type="button" onClick={() => push({id: '1'})}>
                    Add an Action
                  </button>
                </FormDividerDiv>
              )}
            </FieldArray>

            <FormSectionTitle htmlFor="eventTriggers">Triggers</FormSectionTitle>
            <FieldArray name="eventTriggers">
              {({ insert, remove, push }) => (
                <FormDividerDiv>
                  <FormArrayDiv>
                    {values.eventTriggers.length > 0 &&
                      values.eventTriggers.map((trigger, index) => (
                        <FormArrayElementDiv key={index}>  
                          <label htmlFor={`eventTriggers.${index}.qualityId`}>Quality</label>
                          <Field name={`eventTriggers.${index}.qualityId`} as="select">
                            {Object.values(createData.qualities).map(quality =>
                              <option key={quality.id} value={quality.id}>{quality.name}</option>
                            )}
                          </Field>

                      <label htmlFor={`eventTriggers.${index}.min`}>Min</label>
                      <Field name={`eventTriggers.${index}.min`} type="number" min="0" />

                      <label htmlFor={`eventTriggers.${index}.max`}>Max</label>
                      <Field name={`eventTriggers.${index}.max`} type="number" min="0" />

                      <button type="button" onClick={() => remove(index)} >
                        Remove Trigger
                      </button>
                    </FormArrayElementDiv>  
                  ))}
                  </FormArrayDiv>
                  <button type="button" onClick={() => push({ qualityId:'domain', min: 0, max: ' ' })}>
                    Add a Trigger
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
        {data.id === 1 ? null : <FormDeleteButton onClick={clickDelete}><p>Delete Event</p></FormDeleteButton>}   
    </CreateFormDiv>
  )
}

export default EventForm;