import { AttachmentDTO } from './attachments.types';
import { RootState } from '../../../store/reducers';

export const selectCurrentAttachment = (state: RootState): AttachmentDTO => state.attachments.current;
