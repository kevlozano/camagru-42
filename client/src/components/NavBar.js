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
  constructor(props) {
    super(props);
    this.state = {
      drawerIsOpen: false
    }
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
            {this.props.isLoggedIn ? 
            <Button onClick={this.props.handleLogout} color="inherit">Logout</Button>
            :
            <Link to="/login" style={{ textDecoration: 'none' , color: 'white'}}><Button color="inherit"><AccountCircle /></Button></Link>
            }
      
          </Toolbar>
        </AppBar>
        <Drawer
          variant="temporary"
          
          open={this.state.drawerIsOpen}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              <ChevronLeftIcon />
            </IconButton>
          </div>
          <div className={classes.drawerInner}>
            <Link to="/"><Button onClick={this.handleDrawerClose} color="inherit">Home</Button></Link>
            <Link to="/main"><Typography variant="h6"><Button onClick={this.handleDrawerClose} color="primary">Camera</Button></Typography></Link>
            <Link to="/gallery"><Typography variant="h6"><Button onClick={this.handleDrawerClose} color="primary">Gallery</Button></Typography></Link>
            <Link to="/change"><Typography variant="h6"><Button onClick={this.handleDrawerClose} color="primary">Change settings</Button></Typography></Link>
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