import React, { FunctionComponent } from 'react';

import styles from './HamburgerButton.module.scss';

interface HamburgerButtonProps {
  isOpen?: boolean;
  onNavigationToggle: () => void;
  type?: 'arrow' | 'cross';
}

const LINES_DIMENSIONS = {
  cross: ['M0 40h62c13 0 6 28-4 18L35 35', 'M0 50h70', 'M0 60h62c13 0 6-28-4-18L35 65'],
  arrow: ['M0 40h62c18 0 18-20-17 5L31 55', 'M0 50h80', 'M0 60h62c18 0 18 20-17-5L31 45'],
};

const HamburgerButton: FunctionComponent<HamburgerButtonProps> = ({
  isOpen = false,
  onNavigationToggle,
  type = 'arrow',
}) => {
  const buttonClasses = [styles.hamburgerMenu, styles[type]];

  if (isOpen) {
    buttonClasses.push(styles.active);
  }

  return (
    <button className={buttonClasses.join(' ')} onClick={onNavigationToggle}>
      <svg viewBox="12 12 75 75" xmlns="http://www.w3.org/2000/svg">
        <path className={`${styles.line} ${styles.lineOne}`} d={LINES_DIMENSIONS[type][0]} />
        <path className={`${styles.line} ${styles.lineTwo}`} d={LINES_DIMENSIONS[type][1]} />
        <path className={`${styles.line} ${styles.lineThree}`} d={LINES_DIMENSIONS[type][2]} />
      </svg>
    </button>
  );
};

export default HamburgerButton;
