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
import { ReactComponent as InterviewsIcon } from '../../assets/images/svg/interview.svg';
import { ReactComponent as JobPositionsIcon } from '../../assets/images/svg/job-position.svg';

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
            <NavLink
              to="/candidates"
              className={styles.navLinkBox}
              activeClassName={styles.active}
              aria-label="Candidates"
            >
              <div className={styles.iconWrapper}>
                <InterviewsIcon />
              </div>
            </NavLink>
            <NavLink
              to="/job-positions"
              className={styles.navLinkBox}
              activeClassName={styles.active}
              aria-label="Job Positions"
            >
              <div className={styles.iconWrapper}>
                <JobPositionsIcon />
              </div>
            </NavLink>
            <NavLink
              to="/employees"
              className={styles.navLinkBox}
              activeClassName={styles.active}
              aria-label="Employees"
            >
              <div className={styles.iconWrapper}>
                <ListIcon />
              </div>
            </NavLink>
            <NavLink
              to="/interviews/list"
              className={styles.navLinkBox}
              activeClassName={styles.active}
              aria-label="Employees"
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
                <NavLink
                  to="/settings/job-titles"
                  className={styles.linkOption}
                  exact
                  activeClassName={styles.active}
                  aria-label="Job Titles"
                >
                  <div className={styles.link}>Job Titles</div>
                </NavLink>
                <NavLink
                  to="/settings/subjects"
                  className={styles.linkOption}
                  exact
                  activeClassName={styles.active}
                  aria-label="Subjects"
                >
                  <div className={styles.link}>Subjects</div>
                </NavLink>
                <NavLink
                  to="/settings/topics"
                  className={styles.linkOption}
                  exact
                  activeClassName={styles.active}
                  aria-label="Topics"
                >
                  <div className={styles.link}>Topics</div>
                </NavLink>
                <NavLink
                  to="/settings/questions"
                  className={styles.linkOption}
                  exact
                  activeClassName={styles.active}
                  aria-label="Questions"
                >
                  <div className={styles.link}>Questions</div>
                </NavLink>
                <NavLink
                  to="/settings/tags"
                  className={styles.linkOption}
                  exact
                  activeClassName={styles.active}
                  aria-label="Tags"
                >
                  <div className={styles.link}>Tags</div>
                </NavLink>
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
