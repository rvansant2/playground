import React, { Component } from 'react';

/**
 * Created by rvansant2 on 3/17/16.
 */

class SearchBar extends Component {
    constructor(props) {
        super(props);

        this.state = { term: '' };
    }

    render() {
       return (
           <div className="search-bar col-md-12">
               <input className="form-control" placeholder="Search YouTube" value={this.state.term} onChange={event => this.onInputChange(event.target.value)} />
           </div>
       );
    }

    onInputChange(term) {
        this.setState({term});
        this.props.onSearchTermChange(term);
    }
}

export default SearchBar;