import React, { FunctionComponent, useEffect, useRef, useState } from 'react';

import { MODAL_ANIMATION_DURATION } from './Modal.constants';

import styles from './Modal.module.scss';

type ModalProps = {
  compact?: boolean;
  fullScreen?: boolean;
  fullWidth?: boolean;
  hideClose?: boolean;
  id?: string;
  isOpen?: boolean;
  onClose?: () => void;
  shaded?: boolean;
  title?: string;
};

const Modal: FunctionComponent<ModalProps> = ({
  children,
  hideClose = false,
  id,
  isOpen = false,
  onClose,
  shaded = false,
  title,
}) => {
  const modalElement = useRef() as React.MutableRefObject<HTMLInputElement>;
  const initialModalClasses = [styles.modal];
  const initialModalBackdropClasses = [styles.modalBackdrop];
  const modalCloseButtonClasses = [styles.modalCloseButton];
  const headingClasses = [styles.modalHeader];

  const [modalHeight, setModalHeight] = useState(0);
  const [modalClasses, setModalClasses] = useState([...initialModalClasses]);
  const [modalContentClasses, setModalContentClasses] = useState([styles.modalContent, styles.overflowAuto]);
  const [modalBackdropClasses, setModalBackdropClasses] = useState([...initialModalBackdropClasses]);

  if (shaded) {
    headingClasses.push(styles.modalHeaderShade);
  }

  const handleModalClose = (event?: React.MouseEvent<HTMLButtonElement | HTMLDivElement>): void => {
    if (event) {
      event.preventDefault();
    }

    setModalClasses([...initialModalClasses]);
    setModalBackdropClasses([...initialModalBackdropClasses]);

    setTimeout(() => {
      if (onClose) {
        onClose();
      }
    }, MODAL_ANIMATION_DURATION);
  };

  const handleEscPress = (event: React.KeyboardEvent<HTMLDivElement>): void => {
    if (event.key === 'Esc' || event.key === 'Escape') {
      handleModalClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setModalClasses([...initialModalClasses, styles.show]);
      setModalBackdropClasses([...initialModalBackdropClasses, styles.show]);
      modalElement.current?.focus();
    } else {
      document.body.style.overflow = 'auto';
      handleModalClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  const refCallback = (element: HTMLDivElement | null): void => {
    setTimeout(() => {
      if (element && element.clientHeight !== modalHeight) {
        setModalHeight(element.clientHeight);

        const bodyHeight = document.body.clientHeight;
        if (element && (element.clientHeight * 100) / bodyHeight > 80) {
          setModalContentClasses([styles.modalContent, styles.overflowAuto]);
        } else {
          setModalContentClasses([styles.modalContent]);
        }
      }
    }, 0);
  };

  return (
    <>
      <div
        className={modalBackdropClasses.join(' ')}
        role="button"
        tabIndex={0}
        onKeyDown={handleEscPress}
        onClick={handleModalClose}
        aria-label="close-modal"
      />
      <div id={id} className={modalClasses.join(' ')} role="dialog" ref={refCallback}>
        <header className={headingClasses.join(' ')}>
          {!hideClose && (
            <button
              className={modalCloseButtonClasses.join(' ')}
              aria-label="Close"
              title="Close"
              tabIndex={0}
              onClick={handleModalClose}
            />
          )}
          {title && (
            <span role="heading" className={styles.modalTitle} aria-level={1}>
              {title}
            </span>
          )}
        </header>
        <section className={modalContentClasses.join(' ')}>{children}</section>
      </div>
    </>
  );
};

export default Modal;
