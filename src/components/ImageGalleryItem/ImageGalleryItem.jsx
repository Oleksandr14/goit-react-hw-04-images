import PropTypes from 'prop-types';
import { useState } from 'react';

import { Modal } from 'components/Modal/Modal';

import { Img, Item } from './ImageGalleryItem.styled';

export const ImageGalleryItem = ({ webformatURL, largeImageURL }) => {
  const [showModal, setShowModal] = useState(false);

  const toggleModal = () => {
    setShowModal(p => !p);
  };

  return (
    <>
      <Item onClick={toggleModal}>
        <Img src={webformatURL} alt="pictures" />
      </Item>
      {showModal && (
        <Modal onClose={toggleModal} largeImageURL={largeImageURL} />
      )}
    </>
  );
};

ImageGalleryItem.propTypes = {
  webformatURL: PropTypes.string.isRequired,
  largeImageURL: PropTypes.string.isRequired,
};
