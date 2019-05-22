import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import filter1 from './resources/filter1.png'
import Typography from '@material-ui/core/Typography'; 
import Comment from './Comment';
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

function ImgShow(props) {
  const { classes } = props;

  return (
    <div className="ImgShow">
      <div className={classes.root}>
        <Grid container spacing={24}>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}><img src={filter1}></img></Paper>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper className={classes.paper}>
                <Typography color="primary" variant="h7" component="h3">
                    comments
                </Typography>
                <Comment />
                <Comment />
                <Comment />
                <Comment />
                <Comment />
            </Paper>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

ImgShow.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ImgShow);