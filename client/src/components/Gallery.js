import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import axios from 'axios';
import ButtonP from './Button';

// api call need to be added

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    margin: "1%",
  },
});


class Gallery extends React.Component {
  //understand how to pull up the data and check if im storing it correctly
  constructor(props) {
    super(props);
    this.state = {
      img0: "",
      img1: "",
      img2: "",
      img3: "",
      img4: "",
      img5: "",
      img6: "",
      page: 0,
    };
  }

  fillUpGallery = (res, i) => {
    var imgsSrc = [];
    let j = i+5;
    let x = 0;
    for(i; i < j; i++) {
      console.log(i);
      let src = res.data[i].media;
      imgsSrc[i] = src;
      let img = "img" + x;
      this.setState({
        [img] : imgsSrc[i],
      });
      x++;
    }
  };
  getInfoPics = () => {
    console.log("getting info");
    axios.get('http://localhost:4000/posts/gallery')
    .then((response) => {
      this.fillUpGallery(response, this.state.page);
      this.setState(prevState => ({
        page: prevState.page+5
      }));
    })
    .catch(function(err){
      console.log(err);
    });
  }

  componentDidMount() {
    this.getInfoPics();
  }

  render() {
    const { classes } = this.props;
    return (
      <div className="Gallery">
        <div className={classes.root}>
          <Grid container spacing={24}>
            <Grid item xs={12} sm={6}>
              <img src={this.state.img0}></img>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={this.state.img1}></img>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={this.state.img2}></img>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={this.state.img3}></img>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={this.state.img4}></img>
            </Grid>
            <Grid item xs={12} sm={6}>
              <img src={this.state.img5}></img>
            </Grid>
          </Grid>
        </div>
        <ButtonP name="btnGrid" handleClick={this.getInfoPics}color="primary" value="more" />
      </div>
    );
  }
}

Gallery.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Gallery);