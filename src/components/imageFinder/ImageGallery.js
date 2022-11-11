import React from 'react';
import PropTypes from 'prop-types';
import { Loader } from './Loader';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Modal } from './Modal';
import { Button } from './Button';
import { api } from 'services/api';

export class ImageGallery extends React.Component {
  state = {
    images: '',
    loading: false,
    error: null,
    showModal: false,
    urlLarge: '',
    page: 1,
  };

  async componentDidUpdate(prevProps, prevState) {
    const { page } = this.state;
    const { inputValue } = this.props;

    if (prevProps.inputValue !== this.props.inputValue) {
      this.setState({
        loading: true,
        images: '',
        urlLarge: '',
        page: 1,
      });

      this.fetchImages(inputValue, page);
    }

    if (
      prevProps.inputValue === this.props.inputValue &&
      page > prevState.page
    ) {
      this.setState({
        loading: true,
      });

      this.fetchImages(inputValue, page);
    }
  }

  async fetchImages(inputValue, page) {
    try {
      const response = await api(inputValue, page);

      if (response.total === 0) {
        alert('No results');
        this.setState({ loading: false });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...response.hits],
      }));
    } catch (error) {
      this.setState({ error });
    } finally {
      this.setState({ loading: false });
    }
  }

  openModal = content => {
    this.setState({
      showModal: true,
      urlLarge: content,
    });
  };

  closeModal = () => {
    this.setState({
      showModal: false,
      urlLarge: '',
    });
  };

  loadMore = () => {
    this.setState(prevState => ({
      page: prevState.page + 1,
    }));
  };

  render() {
    const { images, loading, showModal, urlLarge } = this.state;
    const { inputValue } = this.props;
    return (
      <div>
        {!inputValue && <h2>Please, enter your request</h2>}
        {showModal && <Modal content={urlLarge} onClick={this.closeModal} />}
        {images && (
          <div>
            <ul className="gallery">
              {images.map(({ id, webformatURL, largeImageURL, tags }) => (
                <ImageGalleryItem
                  key={id}
                  url={webformatURL}
                  largeImageURL={largeImageURL}
                  title={tags}
                  onClick={this.openModal}
                />
              ))}
            </ul>
          </div>
        )}
        {loading && <Loader />}
        {images.length !== 0 && <Button onClick={this.loadMore} />}
      </div>
    );
  }
}

ImageGallery.propTypes = {
  inputValue: PropTypes.string,
};
