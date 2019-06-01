import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
});

class Comment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      comment: "",
      userId: ""
    }
  }

  componentDidMount = () => {
    axios.get('http://localhost:4000/comments/img/' + this.props.imgId)
    .then((response) => {
      console.log(response);
      this.setState({
        userId: response.data[this.props.number].userId,
        comment: response.data[this.props.number].text
      });
      this.getUsername();
    })
    .catch(function(err){
      console.log(err);
    });
  }

  getUsername() {
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
  

  render() {
    const { classes } = this.props;
    return (
      <div className="comment">
        <Paper className={classes.root} elevation={1}>
          <Typography color="primary" component="h3">
            {this.state.username}
          </Typography>
          <Typography component="p">
            {this.state.comment}
          </Typography>
        </Paper>
      </div>
    );
  }
  
}

Comment.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Comment);