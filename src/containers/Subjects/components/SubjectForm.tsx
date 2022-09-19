import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';

import { createNewSubjectAction, editSubjectAction } from '../subjects.actions';
import { CreateSubjectDTO, EditSubjectDTO, SubjectDTO } from '../subjects.dto';
import { selectSubject } from '../subjects.selectors';
import { CREATE_SUBJECT, EDIT_SUBJECT, LOAD_SUBJECT } from '../subjects.types';
import styles from '../../Auth/Auth.module.scss';
import { selectAllTagsData } from '../../Tags';
import { TagDTO } from '../../Tags/tags.dto';
import { selectAllTopicsData } from '../../Topics';
import { TopicDTO } from '../../Topics/topics.dto';
import Button from '../../../components/Button';
import { composeValidators, notEmpty, SelectField, TextInputField } from '../../../components/FormFields';
import { MODAL_ANIMATION_DURATION } from '../../../components/Modal';
import {
  selectAreRequestsLoading,
  selectRequestErrorMessage,
  selectRequestFormErrors,
} from '../../../shared/state/global-request';

type SubjectFormProps = {
  isEdit?: boolean;
  isOpen?: boolean;
  onFormClose: () => void;
};

const SubjectForm: FunctionComponent<SubjectFormProps> = ({ isEdit = false, onFormClose }) => {
  const dispatch = useDispatch();
  const currentSubject = useSelector(selectSubject) as SubjectDTO;
  const allTags = useSelector(selectAllTagsData) as Pick<TagDTO, 'id' | 'title'>[];
  const allTopics = useSelector(selectAllTopicsData) as Pick<TopicDTO, 'id' | 'title'>[];

  const isLoading = useSelector(selectAreRequestsLoading([CREATE_SUBJECT, EDIT_SUBJECT, LOAD_SUBJECT]));
  const formErrors = useSelector(selectRequestFormErrors(isEdit ? EDIT_SUBJECT : CREATE_SUBJECT));
  const mainError = useSelector(selectRequestErrorMessage(isEdit ? EDIT_SUBJECT : CREATE_SUBJECT));

  const onSubmit = async (data: CreateSubjectDTO | EditSubjectDTO) => {
    const { order, ...formData } = data;
    const subjectData = {
      ...formData,
      ...(typeof order !== 'undefined' ? { order: +order } : {}),
    };

    if (isEdit && currentSubject?.id) {
      const { id } = currentSubject as SubjectDTO;
      dispatch(editSubjectAction({ ...subjectData, id }));
    } else {
      dispatch(createNewSubjectAction({ ...subjectData }));
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
        ...currentSubject,
        tagIds: currentSubject?.tags ? currentSubject?.tags.map((tagData) => tagData.id) : [],
        topicIds: currentSubject?.topics ? currentSubject?.topics.map((topicData) => topicData.id) : [],
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
            title="Order"
            name="order"
            placeholder="Add order..."
            type="number"
            error={Array.isArray(formErrors.order) ? formErrors.order[0] : ''}
          />
          <SelectField
            title="Topics"
            name="topicIds"
            isMulti={true}
            options={allTopics.map(({ id, title }) => ({ label: title, value: id }))}
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

export default SubjectForm;
