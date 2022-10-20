import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Loader } from './Loader';
import { ImageGalleryItem } from './ImageGalleryItem';
import { Modal } from './Modal';
import { Button } from './Button';

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
    const KEY = '29230090-341e91ba352ddd311dc4a279b';
    const value = this.props.inputValue;

    if (prevProps.inputValue !== this.props.inputValue) {
      this.setState({
        loading: true,
        images: '',
        urlLarge: '',
        page: 1,
      });

      this.fetchImages(KEY, value, page);
    }

    if (
      prevProps.inputValue === this.props.inputValue &&
      page > prevState.page
    ) {
      this.setState({
        loading: true,
      });

      this.fetchImages(KEY, value, page);
    }
  }

  async fetchImages(KEY, value, page) {
    try {
      const response = await axios.get(
        `https://pixabay.com/api/?key=${KEY}&q=${value}&page=${page}&image_type=photo&per_page=12`
      );

      if (response.data.total === 0) {
        alert('No results');
        this.setState({ loading: false });
      }

      this.setState(prevState => ({
        images: [...prevState.images, ...response.data.hits],
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
    const value = this.props.inputValue;
    return (
      <div>
        {!value && <h2>Please, enter your request</h2>}
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
