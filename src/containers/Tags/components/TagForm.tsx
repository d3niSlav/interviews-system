import React, { FunctionComponent } from 'react';
import { Form } from 'react-final-form';
import { useDispatch, useSelector } from 'react-redux';

import { createNewTagAction, editTagAction } from '../tags.actions';
import { CreateTagDTO, EditTagDTO, TagDTO } from '../tags.dto';
import { selectTag } from '../tags.selectors';
import { CREATE_TAG, EDIT_TAG, LOAD_TAG } from '../tags.types';
import styles from '../../Auth/Auth.module.scss';
import Button from '../../../components/Button';
import { composeValidators, notEmpty, TextInputField } from '../../../components/FormFields';
import { MODAL_ANIMATION_DURATION } from '../../../components/Modal';
import {
  selectAreRequestsLoading,
  selectRequestErrorMessage,
  selectRequestFormErrors,
} from '../../../shared/state/global-request';

type TagFormProps = {
  isEdit?: boolean;
  isOpen?: boolean;
  onFormClose: () => void;
};

const TagForm: FunctionComponent<TagFormProps> = ({ isEdit = false, isOpen, onFormClose }) => {
  const dispatch = useDispatch();
  const currentTag = useSelector(selectTag) as TagDTO;

  const isLoading = useSelector(selectAreRequestsLoading([CREATE_TAG, EDIT_TAG, LOAD_TAG]));
  const formErrors = useSelector(selectRequestFormErrors(isEdit ? EDIT_TAG : CREATE_TAG));
  const mainError = useSelector(selectRequestErrorMessage(isEdit ? EDIT_TAG : CREATE_TAG));

  const onSubmit = async (data: CreateTagDTO | EditTagDTO) => {
    if (isEdit && currentTag?.id) {
      const { id } = currentTag as TagDTO;
      dispatch(editTagAction({ ...data, id }));
    } else {
      dispatch(createNewTagAction({ ...data }));
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
        ...currentTag,
      }}
      onSubmit={onSubmit}
      render={({ handleSubmit, submitting, pristine, form }) => (
        <form onSubmit={handleSubmit} className={`full-width ${styles.form}`}>
          <TextInputField
            title="Title"
            name="title"
            placeholder="Enter tag..."
            required
            error={mainError || (Array.isArray(formErrors.title) ? formErrors.title[0] : '')}
            fieldProps={{
              validate: composeValidators(notEmpty('Please, enter a tag!')),
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

export default TagForm;
