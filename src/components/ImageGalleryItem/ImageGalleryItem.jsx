import { Component } from 'react';
import Modal from 'components/Modal/Modal';

export default class ImageGalleryItem extends Component {
  state = { showModal: false };

  toggleModal = () => this.setState(prev => ({ showModal: !prev.showModal }));

  render() {
    const {
      imageData: { webformatURL, tags, largeImageURL },
    } = this.props;
    const { showModal } = this.state;
    return (
      <li className="ImageGalleryItem">
        <img
          onClick={this.toggleModal}
          className="ImageGalleryItem-image"
          src={webformatURL}
          alt={tags}
        />
        {showModal && (
          <Modal
            url={largeImageURL}
            alt={tags}
            toggleModal={this.toggleModal}
          />
        )}
      </li>
    );
  }
}
