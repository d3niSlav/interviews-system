import React, { FunctionComponent, useEffect, useState } from 'react';

import { InputSize } from '../../Input';
import { ReactComponent as Icon } from '../../../assets/images/svg/checkbox-icon.svg';

import styles from './CheckboxIcon.module.scss';

type CheckboxIconProps = {
  isChecked: boolean;
  size?: InputSize;
};

const CheckboxIcon: FunctionComponent<CheckboxIconProps> = ({ isChecked, size }) => {
  const [checked, setChecked] = useState(false);
  const checkboxIconClasses = [styles.icon];

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  if (checked) {
    checkboxIconClasses.push(styles.checked);
  }

  if (size === 'small') {
    checkboxIconClasses.push(styles.small);
  }

  return (
    <span className={checkboxIconClasses.join(' ')}>
      <Icon />
    </span>
  );
};

export default CheckboxIcon;
