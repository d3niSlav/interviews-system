export interface TagDTO {
  id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateTagDTO {
  title: string;
}

export interface EditTagDTO extends CreateTagDTO {
  id: string;
}
