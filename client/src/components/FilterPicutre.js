import React from 'react';

class FilterPicture extends React.Component {
      
      handleClick = () => {
        var fsrc = this.props.src;
        this.props.handleClick(fsrc);
      }

    render() {
        return (
        <img className="filter" id={this.props.id} src={this.props.src} onClick={this.handleClick}>
        </img>
        
        );
    }
  }

export default FilterPicture;