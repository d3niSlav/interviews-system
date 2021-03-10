import React, { FunctionComponent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import HamburgerButton from './HamburgerButton';
import { logOutUserAction } from '../../containers/Auth';
import { ReactComponent as DashboardIcon } from '../../assets/images/svg/dashboard.svg';
import { ReactComponent as CategoriesIcon } from '../../assets/images/svg/project-management.svg';
import { ReactComponent as ListIcon } from '../../assets/images/svg/list.svg';
import { ReactComponent as LogoutIcon } from '../../assets/images/svg/logout.svg';
import { ReactComponent as SettingsIcon } from '../../assets/images/svg/settings.svg';

import styles from './Navigation.module.scss';

const Navigation: FunctionComponent = () => {
  const dispatch = useDispatch();
  const [isNavigationOpen, setIsNavigationOpen] = useState(true);
  const navigationClasses = [styles.navigation];

  if (!isNavigationOpen) {
    navigationClasses.push(styles.collapsed);
  }

  const handleLogOut = (): void => {
    dispatch(logOutUserAction());
  };

  const toggleNavigation = (): void => {
    setIsNavigationOpen(!isNavigationOpen);
  };

  return (
    <header className={navigationClasses.join(' ')}>
      <HamburgerButton isOpen={isNavigationOpen} onNavigationToggle={toggleNavigation} type="cross" />
      <nav className={styles.navContent}>
        <ul className={styles.mainNavigation}>
          <li>
            <NavLink to="/" className={styles.navLinkBox} exact activeClassName={styles.active} aria-label="Home">
              <div className={styles.iconWrapper}>
                <DashboardIcon />
              </div>
            </NavLink>
            <NavLink to="/table-list" className={styles.navLinkBox} activeClassName={styles.active} aria-label="Home">
              <div className={styles.iconWrapper}>
                <ListIcon />
              </div>
            </NavLink>
            <NavLink
              to="/questions/categories"
              className={styles.navLinkBox}
              activeClassName={styles.active}
              aria-label="Categories"
            >
              <div className={styles.iconWrapper}>
                <CategoriesIcon />
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
