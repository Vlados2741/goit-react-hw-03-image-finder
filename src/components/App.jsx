import React from "react";
import { Searchbar } from "./imageFinder/Searchbar";
import { ImageGallery } from "./imageFinder/ImageGallery";
import "./imageFinder/imageFinder-style.css"
export class App extends React.Component {
  state = {
    inputValue: '',
    images:''
  };
  onFormSubmit = inputValue => {
    this.setState({inputValue })
  };
 
  render() {
    return(
      <div>
        <Searchbar
          onSubmit={this.onFormSubmit}
        />

        <ImageGallery
          inputValue={this.state.inputValue}
        />
      </div>
    );
  };
};
