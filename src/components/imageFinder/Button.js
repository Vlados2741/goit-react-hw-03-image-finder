import PropTypes from 'prop-types';

export const Button = ({ onClick }) => {
  return (
    <div className="loadmore">
      <button onClick={onClick} type="button" className="loadmoreButton">
        Load more
      </button>
    </div>
  );
};

Button.propTypes = {
  loadMore: PropTypes.func,
};
