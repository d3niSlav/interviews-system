import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';

import { createNewJobPositionAction, editJobPositionAction } from '../job-positions.actions';
import { CreateJobPositionDTO, EditJobPositionDTO, JobPositionDTO } from '../job-positions.dto';
import { selectJobPosition } from '../job-positions.selectors';
import { CREATE_JOB_POSITION, EDIT_JOB_POSITION, LOAD_JOB_POSITION } from '../job-positions.types';
import styles from '../../Auth/Auth.module.scss';
import { selectAllJobTitlesData } from '../../JobTitles';
import { JobTitleDTO } from '../../JobTitles/job-titles.dto';
import Button from '../../../components/Button';
import {
  composeValidators,
  notEmpty,
  SelectField,
  TextAreaField,
  TextInputField,
} from '../../../components/FormFields';
import { MODAL_ANIMATION_DURATION } from '../../../components/Modal';
import {
  selectAreRequestsLoading,
  selectRequestErrorMessage,
  selectRequestFormErrors,
} from '../../../shared/state/global-request';

type JobPositionFormProps = {
  isEdit?: boolean;
  isOpen?: boolean;
  onFormClose: () => void;
};

const JobPositionForm: FunctionComponent<JobPositionFormProps> = ({ isEdit = false, onFormClose }) => {
  const dispatch = useDispatch();
  const currentJobPosition = useSelector(selectJobPosition) as JobPositionDTO;
  const jobTitles = useSelector(selectAllJobTitlesData) as Pick<JobTitleDTO, 'id' | 'title'>[];

  const isLoading = useSelector(selectAreRequestsLoading([CREATE_JOB_POSITION, EDIT_JOB_POSITION, LOAD_JOB_POSITION]));
  const formErrors = useSelector(selectRequestFormErrors(isEdit ? EDIT_JOB_POSITION : CREATE_JOB_POSITION));
  const mainError = useSelector(selectRequestErrorMessage(isEdit ? EDIT_JOB_POSITION : CREATE_JOB_POSITION));

  const onSubmit = async (data: CreateJobPositionDTO | EditJobPositionDTO) => {
    if (isEdit && currentJobPosition?.id) {
      const { id } = currentJobPosition as JobPositionDTO;
      dispatch(editJobPositionAction({ ...data, id }));
    } else {
      dispatch(createNewJobPositionAction({ ...data }));
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
        ...currentJobPosition,
        jobTitleId: currentJobPosition?.jobTitle?.id,
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
          <SelectField
            title="Job title"
            name="jobTitleId"
            required
            options={jobTitles.map(({ id, title }) => ({ label: title, value: id }))}
          />
          <TextAreaField
            title="Description"
            name="description"
            placeholder="Enter additional description..."
            rows={5}
          />
          <div className="modal-actions">
            <Button
              className={styles.submitAction}
              disabled={submitting || pristine || isLoading}
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

export default JobPositionForm;
