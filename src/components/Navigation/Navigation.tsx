import React, { FunctionComponent } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { ReactComponent as DashboardIcon } from '../../assets/images/svg/dashboard.svg';
import { ReactComponent as LogoutIcon } from '../../assets/images/svg/logout.svg';
import { ReactComponent as SettingsIcon } from '../../assets/images/svg/settings.svg';
import { logOutUserAction } from '../../containers/Auth';

import styles from './Navigation.module.scss';

const Navigation: FunctionComponent = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOutUserAction());
  };

  return (
    <header className={styles.navigation}>
      <nav className={styles.navContent}>
        <ul className={styles.mainNavigation}>
          <li>
            <NavLink to="/" className={styles.navLinkBox} activeClassName={styles.active} aria-label="Home">
              <div className={styles.iconWrapper}>
                <DashboardIcon />
              </div>
            </NavLink>
          </li>
        </ul>
        <ul className={styles.bottomNavigation}>
          <li>
            <div className={styles.navLinkBox}>
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
            </div>
          </li>
          <li>
            <button className={styles.navLinkBox} onClick={handleLogOut} aria-label="Log out">
              <div className={styles.iconWrapper}>
                <LogoutIcon />
              </div>
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navigation;
