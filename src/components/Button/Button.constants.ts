type ButtonSizes = 'small' | 'medium' | 'large';

type ButtonTypes = 'button' | 'submit' | 'reset';

export type ButtonProps = {
  text?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  outlined?: boolean;
  size?: ButtonSizes;
  type?: ButtonTypes;
};
