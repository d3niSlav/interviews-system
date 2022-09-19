import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';

import { createNewTopicAction, editTopicAction } from '../topics.actions';
import { CreateTopicDTO, EditTopicDTO, TopicDTO } from '../topics.dto';
import { selectTopic } from '../topics.selectors';
import { CREATE_TOPIC, EDIT_TOPIC, LOAD_TOPIC } from '../topics.types';
import styles from '../../Auth/Auth.module.scss';
import { selectAllSubjectsData } from '../../Subjects';
import { SubjectDTO } from '../../Subjects/subjects.dto';
import { selectAllTagsData } from '../../Tags';
import { TagDTO } from '../../Tags/tags.dto';
import Button from '../../../components/Button';
import { composeValidators, notEmpty, SelectField, TextInputField } from '../../../components/FormFields';
import { MODAL_ANIMATION_DURATION } from '../../../components/Modal';
import {
  selectAreRequestsLoading,
  selectRequestErrorMessage,
  selectRequestFormErrors,
} from '../../../shared/state/global-request';

type TopicFormProps = {
  isEdit?: boolean;
  isOpen?: boolean;
  onFormClose: () => void;
};

const TopicForm: FunctionComponent<TopicFormProps> = ({ isEdit = false, onFormClose }) => {
  const dispatch = useDispatch();
  const currentTopic = useSelector(selectTopic) as TopicDTO;
  const allSubjects = useSelector(selectAllSubjectsData) as Pick<SubjectDTO, 'id' | 'title'>[];
  const allTags = useSelector(selectAllTagsData) as Pick<TagDTO, 'id' | 'title'>[];

  const isLoading = useSelector(selectAreRequestsLoading([CREATE_TOPIC, EDIT_TOPIC, LOAD_TOPIC]));
  const formErrors = useSelector(selectRequestFormErrors(isEdit ? EDIT_TOPIC : CREATE_TOPIC));
  const mainError = useSelector(selectRequestErrorMessage(isEdit ? EDIT_TOPIC : CREATE_TOPIC));

  const onSubmit = async (data: CreateTopicDTO | EditTopicDTO) => {
    const { order, ...formData } = data;
    const topicData = {
      ...formData,
      ...(typeof order !== 'undefined' ? { order: +order } : {}),
    };

    if (isEdit && currentTopic?.id) {
      const { id } = currentTopic as TopicDTO;
      dispatch(editTopicAction({ ...topicData, id }));
    } else {
      dispatch(createNewTopicAction({ ...topicData }));
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
        ...currentTopic,
        subjectId: currentTopic?.subject?.id,
        tagIds: currentTopic?.tags ? currentTopic?.tags.map((tagData) => tagData.id) : [],
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
            title="Difficulty"
            name="difficulty"
            options={[
              { label: 'Easy', value: 'easy' },
              { label: 'Medium', value: 'medium' },
              { label: 'Hard', value: 'hard' },
            ]}
          />
          <SelectField
            title="Subject"
            name="subjectId"
            options={allSubjects.map(({ id, title }) => ({ label: title, value: id }))}
          />
          <TextInputField
            title="Order"
            name="order"
            placeholder="Add order..."
            type="number"
            error={Array.isArray(formErrors.order) ? formErrors.order[0] : ''}
          />
          <SelectField
            title="Tags"
            name="tagIds"
            isMulti={true}
            options={allTags.map(({ id, title }) => ({ label: title, value: id }))}
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

export default TopicForm;
