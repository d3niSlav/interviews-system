import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';

import { createNewJobTitleAction, editJobTitleAction } from '../job-titles.actions';
import { CreateJobTitleDTO, EditJobTitleDTO, JobTitleDTO } from '../job-titles.dto';
import { selectJobTitle } from '../job-titles.selectors';
import { CREATE_JOB_TITLE, EDIT_JOB_TITLE, LOAD_JOB_TITLE } from '../job-titles.types';
import styles from '../../Auth/Auth.module.scss';
import Button from '../../../components/Button';
import { composeValidators, minValue, mustBeNumber, notEmpty, TextInputField } from '../../../components/FormFields';
import { MODAL_ANIMATION_DURATION } from '../../../components/Modal';
import {
  selectAreRequestsLoading,
  selectRequestErrorMessage,
  selectRequestFormErrors,
} from '../../../shared/state/global-request';

type JobTitleFormProps = {
  isEdit?: boolean;
  isOpen?: boolean;
  onFormClose: () => void;
};

const JobTitleForm: FunctionComponent<JobTitleFormProps> = ({ isEdit = false, onFormClose }) => {
  const dispatch = useDispatch();
  const currentJobTitle = useSelector(selectJobTitle) as JobTitleDTO;

  const isLoading = useSelector(selectAreRequestsLoading([CREATE_JOB_TITLE, EDIT_JOB_TITLE, LOAD_JOB_TITLE]));
  const formErrors = useSelector(selectRequestFormErrors(isEdit ? EDIT_JOB_TITLE : CREATE_JOB_TITLE));
  const mainError = useSelector(selectRequestErrorMessage(isEdit ? EDIT_JOB_TITLE : CREATE_JOB_TITLE));

  const onSubmit = async (data: CreateJobTitleDTO | EditJobTitleDTO) => {
    const { minSalary, averageSalary, maxSalary, ...formData } = data;
    const jobTitleData = {
      ...formData,
      ...(typeof minSalary !== 'undefined' ? { minSalary: +minSalary } : {}),
      ...(typeof averageSalary !== 'undefined' ? { averageSalary: +averageSalary } : {}),
      ...(typeof maxSalary !== 'undefined' ? { maxSalary: +maxSalary } : {}),
    };

    if (isEdit && currentJobTitle?.id) {
      const { id } = currentJobTitle as JobTitleDTO;
      dispatch(editJobTitleAction({ ...jobTitleData, id }));
    } else {
      dispatch(createNewJobTitleAction({ ...jobTitleData }));
    }
  };

  const closeForm = (reset?: any) => {
    setTimeout(() => {
      reset && reset({});
    }, MODAL_ANIMATION_DURATION);
    onFormClose && onFormClose();
  };

  return (
    <Form
      initialValues={{
        ...currentJobTitle,
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine, form }) => (
        <form onSubmit={handleSubmit} className={`full-width ${styles.form}`}>
          <TextInputField
            title="Title"
            name="title"
            placeholder="Enter job title..."
            required
            error={mainError || (Array.isArray(formErrors.title) ? formErrors.title[0] : '')}
            fieldProps={{
              validate: composeValidators(notEmpty('Please, enter a job title!')),
            }}
          />
          <TextInputField
            title="Short title"
            name="shortTitle"
            placeholder="Enter short title..."
            error={Array.isArray(formErrors.shortTitle) ? formErrors.shortTitle[0] : ''}
          />
          <TextInputField
            title="Min salary"
            name="minSalary"
            placeholder="Enter minimal salary..."
            type="number"
            error={Array.isArray(formErrors.minSalary) ? formErrors.minSalary[0] : ''}
            fieldProps={{
              validate: composeValidators(minValue(0, 'Enter a valid salary!'), mustBeNumber('Enter a valid salary!')),
            }}
          />
          <TextInputField
            title="Average salary"
            name="averageSalary"
            type="number"
            placeholder="Enter average salary..."
            error={Array.isArray(formErrors.averageSalary) ? formErrors.averageSalary[0] : ''}
            fieldProps={{
              validate: composeValidators(minValue(0, 'Enter a valid salary!'), mustBeNumber('Enter a valid salary!')),
            }}
          />
          <TextInputField
            title="Max salary"
            name="maxSalary"
            type="number"
            placeholder="Enter maximum salary..."
            error={Array.isArray(formErrors.maxSalary) ? formErrors.maxSalary[0] : ''}
            fieldProps={{
              validate: composeValidators(minValue(0, 'Enter a valid salary!'), mustBeNumber('Enter a valid salary!')),
            }}
          />
          <div className="modal-actions">
            <Button
              className={styles.submitAction}
              disabled={submitting || pristine}
              text={isEdit ? 'Save' : 'Create'}
              type="submit"
            />
            <Button onClick={() => closeForm(form.reset)} text="Close" />
          </div>
        </form>
      )}
    />
  );
};

export default JobTitleForm;
