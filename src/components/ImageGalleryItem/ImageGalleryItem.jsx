import { useState } from 'react';
import Modal from 'components/Modal/Modal';

const ImageGalleryItem = ({ imageData }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => setShowModal(prev => !prev);

  const { webformatURL, tags, largeImageURL } = imageData;

  return (
    <li className="ImageGalleryItem">
      <img
        onClick={toggleModal}
        className="ImageGalleryItem-image"
        src={webformatURL}
        alt={tags}
      />
      {showModal && (
        <Modal url={largeImageURL} alt={tags} toggleModal={toggleModal} />
      )}
    </li>
  );
};

export default ImageGalleryItem;
