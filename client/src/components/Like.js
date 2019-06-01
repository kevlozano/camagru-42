import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import ThumbUp from '@material-ui/icons/ThumbUp';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';


const styles = theme => ({
    button: {
        margin: theme.spacing(1),
      },
      input: {
        display: 'none',
    },
});

class Like extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            liked: false,
            noLikes: 0,
            likedByUser: false,
            userId: ""
        }
    }

    componentDidMount = () => {
        var cookieUser = document.cookie.match(/^(.*;)?\s*userId\s*=\s*[^;]+(.*)?$/);
        if (cookieUser) {
            cookieUser = cookieUser[0].split('=')[1];
          }
        console.log(cookieUser);
        axios.get('http://localhost:4000/posts/' + this.props.imgId)
        .then((response) => {
            let noLikes = response.data.likes.length;
            let likes = response.data.likes;
            let likedByUser = (likes.indexOf(cookieUser));
            console.log("likedbyUser: " + likedByUser);
            console.log(likes);
            console.log("userId: " + cookieUser);
            if (likedByUser >= 0) {
                this.setState({
                    noLikes: noLikes,
                    likedByUser: true,
                    liked: true,
                    userId: cookieUser
                });
            }
            else {
                this.setState({
                    noLikes: noLikes,
                    userId: cookieUser
                });
            }
        })
        .catch((err) => {
            console.log(err);
        })
    }
    handleClick = () => {
        if (this.props.isLoggedIn) {
            if (this.state.likedByUser) {
            }
            else {
                axios.get('http://localhost:4000/users/' + this.state.userId)
                .then((response) => {
                    this.setState(() => ({
                        imgEmail: response.data.email
                    }));
                    console.log("got email: " + response.data.email);
                    this.sendEmail(response.data.email);
                })
                .catch((err) => {
                    console.log(err);
                });
                axios.post('http://localhost:4000/posts/update/' + this.props.imgId + '/' + this.state.userId)
                .then((response) => {
                    console.log(response);
                    this.setState(prevState => ({
                        liked: true,
                        noLikes: prevState.noLikes+1
                    }));
                })
                .catch((err) => {
                    console.log(err);
                    alert("sorry there was an error: refresh and try again");
                });
            }
        }    
        else
            alert("Log in to like this picture!");
    }

    sendEmail = (email) => {
        console.log(email);
        axios.post('http://localhost:4000/posts/email', {
            email: email,
            subject: 'someone liked your picture!',
            text: "Go to your profile to see. Or would you rather die?"
        });
    }

    render() {
        return (
            <div className={this.state.liked ? "liked" : "notLiked"} onClick={this.handleClick}>
                {this.state.noLikes} <ThumbUp />
            </div>   
        );
    }
  }

export default Like;