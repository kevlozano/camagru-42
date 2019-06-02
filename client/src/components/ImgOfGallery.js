import React from 'react';
import {Link} from 'react-router-dom';

class ImgOfGallery extends React.Component {
//parent component go to
    handleClickHere = () => {
        this.props.handleClick(this.props.imgId);
    }

    render() {
        return (
        <Link to='/show/'>
            <img alt="created by user" imgid={this.props.imgId} src={this.props.src} onClick={this.handleClickHere}></img>
        </Link>
        
        );
    }
  }

export default ImgOfGallery;