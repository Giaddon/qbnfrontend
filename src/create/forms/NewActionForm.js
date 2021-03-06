import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

import { addActionToCreate } from '../createToolsSlice';
import {
  FormDividerDiv,
  FormSectionTitle,
  FormArrayDiv,
  FormArrayElementDiv,
  CreateFormDiv, FormDeleteButton
 } from './formStyles';

function NewActionForm({ data, createData, deleteItem, parentType, parentId }) {
  const dispatch = useDispatch();
  const [changed, setChanged] = useState(false);
  
  const initialValues = {
    title: data.title || "Action Title",
    text: (data.text || data.text === "") ? data.text : "Action text.", 
    revealType: data.reveal?.type || "all", 
    remain: data.results?.remain || false, 
    resultsType: data.results?.type || "modify",
    context: data.results?.context || Object.values(createData.contexts).length > 0 ? Object.values(createData.contexts)[0].id : "",
    changes: data.results?.changes || [],
    challengeQuality: data.challenge?.qualityId || "1" ,
    challengeDifficulty: data.challenge?.difficulty || 1,
    successChanges: data.results?.success?.changes || [],
    failureChanges: data.results?.failure?.changes || [],
    hideReport: data.results?.hide || false,
    reportTitle: data.results?.report?.title || "Report Title",
    reportText: data.results?.report?.text || "Report text.",
    successTitle: data.results?.success?.report?.title || "Success Title",
    successText: data.results?.success?.report?.text || "Success text.",
    failureTitle: data.results?.failure?.report?.title || "Report Title",
    failureText: data.results?.failure?.report?.text || "Failure text.",
    luck: data.challenge?.luck || false,
    reqs: data.reqs || [],
    fixed: data.fixed || false,
    dynamic: data.dynamic || false,
  }

  function submitForm(values) {
    let newAction = {
      id: data.id,
      title: values.title,
      text: values.text,
      fixed: values.fixed,
      dynamic: parentType === "domains" ? values.dynamic : false,
      reqs: values.reqs,
      reveal: {
        type: values.revealType,
      },
      results: {
        type: values.resultsType,
      },
    };
  
    switch (values.resultsType) {
      case "modify":
        newAction.results.changes = values.changes; 
        newAction.results.remain = values.remain;
        newAction.results.report = {
          title: values.reportTitle,
          text: values.reportText,
        };
        newAction.results.hide = values.hideReport;
        break;

      case "context":
        newAction.results.context = values.context;
        break;
      
      case "challenge":
        newAction.results.remain = values.remain;
        newAction.challenge = {
          qualityId: values.challengeQuality, 
          difficulty: values.challengeDifficulty, 
          luck: values.luck,
        };
        newAction.results.success = {
          remain: values.remain,
          changes: values.successChanges,
          report: {
            title: values.successTitle,
            text: values.successText,
          },
        };
        newAction.results.failure = {
          remain: values.remain,
          changes: values.failureChanges,
          report: {
            title: values.failureTitle,
            text: values.failureText,
          },
        };
        break;
      default:
    }
  
    dispatch(addActionToCreate(newAction));
  }

  function markChanged() {
    setChanged(true);
  }

  function deleteAction() {
    deleteItem(data.id);
  }

  return (
    <CreateFormDiv changed={changed}>
      <p>ID: {data.id}</p>
      <Formik
        initialValues={initialValues}
        validate={null}
        enableReinitialize={true}
        onSubmit={(values, actions) => {
          setTimeout(() => {
            submitForm(values)
            setChanged(false);
            actions.setSubmitting(false);
          }, 400);
        }}
      >
        {({ values, isSubmitting }) => (
          <Form autoComplete="off" onChange={() => markChanged()}>
            
            <label htmlFor="title">Title</label>
            <Field type="text" name="title" />
            <ErrorMessage name="title" component="div" />

            <label htmlFor="text">Text</label>
            <Field name="text" as="textarea" />
            <ErrorMessage name="text" component="div" />

            <FormSectionTitle>Results</FormSectionTitle>
            <label htmlFor="resultsType">Type</label>
            <Field name="resultsType" as="select">
              <option value="modify">Modify</option>
              <option value="context">Context</option>
              <option value="challenge">Challenge</option>
            </Field>
          
            {values.resultsType === 'modify' ? <div>
              <FormSectionTitle htmlFor="changes">Quality Changes</FormSectionTitle>
              <FieldArray name="changes">
                {({ insert, remove, push }) => (
                  <FormDividerDiv>
                    <FormArrayDiv>
                      {values.changes.map((req, index) => (
                        <FormArrayElementDiv key={index}>  
                          <label htmlFor={`changes.${index}.id`}>Quality</label>
                          <Field name={`changes.${index}.id`} as="select">
                            {Object.values(createData.qualities).map(quality =>
                              <option key={quality.id} value={quality.id}>{quality.name}</option>
                            )}
                          </Field>

                          <label htmlFor={`changes.${index}.type`}>Type</label>
                          <Field name={`changes.${index}.type`} as="select">
                            <option value="adjust">Adjust</option>
                            <option value="set">Set</option>
                            <option value="percent">Percentage</option>
                            <option value="range">Range</option>
                          </Field>
                          
                          <label htmlFor={`changes.${index}.value`}>{values.changes[index].type === "range" ? "Min" :" Value"}</label>
                          <Field name={`changes.${index}.value`} type="number" />

                          {values.changes[index].type === "range" ? 
                            <div> 
                              <label htmlFor={`changes.${index}.max`}>Max</label>
                              <Field name={`changes.${index}.max`} type="number" min="1" />
                            </div>
                          : null
                          }

                          <button type="button" onClick={() => remove(index)}>
                            Remove Change
                          </button>
                        </FormArrayElementDiv>
                      ))}
                    </FormArrayDiv>
                    <button type="button" onClick={() => push({ id: 'domain', type: 'adjust', value: 0, max: 1 })}>
                      Add a Change
                    </button>
                  </FormDividerDiv>
                )}
              </FieldArray>
              
              <FormSectionTitle>Report</FormSectionTitle>
              <label htmlFor="hideReport">Hide Report</label>
              <Field type="checkbox" name="hideReport" />

              {values.hideReport ? null :
              <div>
                <label htmlFor="reportTitle">Report Title</label>
                <Field  name="reportTitle" type="text" />
                <ErrorMessage name="reportTitle" component="div" />

                <label htmlFor="reportText">Report Text</label>
                <Field name="reportText" as="textarea"  />
                <ErrorMessage name="reportText" component="div" />
              </div>
              }
            </div> : null}  

            {values.resultsType==='context' ? <div>
              <label htmlFor="context">Open context:</label>
                {createData.contexts  
                  ? <Field name="context" as="select">
                    {Object.values(createData.contexts).map(
                      context => <option key={context.id} value={context.id}>{context.title} (id: {context.id})</option>
                    )}
                    </Field>
                  : <p>No contexts.</p>
                }
            </div> : null}

            {values.resultsType === 'challenge' ? <div>
            <FormSectionTitle>Challenge</FormSectionTitle>
            <label htmlFor="luck">Luck</label>
            <Field type="checkbox" name="luck" />
            {values.luck ? null :
              <div>
                <label htmlFor="challengeQuality">Challenge Quality</label>
                <Field name="challengeQuality" as="select">
                  {Object.values(createData.qualities).map(quality =>
                    <option key={quality.id} value={quality.id}>{quality.name}</option>
                  )}
                </Field>
              </div>
            }
            <label htmlFor="challengeDifficulty">Difficulty</label>
            <Field type="number" name="challengeDifficulty" min="0" />

            <FormSectionTitle>Success</FormSectionTitle>
            <FormSectionTitle htmlFor="successChanges">Success Quality Changes</FormSectionTitle>
              <FieldArray name="successChanges">
                {({ insert, remove, push }) => (
                  <FormDividerDiv>
                    <FormArrayDiv>
                      {values.successChanges.map((req, index) => (
                        <FormArrayElementDiv key={index}>  
                          <label htmlFor={`successChanges.${index}.id`}>Quality</label>
                          <Field name={`successChanges.${index}.id`} as="select">
                            {Object.values(createData.qualities).map(quality =>
                              <option key={quality.id} value={quality.id}>{quality.name}</option>
                            )}
                          </Field>

                          <label htmlFor={`successChanges.${index}.type`}>Type</label>
                          <Field name={`successChanges.${index}.type`} as="select">
                            <option value="adjust">Adjust</option>
                            <option value="set">Set</option>
                            <option value="percent">Percentage</option>
                            <option value="range">Range</option>
                          </Field>
                          
                          <label htmlFor={`successChanges.${index}.value`}>{values.successChanges[index].type === "range" ? "Min" :" Value"}</label>
                          <Field name={`successChanges.${index}.value`} type="number" />

                          {values.successChanges[index].type === "range" ? 
                            <div> 
                              <label htmlFor={`successChanges.${index}.max`}>Max</label>
                              <Field name={`successChanges.${index}.max`} type="number" min="1" />
                            </div>
                          : null
                          }

                          <button type="button" onClick={() => remove(index)}>
                            Remove Change
                          </button>
                        </FormArrayElementDiv>
                      ))}
                    </FormArrayDiv>
                    <button type="button" onClick={() => push({ id: 'domain', type: 'adjust', value: 0, max: 1 })}>
                      Add a Change
                    </button>
                  </FormDividerDiv>
                )}
              </FieldArray>

              <label htmlFor="successTitle">Success Report Title</label>
              <Field  name="successTitle" type="text" />
              <ErrorMessage name="successTitle" component="div" />

              <label htmlFor="successText">Success Text</label>
              <Field name="successText" as="textarea"  />
              <ErrorMessage name="successText" component="div" />

              <FormSectionTitle>Failure</FormSectionTitle>
              <FormSectionTitle htmlFor="failureChanges">Failure Quality Changes</FormSectionTitle>
              <FieldArray name="failureChanges">
                {({ insert, remove, push }) => (
                  <FormDividerDiv>
                    <FormArrayDiv>
                      {values.failureChanges.map((req, index) => (
                        <FormArrayElementDiv key={index}>  
                          <label htmlFor={`failureChanges.${index}.id`}>Quality</label>
                          <Field name={`failureChanges.${index}.id`} as="select">
                            {Object.values(createData.qualities).map(quality =>
                              <option key={quality.id} value={quality.id}>{quality.name}</option>
                            )}
                          </Field>

                          <label htmlFor={`failureChanges.${index}.type`}>Type</label>
                          <Field name={`failureChanges.${index}.type`} as="select">
                            <option value="adjust">Adjust</option>
                            <option value="set">Set</option>
                            <option value="percent">Percentage</option>
                            <option value="range">Range</option>
                          </Field>
                          
                          <label htmlFor={`failureChanges.${index}.value`}>{values.failureChanges[index].type === "range" ? "Min" :" Value"}</label>
                          <Field name={`failureChanges.${index}.value`} type="number" />

                          {values.failureChanges[index].type === "range" ? 
                            <div> 
                              <label htmlFor={`failureChanges.${index}.max`}>Max</label>
                              <Field name={`failureChanges.${index}.max`} type="number" min="1" />
                            </div>
                          : null
                          }

                          <button type="button" onClick={() => remove(index)}>
                            Remove Change
                          </button>
                        </FormArrayElementDiv>
                      ))}
                    </FormArrayDiv>
                    <button type="button" onClick={() => push({ id: 'domain', type: 'adjust', value: 0, max: 1 })}>
                      Add a Change
                    </button>
                  </FormDividerDiv>
                )}
              </FieldArray>

              <label htmlFor="failureTitle">Failure Report Title</label>
              <Field  name="failureTitle" type="text" />
              <ErrorMessage name="failureTitle" component="div" />

              <label htmlFor="failureText">Failure Text</label>
              <Field name="failureText" as="textarea"  />
              <ErrorMessage name="failureText" component="div" />

            </div> : null}

              <FormSectionTitle htmlFor="reqs">Quality Requirements</FormSectionTitle>
              <FieldArray name="reqs">
                {({ insert, remove, push }) => (
                  <FormDividerDiv>
                    <FormArrayDiv>
                      {values.reqs.map((req, index) => (
                        <FormArrayElementDiv key={index}>  
                          <label htmlFor={`reqs.${index}.comparison`}>Comparison</label>
                          <Field name={`reqs.${index}.comparison`} type="checkbox" />

                          {values.reqs[index].comparison
                            ? <div>
                              <label htmlFor={`reqs.${index}.firstQualityId`}>Quality</label>
                              <Field name={`reqs.${index}.firstQualityId`} as="select">
                              {Object.values(createData.qualities).map(quality =>
                                <option key={quality.id} value={quality.id}>{quality.name}</option>
                              )}
                              </Field>

                              <label htmlFor={`reqs.${index}.comparisonType`}>Is</label>
                              <Field name={`reqs.${index}.comparisonType`} as="select">
                                <option value=">">Greater than</option>
                                <option value=">=">Greater than or equal</option>
                                <option value="=">Equal to</option>
                              </Field>

                              <label htmlFor={`reqs.${index}.secondQualityId`}>Quality</label>
                              <Field name={`reqs.${index}.secondQualityId`} as="select">
                              {Object.values(createData.qualities).map(quality =>
                                <option key={quality.id} value={quality.id}>{quality.name}</option>
                              )}
                              </Field>

                            </div>
                            : <div>
                              <label htmlFor={`reqs.${index}.qualityId`}>Quality</label>
                              <Field name={`reqs.${index}.qualityId`} as="select">
                              {Object.values(createData.qualities).map(quality =>
                                <option key={quality.id} value={quality.id}>{quality.name}</option>
                              )}
                              </Field>

                              <label htmlFor={`reqs.${index}.min`}>Min</label>
                              <Field name={`reqs.${index}.min`} type="number" min="0" />

                              <label htmlFor={`reqs.${index}.max`}>Max</label>
                              <Field name={`reqs.${index}.max`} type="number" />
                            </div>
                          }

                        <button type="button" onClick={() => remove(index)} >
                          Remove Requirement
                        </button>
                      </FormArrayElementDiv>  
                    ))}
                    </FormArrayDiv>
                    <button type="button" onClick={() => push({ 
                      qualityId:'domain', 
                      min: 0, 
                      max: null,
                      comparison: false,
                      firstQualityId: 'domain',
                      secondQualityId: 'domain',
                      comparisonType: "=",
                    })}>
                      Add a Requirement
                    </button>
                  </FormDividerDiv>
                )}
              </FieldArray>
          
            <label htmlFor="revealType">Reveal Type</label>
            <Field name="revealType" as="select">
              <option value="always">Always</option>
              <option value="all">When all requirements are met</option>
              <option value="some">When at least one requirement is met</option>
            </Field>
            
            {(values.resultsType=== "modify" || values.resultsType=== "challenge") && parentType === "contexts" ? <div>
              <label htmlFor="remain">Remain in context</label>
              <Field type="checkbox" name="remain" />
            </div> : null}
              
            <FormArrayDiv>
              {parentType === "domains"
                ? <FormArrayElementDiv>
                  <label htmlFor="dynamic">Dynamic action</label>
                  <Field type="checkbox" name="dynamic" />
                </FormArrayElementDiv>
                : null
              }
              
              {values.dynamic 
                ? <FormArrayElementDiv>
                  <label htmlFor="fixed">Fixed</label>
                  <Field name="fixed" type="checkbox" />
                </FormArrayElementDiv>
                : null
              }
              
            </FormArrayDiv>  
            
            <button type="submit" disabled={isSubmitting}>
              Save
            </button>
          </Form>
        )}
      </Formik>
      <FormDeleteButton onClick={deleteAction}><p>Delete Action</p></FormDeleteButton>
    </CreateFormDiv> 
  );
}

export default NewActionForm