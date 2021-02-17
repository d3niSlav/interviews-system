type ButtonSizes = 'small' | 'medium' | 'large';

type ButtonTypes = 'button' | 'submit' | 'reset';

export type ButtonProps = {
  className?: string;
  text?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  onClick?: () => void;
  outlined?: boolean;
  size?: ButtonSizes;
  type?: ButtonTypes;
};
