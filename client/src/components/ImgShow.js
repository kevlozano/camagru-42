import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Like from './Like'
import Typography from '@material-ui/core/Typography'; 
import Comment from './Comment';
import axios from 'axios';
import CommentIt from './CommentIt';
import Button from '@material-ui/core/Button';
// api call need to be added

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    margin: "1%",
  },
});

class ImgShow extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgId: "",
      likes: 0,
      userId: "",
      username: "",
      imgData: "",
      button: true,
      delete: false,
    };
  }

  componentDidMount() {
    console.log(this.props);
    axios.get('http://localhost:4000/posts/' + this.props.imgId)
    .then((response) => {
        this.setState({
          imgData: response.data.media,
          userId: response.data.userId,
          likes: response.data.likes,
          imgId: response.data._id,
        });
        this.getUsername();
        this.checkDelete();
    })
    .catch(function(err){
      console.log(err);
    });
  }

  getUsername() {
    console.log(this.state.userId);
    let username = this.state.userId;
    axios.get('http://localhost:4000/users/' + username)
    .then((response) => {
      this.setState({
        username: response.data.username
      })
    })
    .catch(function(err){
      console.log(err);
    });
  }

  handleClickMore = () => {
    this.setState((prevState) => ({
      button: !prevState.button
    }));
  }
  
  checkDelete = () => {
    console.log(this.state.userId);
    var cookieUser = document.cookie.match(/^(.*;)?\s*userId\s*=\s*[^;]+(.*)?$/);
    if (cookieUser) {
        let currentUserId = cookieUser[0].split('=')[1];
        console.log(currentUserId);
        if (currentUserId === this.state.userId) {
          this.setState({
            delete: true
          });
        }
    }
  }

  deleteImage = () => {
    console.log("AAAA: " +this.state.imgId);
    axios.delete('http://localhost:4000/posts/delete/' + this.state.imgId)
    .then((response) => {
      console.log(response + "deleted!");
    })
    .catch((err) => {
      console.log(err + "failed");
    })
  }
  render() {
    const { classes } = this.props;
    return (
    <div className="ImgShow">
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}><img alt="very funny" src={this.state.imgData}></img>
            <Typography color="primary" variant="h5" component="h3">
                    {this.state.username} <Like userId={this.props.userId} imgId={this.props.imgId} isLoggedIn={this.props.isLoggedIn} />
                </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
                <Typography color="primary" variant="h5" component="h3">
                    comments
                </Typography>
                <Comment imgId={this.props.imgId} number="0"/>
                <Comment imgId={this.props.imgId} number="1"/>
                { this.state.button ? "" : <Comment imgId={this.props.imgId} number="2"/>}
                { this.state.button ? "" : <Comment imgId={this.props.imgId} number="3"/>}
                { this.state.button ? "" : <Comment imgId={this.props.imgId} number="4"/>}
                { this.state.button ? "" : <Comment imgId={this.props.imgId} number="5"/>}
                <Button onClick={this.handleClickMore} className={classes.button} color="secondary">{this.state.button ? "More" : "Less"}</Button>
                <CommentIt imgId={this.props.imgId} userId={this.state.userId}/>
            </Paper>
            { this.state.delete ? <Button onClick={this.deleteImage}>Delete Image</Button> : ""}
            <a class="resp-sharing-button__link" href="https://facebook.com/sharer/sharer.php?u=github.com/kevlozano" target="_blank" rel="noopener" aria-label="Share on Facebook">
              <div className="resp-sharing-button resp-sharing-button--facebook resp-sharing-button--large"><div aria-hidden="true" className="resp-sharing-button__icon resp-sharing-button__icon--solid">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.77 7.46H14.5v-1.9c0-.9.6-1.1 1-1.1h3V.5h-4.33C10.24.5 9.5 3.44 9.5 5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4z"/></svg>
                </div>Share on Facebook</div>
            </a>
            <a class="resp-sharing-button__link" href="https://twitter.com/intent/tweet/?text=Camagru%20Share" target="_blank" rel="noopener" aria-label="Share on Twitter">
              <div class="resp-sharing-button resp-sharing-button--twitter resp-sharing-button--large"><div aria-hidden="true" class="resp-sharing-button__icon resp-sharing-button__icon--circle">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M18.5 7.4l-2 .2c-.4-.5-1-.8-2-.8C13.3 6.8 12 8 12 9.4v.6c-2 0-4-1-5.4-2.7-.2.4-.3.8-.3 1.3 0 1 .4 1.7 1.2 2.2-.5 0-1 0-1.2-.3 0 1.3 1 2.3 2 2.6-.3.4-.7.4-1 0 .2 1.4 1.2 2 2.3 2-1 1-2.5 1.4-4 1 1.3 1 2.7 1.4 4.2 1.4 4.8 0 7.5-4 7.5-7.5v-.4c.5-.4.8-1.5 1.2-2z"/><circle cx="12" cy="12" r="11.5"/></svg>
                </div>Share on Twitter</div>
            </a>
          </Grid>
        </Grid>
      </div>
    </div>
  );
  }
}

ImgShow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgShow);