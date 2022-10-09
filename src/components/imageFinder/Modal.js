import React from "react";

export class Modal extends React.Component {
    state = {
        image: ""
    };

    componentDidMount() {
        document.addEventListener('keydown', this.closeModal);
    };

    componentWillUnmount() {
        document.removeEventListener('keydown', this.closeModal);
    };

  closeModal = event => {
        if (event.code === 'Escape' || event.target === event.currentTarget) {
        this.props.onClick();
      };
    };
    
    render() {
        const { largeImageURL, imgTitle } = this.props.content;
        return (
            <div className="modal" onClick={this.props.onClick}>
                <img src={largeImageURL} alt={imgTitle} className="img" />
            </div>
        );
        };
};
