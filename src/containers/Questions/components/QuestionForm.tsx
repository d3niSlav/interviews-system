import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';

import { createNewQuestionAction, editQuestionAction } from '../questions.actions';
import { CreateQuestionDTO, EditQuestionDTO, QuestionDTO } from '../questions.dto';
import { selectQuestion } from '../questions.selectors';
import { CREATE_QUESTION, EDIT_QUESTION, LOAD_QUESTION } from '../questions.types';
import styles from '../../Auth/Auth.module.scss';
import { selectAllTopicsData } from '../../Topics';
import { TopicDTO } from '../../Topics/topics.dto';
import Button from '../../../components/Button';
import { composeValidators, notEmpty, SelectField, TextAreaField } from '../../../components/FormFields';
import { MODAL_ANIMATION_DURATION } from '../../../components/Modal';
import {
  selectAreRequestsLoading,
  selectRequestErrorMessage,
  selectRequestFormErrors,
} from '../../../shared/state/global-request';

type QuestionFormProps = {
  isEdit?: boolean;
  isOpen?: boolean;
  onFormClose: () => void;
};

const QuestionForm: FunctionComponent<QuestionFormProps> = ({ isEdit = false, onFormClose }) => {
  const dispatch = useDispatch();
  const currentQuestion = useSelector(selectQuestion) as QuestionDTO;
  const allTopics = useSelector(selectAllTopicsData) as Pick<TopicDTO, 'id' | 'title'>[];

  const isLoading = useSelector(selectAreRequestsLoading([CREATE_QUESTION, EDIT_QUESTION, LOAD_QUESTION]));
  const formErrors = useSelector(selectRequestFormErrors(isEdit ? EDIT_QUESTION : CREATE_QUESTION));
  const mainError = useSelector(selectRequestErrorMessage(isEdit ? EDIT_QUESTION : CREATE_QUESTION));

  const onSubmit = async (data: CreateQuestionDTO | EditQuestionDTO) => {
    const { ...formData } = data;

    if (isEdit && currentQuestion?.id) {
      const { id } = currentQuestion as QuestionDTO;
      dispatch(editQuestionAction({ ...formData, id }));
    } else {
      dispatch(createNewQuestionAction({ ...formData }));
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
        ...currentQuestion,
        topicIds: currentQuestion?.topics ? currentQuestion?.topics.map((topicData) => topicData.id) : [],
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine, form }) => (
        <form onSubmit={handleSubmit} className={`full-width ${styles.form}`}>
          <TextAreaField
            title="Text"
            name="text"
            placeholder="Enter the question text..."
            rows={10}
            required
            error={mainError || (Array.isArray(formErrors.title) ? formErrors.title[0] : '')}
            fieldProps={{
              validate: composeValidators(notEmpty('Please, enter the question!')),
            }}
          />
          <SelectField
            title="Topics"
            name="topicIds"
            isMulti={true}
            options={allTopics.map(({ id, title }) => ({ label: title, value: id }))}
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

export default QuestionForm;
