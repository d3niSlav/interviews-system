import React, { FunctionComponent, useEffect, useState } from 'react';

import { ReactComponent as Icon } from '../../../assets/images/svg/radio-button-icon.svg';

import styles from './RadioButtonIcon.module.scss';

type RadioButtonIconProps = {
  isSelected: boolean;
};

const RadioButtonIcon: FunctionComponent<RadioButtonIconProps> = ({ isSelected }) => {
  const [selected, setSelected] = useState(false);
  const radioButtonIconClasses = [styles.icon];

  useEffect(() => {
    setSelected(isSelected);
  }, [isSelected]);

  if (selected) {
    radioButtonIconClasses.push(styles.selected);
  }

  return (
    <span className={radioButtonIconClasses.join(' ')}>
      <Icon />
    </span>
  );
};

export default RadioButtonIcon;
