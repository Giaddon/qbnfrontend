import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

import { addQualityToCreate, selectCreate } from '../createToolsSlice';
import { CreateFormDiv, FormArrayDiv, FormArrayElementDiv, FormDividerDiv, FormSectionTitle } from './formStyles';


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
  const createData = useSelector(selectCreate);
  const [changed, setChanged] = useState(false);

  function submitForm(values) {
  
    const qualityContext = values.contextEnabled ? values.context : null
  
    const newQuality = {
      id: data.id,
      name: values.qualityName || "Unknown Quality",
      descriptions: values.qualityDescriptions,
      alts: values.qualityAlts,
      category: values.qualityCategory || null,
      value: values.qualityValue || 0,
      pyramid: values.pyramid || false,
      invisible: values.qualityInvisible || false,
      context: qualityContext || null,
      creatorPinned: values.creatorPinned,
      change: values.pyramid ? 0 : null,
    }

    dispatch(addQualityToCreate(newQuality));

  }

  function markChanged() {
    setChanged(true);
  }

  function deleteQuality() {
    deleteItem(data.id);
  }

  if (!data) return null;
  
  return(
    <CreateFormDiv changed={changed}>
      <p>ID: {data.id}</p>
      <Formik
        initialValues={{
          qualityName: data.name || '', 
          qualityValue: data.value || 0, 
          qualityDescriptions: data.descriptions || [
            {
              value: 1,
              description: "Used to describe the quality at this value or higher."
            }
          ],
          qualityAlts: data.alts || [],
          qualityCategory: data.category || '',
          pyramid: data.pyramid || false,
          qualityInvisible: data.invisible || false,
          context: data.context || '',
          contextEnabled: data.context ? true : false,
          creatorPinned: data.creatorPinned || false,
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
            <label htmlFor="qualityName">Name</label>
            <Field type="text" name="qualityName" />
            <ErrorMessage name="qualityName" component="div" />
            
            <label htmlFor="qualityValue">Starting Value</label>
            <Field type="number" name="qualityValue" min='0' />
            <ErrorMessage name="qualityValue" component="div" />

            <FormDividerDiv>
              <FormSectionTitle htmlFor="qualityDescription">Descriptions</FormSectionTitle>
              <FieldArray name="qualityDescriptions">
                {({ insert, remove, push }) => (
                  <div>
                    {values.qualityDescriptions.length > 0 &&
                      values.qualityDescriptions.map((qualityDescriptions, index) => (
                        <div key={index}>
                          
                          <label htmlFor={`qualityDescriptions.${index}.value`}>Value</label>
                          <Field name={`qualityDescriptions.${index}.value`} type="number" min="1" />
                          
                          <label htmlFor={`qualityDescriptions.${index}.description`}>Description</label>
                          <Field name={`qualityDescriptions.${index}.description`} as="textarea" />

                          <button type="button" onClick={() => remove(index)}>
                            Remove Description
                          </button>
                        </div>
                      ))}
                    <button type="button" onClick={() => push({ value: 0, description: "New description"})}> Add a Description
                    </button>
                  </div>
                )}
              </FieldArray>
            </FormDividerDiv>

            <FormDividerDiv>          
              <FormSectionTitle htmlFor="qualityAlts">Alternate Value Labels</FormSectionTitle>
              <FieldArray name="qualityAlts">
                {({ insert, remove, push }) => (
                  <div>
                    {values.qualityAlts.length > 0 &&
                      values.qualityAlts.map((qualityAlts, index) => (
                        <div key={index}>
                          
                          <label htmlFor={`qualityAlts.${index}.value`}>Value</label>
                          <Field name={`qualityAlts.${index}.value`} type="number" min="1" />
                          
                          <label htmlFor={`qualityAlts.${index}.alt`}>Label</label>
                          <Field name={`qualityAlts.${index}.alt`} type="text" />

                          <button type="button" onClick={() => remove(index)}>
                            Remove Alternate Label
                          </button>
                        </div>
                      ))}
                    <button type="button" onClick={() => push({ id: ''})}>
                      Add an Alternate Label
                    </button>
                  </div>
                )}
              </FieldArray>
            </FormDividerDiv>     

            <label htmlFor="qualityCategory">Category</label>
            <Field type="text" name="qualityCategory" />
            <ErrorMessage name="qualityCategory" component="div" />
            
            <FormArrayDiv>
              <FormArrayElementDiv>
                <label htmlFor="pyramid">Pyramid Type</label> 
                <Field type='checkbox' name="pyramid" />
              </FormArrayElementDiv>
              
              <FormArrayElementDiv>
                <label htmlFor="qualityInvisible">Invisible</label> 
                <Field type='checkbox' name="qualityInvisible" />
              </FormArrayElementDiv>

              <FormArrayElementDiv>
                <label htmlFor="creatorPinned">Start pinned</label> 
                <Field type='checkbox' name="creatorPinned" />
              </FormArrayElementDiv>
              
              <FormArrayElementDiv>
                <label htmlFor="contextEnabled">Link to context</label> 
                <Field name="contextEnabled" type='checkbox' />
              </FormArrayElementDiv>
            </FormArrayDiv>
           
            {values.contextEnabled ? <div>
            <label htmlFor="context">Linked context:</label>
            <Field name="context" as="select">
              {Object.values(createData.contexts).map(context => 
                <option key={context.id} value={context.id}>{context.title} (id: {context.id})</option>
              )}
            </Field>
          </div> : null}

            <button type="submit" disabled={isSubmitting}>Save</button>
         </Form>
        )}
      </Formik>
        {data.id === "domain" ? null : <FormDeleteButton onClick={deleteQuality}><p>Delete Quality</p></FormDeleteButton>}   
    </CreateFormDiv>
  )
}

export default QualityForm;