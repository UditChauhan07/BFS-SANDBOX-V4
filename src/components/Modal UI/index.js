import React, { useEffect, useRef, useState } from "react";
import Styles from "./Styles.module.css";
const Modal = ({ isOpen, onClose, children, title = false,styles=null,loading = false }) => {
  const handleOverlayClick = (e) => {
    if (loading) {
      e.stopPropagation(); // Prevent closing if loading
    } else {
      onClose(); // Allow closing if not loading
    }
  };
  return (
    <>
      {isOpen && (
        <div className={Styles.modalOverlay} style={{...styles}} onClick={handleOverlayClick}>
          <div
            className={`${Styles.modal} `}
            onClick={(e) => {
              // do not close modal if anything inside modal content is clicked
              e.stopPropagation();
            }}
          >
            {title && <div className={Styles.modalTitle}>{title}</div>}
            <div className={Styles.ModalContent}>{children}</div>
          </div>
        </div>
      )}
    </>
  );
};
const ModalPage = ({ open, content,Link, onClose, title = false,styles=null }) => {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
    // if(isOpen){
    //   document.body.style.overflow = "hidden";
    // }else{
    //   document.body.style.overflow = "auto";
    // }
  }, [open]);

  const onModalClose = () => {
    // document.body.style.overflow = "auto";
    onClose?.();
    setIsOpen(false);
  };

  return isOpen ? (
    <Modal isOpen={isOpen} onClose={onModalClose} title={title} styles={styles}>
      <div className={Styles.ModalControl}>
        {content}
        {Link}
      </div>
      
    </Modal>
  ) : null;
};

export default ModalPage;
