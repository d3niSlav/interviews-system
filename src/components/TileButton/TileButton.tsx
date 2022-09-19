import React, { FunctionComponent } from 'react';

import styles from './TileButton.module.scss';
import { BACKGROUND_CONTRAST_COLOR } from '../../shared/constants';

interface TileButtonProps {
  color?: string;
  image?: string;
  title?: string;
}

const TileButton: FunctionComponent<TileButtonProps> = ({ color = BACKGROUND_CONTRAST_COLOR, image, title }) => {
  return (
    <button className={styles.tile} style={{ backgroundColor: color }} title={title}>
      {image && <img className={styles.image} src={image} alt={title} />}
    </button>
  );
};

export default TileButton;
