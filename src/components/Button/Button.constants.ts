export type ButtonSizes = 'small' | 'medium' | 'large';

export type ButtonTypes = 'button' | 'submit' | 'reset';

export type ButtonProps = {
  className?: string;
  text?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: (data?: any) => void;
  outlined?: boolean;
  size?: ButtonSizes;
  type?: ButtonTypes;
};
