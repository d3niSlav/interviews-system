import React, { FunctionComponent } from 'react';

import { LabelProps } from './Label.constants';

import styles from './Label.module.scss';

const Label: FunctionComponent<LabelProps> = ({
  editable = false,
  showErrors = true,
  error,
  fullWidth = false,
  groupedElement = false,
  required = false,
  size,
  title,
  children,
}) => {
  const labelClasses = [styles.label];
  const LabelWrappingElement = groupedElement ? 'div' : 'label';
  let element = children;

  if (fullWidth) {
    labelClasses.push(styles.fullWidth);
  }

  if (size === 'large') {
    labelClasses.push(styles.large);
  }

  if (typeof children === 'string' || !editable) {
    element = <p className={styles.text}>{children}</p>;
  }

  return (
    <LabelWrappingElement className={labelClasses.join(' ')}>
      {title && (
        <p className={styles.title}>
          {title}
          {required && <span className={styles.requiredIndicator}>&nbsp;*</span>}
        </p>
      )}
      {element}
      {showErrors && <p className={styles.errorMessage}>{error}</p>}
    </LabelWrappingElement>
  );
};

export default Label;
