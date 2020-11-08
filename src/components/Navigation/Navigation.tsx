import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.scss';

const Navigation: FunctionComponent = () => (
  <nav className={styles.navigation}>
    <ul className={styles.mainNavigation}>
      <li>
        <NavLink to="/" className={styles.navLinkBox} activeClassName={styles.active}>
          <div className={styles.iconWrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g fill="none" fillRule="evenodd" stroke="#C1C5D0" strokeLinecap="round" strokeLinejoin="round">
                <path
                  d="M5.143 8H.857C.384 8 0 7.602 0 7.111V.89C0 .399.384 0 .857 0h4.286C5.616 0 6 .398 6 .889V7.11c0 .49-.384.889-.857.889zM5.143 14H.857C.384 14 0 13.642 0 13.2v-2.4c0-.442.384-.8.857-.8h4.286c.473 0 .857.358.857.8v2.4c0 .442-.384.8-.857.8zM13.143 5H8.857C8.384 5 8 4.627 8 4.167V.833C8 .373 8.384 0 8.857 0h4.286c.473 0 .857.373.857.833v3.334c0 .46-.384.833-.857.833zM13.143 14H8.857C8.384 14 8 13.608 8 13.125v-5.25C8 7.392 8.384 7 8.857 7h4.286c.473 0 .857.392.857.875v5.25c0 .483-.384.875-.857.875z"
                  transform="translate(5 5)"
                />
              </g>
            </svg>
          </div>
        </NavLink>
      </li>
    </ul>
    <ul className={styles.bottomNavigation}>
      <li>
        <a href="/" className={styles.navLinkBox}>
          <div className={styles.iconWrapper}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g
                fill="none"
                fillRule="evenodd"
                stroke="#1D60FF"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="translate(5 4)"
              >
                <circle cx="7" cy="8" r="2" />
                <path d="M12.333 8c-.005-.45-.07-.899-.189-1.333L13.851 5.2l-1-1.733-2.106.741c-.65-.636-1.452-1.096-2.33-1.333L8 .667H6L5.585 2.88c-.878.238-1.68.697-2.33 1.333l-2.106-.746-1 1.733 1.707 1.467c-.12.434-.184.882-.19 1.333.006.45.07.899.19 1.333L.149 10.8l1 1.733 2.106-.74c.65.637 1.452 1.096 2.33 1.334L6 15.333h2l.415-2.213c.878-.238 1.68-.697 2.33-1.333l2.106.74 1-1.734-1.707-1.46c.12-.434.184-.882.19-1.333z" />
              </g>
            </svg>
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
    </ul>
  </nav>
);

export default Navigation;
