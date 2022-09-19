import React, { FunctionComponent, useState } from 'react';

import { CheckboxesField } from '../../../../../components/FormFields/Fields/CheckboxesField';
import RowActions from './RowActions';

import styles from './CandidateRow.module.scss';

import { ReactComponent as InstagramIcon } from '../../../../../assets/images/svg/instagram-logo.svg';
import { ReactComponent as FacebookIcon } from '../../../../../assets/images/svg/facebook-logo.svg';
import { ReactComponent as LinkedInIcon } from '../../../../../assets/images/svg/linkedin-logo.svg';
import { ReactComponent as TwitterIcon } from '../../../../../assets/images/svg/twitter-logo.svg';
import { ReactComponent as WhatsAppIcon } from '../../../../../assets/images/svg/whatsapp-logo.svg';
import { ReactComponent as EmailIcon } from '../../../../../assets/images/svg/email-icon.svg';
import { ReactComponent as PhoneIcon } from '../../../../../assets/images/svg/phone-icon.svg';
import { ReactComponent as MenuIcon } from '../../../../../assets/images/svg/menu-icon.svg';
import Grid from '../../../../../components/Grid';
import Label from '../../../../../components/Label';
import { TagDTO } from '../../../../Tags/tags.dto';

const CandidateRow: FunctionComponent<any> = ({
  id,
  firstName,
  middleName,
  lastName,
  email,
  phoneNumber,
  introduction,
  status,
  handleOnDelete,
  experience = [],
  positions = [],
}) => {
  const [expanded, setExpanded] = useState(false);
  const name = `${firstName}${middleName ? ` ${middleName}` : ''} ${lastName}`;

  const rowClasses = [styles.tableRow];

  if (expanded) {
    rowClasses.push(styles.expanded);
  }

  const toggleExpand = () => setExpanded(!expanded);

  return (
    <div className={rowClasses.join(' ')} role="row" tabIndex={0} onKeyPress={toggleExpand}>
      <div className={styles.rowContent}>
        <div
          className={styles.basicInformation}
          role="button"
          tabIndex={0}
          onClick={toggleExpand}
          onKeyPress={toggleExpand}
        >
          <div className={styles.rowSelect}>
            <CheckboxesField simple name="employed" fullWidth={false} />
          </div>
          <div className={styles.mainColumn}>
            <div className={styles.avatarWrapper}>
              <div className={styles.avatar}>{name ? name.charAt(0).toUpperCase() : '-'}</div>
            </div>
            <div className={styles.title}>{name || 'N/A'}</div>
          </div>
        </div>
        <div className={styles.rowDetails}>
          <div className={styles.rowDetailsContent}>
            <div className={[styles.contactInfoBox, styles.contacts].join(' ')}>
              <a href={`mailto:${email}`}>
                <EmailIcon
                  style={{
                    width: '16px',
                    height: '16px',
                  }}
                />
              </a>
              <a href={`tel:${phoneNumber}`}>
                <PhoneIcon
                  style={{
                    width: '16px',
                    height: '12px',
                  }}
                />
              </a>
              <MenuIcon
                style={{
                  width: '16px',
                  height: '16px',
                }}
              />
            </div>
            <div className={styles.jobTitle}>{positions[0]?.title || 'N/A'}</div>
            <div className={styles.seniority}>
              <div className={styles.status}>{experience[0]?.seniorityLevel || 'N/A'}</div>
            </div>
            <div className={`${styles.contactInfoBox} ${styles.socialMediaBox}`}>
              <span className={styles.socialMediaLink}>
                <LinkedInIcon
                  style={{
                    width: '18px',
                    height: '16px',
                  }}
                />
              </span>
              <span className={styles.socialMediaLink}>
                <FacebookIcon
                  style={{
                    width: '16px',
                    height: '18px',
                  }}
                />
              </span>
              <span className={styles.socialMediaLink}>
                <InstagramIcon
                  style={{
                    width: '20px',
                    height: '18px',
                    marginTop: '2px',
                  }}
                />
              </span>
              <span className={styles.socialMediaLink}>
                <TwitterIcon
                  style={{
                    width: '18px',
                    height: '18px',
                  }}
                />
              </span>
              <span className={styles.socialMediaLink}>
                <WhatsAppIcon
                  style={{
                    width: '18px',
                    height: '16px',
                  }}
                />
              </span>
            </div>
            <div className={styles.statusBox}>
              <span className={styles.statusLabel}>Status:</span>
              <div className={styles.status}>{status || 'N/A'}</div>
            </div>
            <div className={styles.actions}>
              <RowActions id={id} onDelete={() => handleOnDelete(id)} />
            </div>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.workPosition}>{experience?.length ? experience[0].jobTitle : '-'}</div>
          <div className={styles.positionWrapper}>
            <span className={styles.position}>{positions?.length ? positions[0].title : '-'}</span>
            <br />
            <span className={styles.positionTitle}>{experience?.length ? experience[0].jobTitle : '-'}</span>
          </div>
          <br />
          <br />
          <Grid container>
            <Grid item sm={12} md={1} />
            <Grid item sm={6} md={3}>
              <Label title="Direct Dial" editable={false}>
                <a href={`tel:${phoneNumber}`}>Request Direct Dial</a>
              </Label>
              <br />
              <Label title="Contacts" editable={false}>
                -
              </Label>
            </Grid>
            <Grid item sm={6} md={3}>
              <Label title="Email" editable={false}>
                <a href={`mailto:${email}`}>{email}</a>
              </Label>
              <br />
              <Label title="Interview" editable={false}>
                Nothing schedules
              </Label>
            </Grid>
            <Grid item sm={6} md={5}>
              <Label title="Tags" editable={false}>
                {experience?.length
                  ? experience[0]?.skills.map(
                      (skill: TagDTO, index: number) =>
                        `${skill.title}${index >= 0 && index < experience[0]?.skills.length - 1 ? ' | ' : ''}`,
                    )
                  : '-'}
              </Label>
              <br />
              <Label title="Introduction" editable={false}>
                {introduction || '-'}
              </Label>
            </Grid>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default CandidateRow;
