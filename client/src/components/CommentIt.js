import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import axios from 'axios';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class CommentIt extends React.Component {
constructor(props) {
    super(props);
    this.state = {
        imgid: this.props.imgId,
        imgEmail: this.props.imgEmail
    }
}

handleSubmit = (e) => {
    e.preventDefault();
    console.log("userId: " + this.props.userId);
    console.log("imgId" + this.props.imgId);
    var cookieUser = document.cookie.match(/^(.*;)?\s*userId\s*=\s*[^;]+(.*)?$/);
    if (cookieUser)
        cookieUser = cookieUser[0].split('=')[1];
    var imgid = this.props.imgId;
    console.log(imgid);
    if (cookieUser) {
        axios.get('http://localhost:4000/users/' + this.props.userId)
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
        axios.post('http://localhost:4000/comments/add', {
            text: e.target.comment.value,
            userId: cookieUser,
            imgid: imgid
            })
            .then(function(response){
                console.log("comment uploaded: " + response);
                alert("Comment sent!");
            })
            .catch(function(err){
                console.log("LOSER: " + err);
            });
        console.log('email here: ' + this.state.imgEmail);
        }
    else
        alert('Login first!');
    }

sendEmail = (email) => {
    console.log(email);
    axios.post('http://localhost:4000/posts/email', {
        email: email,
        subject: 'someone commented on your picture!',
        text: "Go to your profile to see. Or would you rather die?"
    });
}

render() {
    const { classes } = this.props;
    return (
        <div className="comment">
            <Paper className={classes.root} elevation={1}>
            <form  onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
                <TextField
                id="comment"
                label="comment"
                className={classes.textField}
                placeholder="write something nice"
                margin="normal"
                />
                <Button type="submit" variant="contained" className={classes.button} color="secondary">Send</Button>
            </form>
            </Paper>
        </div>
    );
}
  
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CommentIt);