import React from 'react';

class Filter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: false};
    }

    render() {
        return (
            <img className="filter-img" src={this.props.filterSrc}></img>
        );
    }
  }

export default Filter;