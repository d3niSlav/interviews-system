import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import { ReactComponent as DashboardIcon } from '../../assets/images/svg/dashboard.svg';
import { ReactComponent as LogoutIcon } from '../../assets/images/svg/logout.svg';
import { ReactComponent as SettingsIcon } from '../../assets/images/svg/settings.svg';

import styles from './Navigation.module.scss';

const Navigation: FunctionComponent = () => (
  <nav className={styles.navigation}>
    <ul className={styles.mainNavigation}>
      <li>
        <NavLink to="/" className={styles.navLinkBox} activeClassName={styles.active}>
          <div className={styles.iconWrapper}>
            <DashboardIcon />
          </div>
        </NavLink>
      </li>
    </ul>
    <ul className={styles.bottomNavigation}>
      <li>
        <a href="/" className={styles.navLinkBox}>
          <div className={styles.iconWrapper}>
            <SettingsIcon />
          </div>
          <div className={styles.navLinkOptions}>
            <div className={styles.linkOption}>
              <div className={styles.link}>Settings</div>
            </div>
            <div className={styles.linkOption}>
              <div className={styles.link}>Profile</div>
            </div>
          </div>
        </a>
      </li>
      <li>
        <a href="/" className={styles.navLinkBox}>
          <div className={styles.iconWrapper}>
            <LogoutIcon />
          </div>
        </a>
      </li>
    </ul>
  </nav>
);

export default Navigation;
