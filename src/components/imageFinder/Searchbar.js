import React from "react"
export class Searchbar extends React.Component {
    state = {
        inputValue: '',
    };
    
    handleInput = e => {
        this.setState({ inputValue: e.target.value.toLowerCase() });
    };

    handleSubmit = e => {
        e.preventDefault();
        if (this.state.inputValue.trim() === '') {
            alert('Please, enter a keyword to search!');
            return;
        }
        this.props.onSubmit(this.state.inputValue);
        this.setState({ inputValue: '' });
    };

    render () {
    return (
        <div className="form">
            <form
                className="search-form"
                id="search-form"
                onSubmit={this.handleSubmit}
            >
                <input
                    type="text"
                    name="searchQuery"
                    autoComplete="off"
                    value={this.state.inputValue}
                    placeholder="Search images..."
                    onChange={this.handleInput}
                />
                <button
                    type="submit"
                    className="search"
                >
                    S
                </button>
                    
                </form>
        </div>
    )
    }
}