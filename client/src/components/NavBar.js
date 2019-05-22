import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Drawer from '@material-ui/core/Drawer';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { Link } from 'react-router-dom';
import AccountCircle from '@material-ui/icons/AccountCircle';

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};


class ButtonAppBar extends React.Component {
  state = {
    drawerIsOpen: false
  }

  handleDrawerOpen = () => {
    this.setState({ drawerIsOpen: true });
  };

  handleDrawerClose = () => {
    this.setState({ drawerIsOpen: false });
  };

  render() {
    const { classes } = this.props;
    return (
      <div className="navbar">
        <AppBar position="static">
          <Toolbar>
            <IconButton onClick={this.handleDrawerOpen} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              Camagru
            </Typography>
            <Link to="/login" style={{ textDecoration: 'none' , color: 'white'}}><Button color="inherit"><AccountCircle /></Button></Link>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporarys"
          
          open={this.state.drawerIsOpen}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <div className={classes.drawerInner}>
            <Link to="/"><Button onClick={this.handleDrawerClose} variant="h6" color="purple">Home</Button></Link>
            <Link to="/main"><Typography variant="h6"><Button onClick={this.handleDrawerClose} variant="h6" color="purple">Camera</Button></Typography></Link>
            <Link to="/gallery"><Typography variant="h6"><Button onClick={this.handleDrawerClose} variant="h6" color="primary">Gallery</Button></Typography></Link>
            <Link to="/show"><Typography variant="h6"><Button onClick={this.handleDrawerClose} variant="h6" color="purple">Show</Button></Typography></Link>
          </div>
        </Drawer>
      </div>
    );
  }
}
ButtonAppBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ButtonAppBar);