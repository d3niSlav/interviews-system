import { AttachmentResponseDTO } from './attachments.types';
import { del, get, post } from '../../api';
import { BasicResponseDTO } from '../../constants';

export const createAttachment = (attachmentData: FormData): Promise<AttachmentResponseDTO> => {
  return post<AttachmentResponseDTO, FormData>('/attachments', attachmentData);
};

export const getAttachment = (attachmentId: number): Promise<AttachmentResponseDTO> => {
  return get<AttachmentResponseDTO>(`/attachments/${attachmentId}`);
};

export const getImageAttachment = (attachmentId: number): Promise<AttachmentResponseDTO> => {
  return get<AttachmentResponseDTO>(`/attachments/${attachmentId}/image`);
};

export const deleteAttachment = (attachmentId: number): Promise<BasicResponseDTO> => {
  return del<AttachmentResponseDTO>(`/attachments/${attachmentId}`);
};
