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
      button: true
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
        });
        this.getUsername();
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