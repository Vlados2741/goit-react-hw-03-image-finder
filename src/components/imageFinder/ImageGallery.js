import React from "react";
import axios from "axios";
import { Loader } from "./Loader";
import { ImageGalleryItem } from "./ImageGalleryItem";
import { Modal } from "./Modal";
import { Button } from "./Button";
export class ImageGallery extends React.Component {
    state = {
        images: '',
        loading: false,
        error: null,
        showModal: false,
        contentModal: {
            urlLarge: '',
        },
        page: 1,
  };
    async componentDidUpdate(prevProps, prevState) {
        
        if (prevProps.inputValue !== this.props.inputValue) {

            this.setState({
                loading: true,
                images: "",
                contentModal: '',
                page: 1
            });

            const KEY = '29230090-341e91ba352ddd311dc4a279b';
            const value = this.props.inputValue;

            try {
                const response = await axios.get(
                    `https://pixabay.com/api/?key=${KEY}&q=${value}&page=${this.state.page}&image_type=photo&per_page=12`
                );

                if (response.data.total === 0) {
                    alert("No results")
                    this.setState({ loading: false })
                };

                this.setState((prevState) =>
                ({
                    images: [...prevState.images, ...response.data.hits]
                }));
            }
            catch (error) {
                this.setState({error}) 
            }
            finally {
                this.setState({ loading: false });
            }
        };

        if (prevProps.inputValue === this.props.inputValue &&
            this.state.page > prevState.page) {
            
            const KEY = '29230090-341e91ba352ddd311dc4a279b';
            const value = this.props.inputValue

            this.setState({
                loading: true
            });

            try {
                const response = await axios.get(
                    `https://pixabay.com/api/?key=${KEY}&q=${value}&page=${this.state.page}&image_type=photo&per_page=12`
                );
                this.setState((prevState) =>
                ({
                    images: [...prevState.images, ...response.data.hits]
                }));
            }
            catch (error) {
                this.setState({error}) 
            }
            finally {
                this.setState({ loading: false });
            }
    };
    }
    openModal = contentModal => {
        this.setState({
            showModal: true,
            contentModal,
        });
    };

    closeModal = () => {
        this.setState({
            showModal: false,
            contentModal: {
                urlLarge: '',
            },
        });
    };

    loadMore = () => {
        this.setState((prevState) => ({
            page: prevState.page + 1
        }));
    };

    render() {
        return (
            <div>
                {this.props.inputValue === "" && <h2>Please, enter your request</h2>}
                {this.state.showModal &&
                    <Modal
                        content={this.state.contentModal}
                        onClick={this.closeModal} />
                }
                {this.state.images &&
                    <div>
                        <ul className="gallery">
                            {this.state.images.map(image =>
                                <ImageGalleryItem
                                    key={image.id}
                                    url={image.webformatURL}
                                    largeImageURL={image.largeImageURL}
                                    title={image.tags}
                                    onClick={this.openModal}
                                />
                                )}
                        </ul>
                    </div>
                }
                {this.state.loading && <Loader />}
                {this.state.images.length !== 0 && (
                    <Button
                        onClick={this.loadMore}
                    />
                )};
            </div>
        );
    };
};