import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';

import { createNewInterviewAction, editInterviewAction } from '../interviews.actions';
import { CreateInterviewDTO, EditInterviewDTO, InterviewDTO } from '../interviews.dto';
import { selectInterview } from '../interviews.selectors';
import { CREATE_INTERVIEW, EDIT_INTERVIEW, LOAD_INTERVIEW } from '../interviews.types';
import styles from '../../Auth/Auth.module.scss';
import { selectAllCandidatesData } from '../../Candidates';
import { selectAllJobPositionsData } from '../../JobPositions';
import { selectAllTagsData } from '../../Tags';
import Button from '../../../components/Button';
import { composeValidators, notEmpty, SelectField, TextInputField } from '../../../components/FormFields';
import { MODAL_ANIMATION_DURATION } from '../../../components/Modal';
import {
  selectAreRequestsLoading,
  selectRequestErrorMessage,
  selectRequestFormErrors,
} from '../../../shared/state/global-request';
import { selectAllProgrammingLanguagesData } from '../../JobTitles';

type InterviewFormProps = {
  isEdit?: boolean;
  isOpen?: boolean;
  onFormClose: () => void;
};

const InterviewForm: FunctionComponent<InterviewFormProps> = ({ isEdit = false, onFormClose }) => {
  const dispatch = useDispatch();
  const currentInterview = useSelector(selectInterview) as InterviewDTO;
  const positions = useSelector(selectAllJobPositionsData);
  const candidates = useSelector(selectAllCandidatesData);
  const tags = useSelector(selectAllTagsData);
  const programmingLanguages = useSelector(selectAllProgrammingLanguagesData);

  const isLoading = useSelector(selectAreRequestsLoading([CREATE_INTERVIEW, EDIT_INTERVIEW, LOAD_INTERVIEW]));
  const formErrors = useSelector(selectRequestFormErrors(isEdit ? EDIT_INTERVIEW : CREATE_INTERVIEW));
  const mainError = useSelector(selectRequestErrorMessage(isEdit ? EDIT_INTERVIEW : CREATE_INTERVIEW));

  const onSubmit = async (data: CreateInterviewDTO | EditInterviewDTO) => {
    if (isEdit && currentInterview?.id) {
      const { id } = currentInterview as InterviewDTO;
      dispatch(editInterviewAction({ ...data, id }));
    } else {
      dispatch(createNewInterviewAction({ ...data }));
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
        ...currentInterview,
        positionId: currentInterview?.position?.id,
        programmingLanguageId: currentInterview?.programmingLanguage?.id,
        tagIds: currentInterview?.tags ? currentInterview.tags.map((tagData) => tagData.id) : [],
        candidatesIds: currentInterview?.candidates
          ? currentInterview.candidates.map((candidateDate) => candidateDate.id)
          : [],
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine, form }) => (
        <form onSubmit={handleSubmit} className={`full-width ${styles.form}`}>
          <TextInputField
            title="Title"
            name="title"
            placeholder="Enter title..."
            required
            error={mainError || (Array.isArray(formErrors.title) ? formErrors.title[0] : '')}
            fieldProps={{
              validate: composeValidators(notEmpty('Please, enter a title!')),
            }}
          />
          <TextInputField
            title="Date"
            name="interviewDate"
            placeholder="Enter date..."
            required
            error={Array.isArray(formErrors.interviewDate) ? formErrors.interviewDate[0] : ''}
            fieldProps={{
              validate: composeValidators(notEmpty('Please, enter an interview date!')),
            }}
          />
          <SelectField
            title="Position"
            name="positionId"
            required
            options={positions.map(({ id, title }) => ({ label: title, value: id }))}
          />
          <SelectField
            title="Programming language"
            name="programmingLanguageId"
            required
            options={programmingLanguages.map(({ id, title }) => ({ label: title, value: id }))}
          />
          <SelectField
            title="Tags"
            name="tagIds"
            isMulti
            options={tags.map(({ id, title }) => ({ label: title, value: id }))}
          />
          <SelectField
            title="Candidates"
            name="candidatesIds"
            isMulti
            options={candidates.map(({ id, firstName, lastName, email }) => ({
              label: `${firstName} ${lastName} (${email})`,
              value: id,
            }))}
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

export default InterviewForm;
