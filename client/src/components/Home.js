import React from 'react';
import Fab from '@material-ui/core/Fab';
import CameraAlt from '@material-ui/icons/CameraAlt';
import { withStyles } from '@material-ui/core/styles';
import Photo from '@material-ui/icons/Photo';
import AccountCircle from '@material-ui/icons/AccountCircle';
import { Link } from 'react-router-dom';

const styles = theme => ({
    fab: {
      margin: theme.spacing.unit,
      size: "1px",
    },
    extendedIcon: {
      marginRight: theme.spacing.unit,
    },
  });

function Home(props) {
    const { classes } = props;  
    return (
      <div className="home">
        <div className="homeText">Welcome</div>
        <div className="ButtonsHome">
            <Link to="/main"><Fab className={classes.fab} color="secondary"><CameraAlt /></Fab></Link>
            <Link to="/Gallery"><Fab className={classes.fab} color="secondary"><Photo /></Fab></Link>
            <Link to="/login"><Fab className={classes.fab} color="secondary"><AccountCircle /></Fab></Link>
        </div>
      </div>
    );
  }

export default withStyles(styles)(Home);