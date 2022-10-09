import React from "react";
import { Searchbar } from "./imageFinder/Searchbar";
import { ImageGallery } from "./imageFinder/ImageGallery";
import "./imageFinder/imageFinder-style.css"
export class App extends React.Component {
  state = {
    inputValue: '',
  };
  onFormSubmit = inputValue => {
    this.setState({inputValue })
  };
 
  render() {
    const { inputValue } = this.state;
    return(
      <div>
        <Searchbar
          onSubmit={this.onFormSubmit}
        />

        <ImageGallery
          inputValue={inputValue}
        />
      </div>
    );
  };
};
