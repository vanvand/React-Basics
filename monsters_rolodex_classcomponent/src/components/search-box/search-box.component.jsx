import { Component } from 'react';
// css files are applicable for entire app > isolating possible with frameworks 
import "./search-box.styles.css"

class SearchBox extends Component {
    render() {
        return (
            <input
            // use props for all NON-STATIC values (dynamic values)
                className={`search-box ${this.props.className}`} 
                type="search" // will add x to clear the search box
                placeholder={this.props.placeholder}
                onChange={this.props.onChangeHandler}
            />
        );
    }
}

export default SearchBox;