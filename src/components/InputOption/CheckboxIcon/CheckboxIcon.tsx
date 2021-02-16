import React, { FunctionComponent, useEffect, useState } from 'react';

import { ReactComponent as Icon } from '../../../assets/images/svg/checkbox-icon.svg';

import styles from './CheckboxIcon.module.scss';

type CheckboxIconProps = {
  isChecked: boolean;
};

const CheckboxIcon: FunctionComponent<CheckboxIconProps> = ({ isChecked }) => {
  const [checked, setChecked] = useState(false);
  const checkboxIconClasses = [styles.icon];

  useEffect(() => {
    setChecked(isChecked);
  }, [isChecked]);

  if (checked) {
    checkboxIconClasses.push(styles.checked);
  }

  return (
    <span className={checkboxIconClasses.join(' ')}>
      <Icon />
    </span>
  );
};

export default CheckboxIcon;
