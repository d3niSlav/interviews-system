export enum TableHeadingActionType {
  primary = 'primary',
  secondary = 'secondary',
  selection = 'selection',
}

export interface TableHeadingAction {
  id?: string;
  handleOnClick: (data?: string[], areAllSelected?: boolean) => void;
  label?: string;
  type?: TableHeadingActionType;
}

export type TableHeadingOptions = {
  actions?: TableHeadingAction[];
  heading?: string;
};
