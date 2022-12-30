import { useEffect } from 'react';
import { createPortal } from 'react-dom';

const modalRootRef = document.getElementById('modal-root');

const Modal = ({ toggleModal, url, alt }) => {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        toggleModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [toggleModal]);

  const handleClick = e => {
    if (e.target === e.currentTarget) {
      toggleModal();
    }
  };

  return createPortal(
    <div className="Overlay" onClick={handleClick}>
      <div className="Modal">
        <img src={url} alt={alt} />
      </div>
    </div>,
    modalRootRef
  );
};

export default Modal;
