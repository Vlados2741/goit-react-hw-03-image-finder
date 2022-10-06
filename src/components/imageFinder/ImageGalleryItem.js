import PropTypes from 'prop-types';

export const ImageGalleryItem = ({
    url,
    title,
    largeImageURL,
    onClick
}) => {
    return (
        <li 
            className="photo-card"
            onClick={() => {
                onClick({largeImageURL});
            }}
        >
            <img
                src={url}
                alt={title}
                width="220px"
                height="150px"
            />
        </li>
);
};

ImageGalleryItem.propTypes = {
  onClick: PropTypes.func,
  url: PropTypes.string,
  largeImageURL: PropTypes.string,
  title: PropTypes.string,
};