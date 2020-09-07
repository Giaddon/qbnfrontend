import React from 'react';
import { useDispatch } from 'react-redux';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';

import { FormDividerDiv } from './formStyles';
import { addActionToCreate } from '../createToolsSlice';

function ActionModifyForm({ data, createData }) {
  const dispatch = useDispatch();

  function submitForm(values) {
    const newAction = {
      id: data.id,
      type: data.type,
      title: values.actionTitle,
      description: values.actionDescription,
      reveal: values.actionReveal,
      remain: values.actionRemain,
      reqs: values.reqs,
      results: {
        changes: values.changes,
        hide: values.hide,
        report: {
          title: values.reportTitle,
          description: values.reportDescription,
        }
      },
    }

    dispatch(addActionToCreate(newAction));

  }

  if (!data) return null;

  return (
    <Formik
      initialValues={{
        actionTitle: data.title || '',
        actionDescription: data.description || '',
        actionReveal: data.reveal || 'one',
        actionRemain: data.remain || false,
        reqs: data.reqs || [
          {
            id: '1',
            min: 0,
            max: 0,
          },
        ],
        hide: data.results?.hide || false,
        changes: data.results?.changes || [
          {
            id: '1',
            type: 'set',
            value: 0,
          },
        ],
        reportTitle: data.results?.report?.title || '',
        reportDescription: data.results?.report?.description || '',
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
            <label htmlFor="actionTitle" style={{ display: "block" }}>
              Title</label>
            <Field type="text" name="actionTitle" />
            <ErrorMessage name="actionTitle" component="div" />

            <label htmlFor="actionDescription" style={{ display: "block" }}>
              Description</label>
            <Field as="textarea" name="actionDescription" />
            <ErrorMessage name="actionDescription" component="div" />

            <label htmlFor="actionReveal">
              Reveal Type</label>
            <Field name="actionReveal" as="select">
              <option value="always">Always</option>
              <option value="all">When all requirements are met</option>
              <option value="one">When at least one requirement is met</option>
            </Field>

            <label htmlFor="actionRemain">
              Remain in storylet?</label>
            <Field type="checkbox" name="actionRemain" />

            <label htmlFor="hide">
              Hide Report?</label>
            <Field type="checkbox" name="hide" />
            <ErrorMessage name="hide" component="div" />

            {values.hide ? null :
              <div>
                <label htmlFor="reportTitle">
                  Report Title</label>
                <Field type="text" name="reportTitle" />
                <ErrorMessage name="reportTitle" component="div" />

                <label htmlFor="reportDescription">
                  Report Text</label>
                <Field as="textarea" name="reportDescription" />
                <ErrorMessage name="reportDescription" component="div" />
              </div>
            }

            <label htmlFor="reqs">Quality Changes</label>
            <FieldArray name="changes">
              {({ insert, remove, push }) => (
                <div>
                  {values.changes.map((req, index) => (
                    <FormDividerDiv key={index}>

                      <label htmlFor={`changes.${index}.id`}>
                        Quality</label>
                      <Field name={`changes.${index}.id`} as="select">
                        {Object.values(createData.qualities).map(quality =>
                          <option key={quality.id} value={quality.id}>{quality.name}</option>
                        )}
                      </Field>

                      <label htmlFor={`changes.${index}.type`}>
                        Type</label>
                      <Field name={`changes.${index}.type`} as="select">
                        <option value="adjust">Adjust</option>
                        <option value="set">Set</option>
                        <option value="precent">Percentage</option>
                      </Field>
                      <label htmlFor={`changes.${index}.value`}>
                        Value</label>
                      <Field name={`changes.${index}.value`} type="number" />

                      <button
                        type="button"
                        onClick={() => remove(index)}
                      >
                        Remove Change
                          </button>
                    </FormDividerDiv>
                  ))}
                  <button type="button" onClick={() => push({ id: '', type: 'adjust', value: 0 })}>
                    Add a Change
                        </button>
                </div>

              )}
            </FieldArray>

            <label htmlFor="reqs">Requirements</label>
            <FieldArray name="reqs">
              {({ insert, remove, push }) => (
                <div>
                  {values.reqs.map((req, index) => (
                    <FormDividerDiv key={index}>

                      <label htmlFor={`reqs.${index}.id`}>
                        Quality</label>
                      <Field name={`reqs.${index}.id`} as="select">
                        {Object.values(createData.qualities).map(quality =>
                          <option key={quality.id} value={quality.id}>{quality.name}</option>
                        )}
                      </Field>

                      <label htmlFor={`reqs.${index}.min`}>
                        Min</label>
                      <Field name={`reqs.${index}.min`} type="number" min="0" />

                      <label htmlFor={`reqs.${index}.max`}>
                        Max</label>
                      <Field name={`reqs.${index}.max`} type="number" />

                      <button
                        type="button"
                        onClick={() => remove(index)} // remove a req from the list
                      >
                        Remove Requirement
                          </button>
                    </FormDividerDiv>
                  ))}
                  <button type="button" onClick={() => push({ id: '', min: 0, max: 0 })}>
                    {/* show this when user has removed all reqs from the list */}
                     Add a Requirement
                        </button>
                </div>

              )}
            </FieldArray>

            <br /><button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
    </Formik>
  )
}

function ActionStoryletForm({ data, createData }) {
  const dispatch = useDispatch();

  function submitForm(values) {
    const newAction = {
      id: data.id,
      type: data.type,
      title: values.actionTitle,
      description: values.actionDescription,
      reveal: values.actionReveal,
      remain: values.actionRemain,
      reqs: values.reqs,
      results: {
        hide: true,
        storylet: values.actionStorylet
      },
    }

    dispatch(addActionToCreate(newAction));

  }

  if (!data) return null;

  return (
    <Formik
      initialValues={{
        actionTitle: data.title || '',
        actionDescription: data.description || '',
        actionReveal: data.reveal || 'one',
        actionRemain: data.remain || false,
        reqs: data.reqs || [
          {
            id: '1',
            min: 0,
            max: 0,
          }
        ],
        results: {
          storylet: data.results?.storylet || ''
        }
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
            <label htmlFor="actionTitle">
              Title</label>
            <Field type="text" name="actionTitle" />
            <ErrorMessage name="actionTitle" component="div" />

            <label htmlFor="actionDescription">
              Description</label>
            <Field as="textarea" name="actionDescription" />
            <ErrorMessage name="actionDescription" component="div" />

            <label htmlFor="actionReveal">
              Reveal Type</label>
            <Field name="actionReveal" as="select">
              <option value="always">Always</option>
              <option value="all">When all requirements are met</option>
              <option value="one">When at least one requirement is met</option>
            </Field>

            <label htmlFor="actionStorylet">Open storylet:</label>
            <Field name="actionStorylet" as="select">
              {Object.values(createData.storylets).map(storylet => 
                <option key={storylet.id} value={storylet.id}>{storylet.title} (id: {storylet.id})</option>
              )}
            </Field>

            <label htmlFor="actionRemain">
              Remain in storylet?</label>
            <Field type="checkbox" name="actionRemain" />

            <label htmlFor="reqs">Requirements</label>
            <FieldArray name="reqs">
              {({ insert, remove, push }) => (
                <div>
                  {values.reqs.map((req, index) => (
                    <FormDividerDiv key={index}>
                      <label htmlFor={`reqs.${index}.id`}>
                        Quality</label>
                      <Field name={`reqs.${index}.id`} as="select">
                        {Object.values(createData.qualities).map(quality =>
                          <option key={quality.id} value={quality.id}>{quality.name}</option>
                        )}
                      </Field>

                      <label htmlFor={`reqs.${index}.min`}>
                        Min</label>
                      <Field name={`reqs.${index}.min`} type="number" min="0" />

                      <label htmlFor={`reqs.${index}.max`}>
                        Max</label>
                      <Field name={`reqs.${index}.max`} type="number" />

                      <button
                        type="button"
                        onClick={() => remove(index)} // remove a req from the list
                      >
                        Remove Requirement
                          </button>
                    </FormDividerDiv>
                  ))}
                  <button type="button" onClick={() => push({ id: '', min: 0, max: 0 })}>
                    {/* show this when user has removed all reqs from the list */}
                     Add a Requirement
                        </button>
                </div>

              )}
            </FieldArray>

            <br /><button type="submit" disabled={isSubmitting}>
              Submit
            </button>
          </Form>
        )}
    </Formik>
  )
}

function ActionChallengeForm({ data, createData }) {
  const dispatch = useDispatch();

  function submitForm(values) {
    const newAction = {
      id: data.id,
      type: data.type,
      title: values.actionTitle,
      description: values.actionDescription,
      reveal: values.actionReveal,
      remain: values.actionRemain,
      luck: values.actionLuck,
      reqs: [
        {
          id: values.challengeQuality,
          difficulty: values.challengeDifficulty,
        }
      ],
      results: {
        hide: false,
        success: {
          changes: values.successChanges,
          report: {
            title: values.successTitle,
            description: values.successDescription,
          }
        },
        failure: {
          changes: values.failureChanges,
          report: {
            title: values.failureTitle,
            description: values.failureDescription,
          }
        }
      },
    }

    dispatch(addActionToCreate(newAction));

  }

  if (!data) return null;

  return (
    <Formik
      initialValues={{
        actionTitle: data.title || '',
        actionDescription: data.description || '',
        actionReveal: data.reveal || 'one',
        actionRemain: data.remain || false,
        actionLuck: data.actionLuck || false,
        challengeQuality: data.reqs[0]?.id || '1',
        challengeDifficulty: data.reqs[0]?.difficulty || 1,
        successTitle: data.results?.success?.report?.title || "",
        successDescription: data.results?.success?.report?.description || "",
        successChanges: data.results?.success?.changes || [
          {
            id: '1',
            type: 'set',
            value: 0,
          },
        ],
        failureTitle: data.results?.failure?.report?.title || "",
        failureDescription: data.results?.failure?.report?.description || "",
        failureChanges: data.results?.failure?.changes || [
          {
            id: '1',
            type: 'set',
            value: 0,
          },
        ],
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
            <label htmlFor="actionTitle" style={{ display: "block" }}>
              Title</label>
            <Field type="text" name="actionTitle" />
            <ErrorMessage name="actionTitle" component="div" />

            <label htmlFor="actionDescription" style={{ display: "block" }}>
              Description</label>
            <Field as="textarea" name="actionDescription" />
            <ErrorMessage name="actionDescription" component="div" />

            <label htmlFor="actionReveal">
              Reveal Type</label>
            <Field name="actionReveal" as="select">
              <option value="always">Always</option>
              <option value="all">When all requirements are met</option>
              <option value="one">When at least one requirement is met</option>
            </Field>

            <label htmlFor="actionRemain">
              Remain in storylet?</label>
            <Field type="checkbox" name="actionRemain" />

            <label htmlFor="actionLuck">
              Pure luck?</label>
            <Field type="checkbox" name="actionLuck" />

            {values.actionLuck ? null :
              <div>
                <label htmlFor="challengeQuality">
                  Challenge Quality</label>
                <Field name="challengeQuality" as="select">
                  {Object.values(createData.qualities).map(quality =>
                    <option key={quality.id} value={quality.id}>{quality.name}</option>
                  )}
                </Field>
              </div>
            }

            <label htmlFor="challengeDifficulty">
              Difficulty</label>
            <Field type="number" name="challengeDifficulty" min="0" />

            <FormDividerDiv>
              <label>Success</label>
              <label htmlFor="successTitle">Success Title</label>
              <Field name="successTitle" type="text" />

              <label htmlFor="successDescription">Success Description</label>
              <Field name="successDescription" as="textarea" />

              <label htmlFor="reqs">Quality Changes</label>
              <FieldArray name="successChanges">
                {({ insert, remove, push }) => (
                  <div>
                    {values.successChanges.map((req, index) => (
                      <FormDividerDiv key={index}>
                        <label htmlFor={`successChanges.${index}.id`}>
                          Quality</label>
                        <Field name={`successChanges.${index}.id`} as="select">
                          {Object.values(createData.qualities).map(quality =>
                            <option key={quality.id} value={quality.id}>{quality.name}</option>
                          )}
                        </Field>

                        <label htmlFor={`successChanges.${index}.type`}>
                          Type</label>
                        <Field name={`successChanges.${index}.type`} as="select">
                          <option value="adjust">Adjust</option>
                          <option value="set">Set</option>
                          <option value="precent">Percentage</option>
                        </Field>
                        <label htmlFor={`successChanges.${index}.value`}>
                          Value</label>
                        <Field name={`successChanges.${index}.value`} type="number" />

                        <button
                          type="button"
                          onClick={() => remove(index)}
                        >
                          Remove Change
                        </button>
                      </FormDividerDiv>
                    ))}
                    <button type="button" onClick={() => push({ id: '', type: 'adjust', value: 0 })}>
                      Add a Change
                      </button>
                  </div>

                )}
              </FieldArray>
            </FormDividerDiv>

            <FormDividerDiv>
              <label>Failure</label>
              <label htmlFor="failureTitle">Failure Title</label>
              <Field name="failureTitle" type="text" />

              <label htmlFor="failureDescription">Failure Description</label>
              <Field name="failureDescription" as="textarea" />

              <label htmlFor="reqs">Quality Changes</label>
              <FieldArray name="failureChanges">
                {({ insert, remove, push }) => (
                  <div>
                    {values.failureChanges.map((req, index) => (
                      <FormDividerDiv key={index}>
                        <label htmlFor={`failureChanges.${index}.id`}>
                          Quality</label>
                        <Field name={`failureChanges.${index}.id`} as="select">
                          {Object.values(createData.qualities).map(quality =>
                            <option key={quality.id} value={quality.id}>{quality.name}</option>
                          )}
                        </Field>

                        <label htmlFor={`failureChanges.${index}.type`}>
                          Type</label>
                        <Field name={`failureChanges.${index}.type`} as="select">
                          <option value="adjust">Adjust</option>
                          <option value="set">Set</option>
                          <option value="precent">Percentage</option>
                        </Field>
                        <label htmlFor={`failureChanges.${index}.value`}>
                          Value</label>
                        <Field name={`failureChanges.${index}.value`} type="number" />

                        <button
                          type="button"
                          onClick={() => remove(index)}
                        >
                          Remove Change
                        </button>
                      </FormDividerDiv>
                    ))}
                    <button type="button" onClick={() => push({ id: '', type: 'adjust', value: 0 })}>
                      Add a Change
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
  )
}

export { ActionModifyForm, ActionStoryletForm, ActionChallengeForm };