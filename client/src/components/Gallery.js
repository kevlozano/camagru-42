import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import ButtonP from './Button';
import ImgOfGallery from './ImgOfGallery';

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
      id0: "",
      img1: "",
      id1: "",
      img2: "",
      id2: "",
      img3: "",
      id3: "",
      img4: "",
      id4: "",
      img5: "",
      id5: "",
      img6: "",
      id6: "",
      page: 0,
    };
  }

  fillUpGallery = (res, i) => {
    var imgsSrc = [];
    var imgsId = [];
    let j = i+7;
    let x = 0;
    for(i; i < j; i++) {
      let src = res.data[i].media;
      let id = res.data[i]._id;
      console.log(id);
      imgsSrc[i] = src;
      imgsId[i] = id;
      let idId = "id" + x;
      let img = "img" + x;
      this.setState({
        [img] : imgsSrc[i],
        [idId] : imgsId[i]
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
              <ImgOfGallery src={this.state.img0} imgId={this.state.id0} handleClick={this.props.handleClick}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ImgOfGallery src={this.state.img1} imgId={this.state.id1} handleClick={this.props.handleClick}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ImgOfGallery src={this.state.img2} imgId={this.state.id2} handleClick={this.props.handleClick}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ImgOfGallery src={this.state.img3} imgId={this.state.id3} handleClick={this.props.handleClick}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ImgOfGallery src={this.state.img4} imgId={this.state.id4} handleClick={this.props.handleClick}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ImgOfGallery src={this.state.img5} imgId={this.state.id5} handleClick={this.props.handleClick}/>
            </Grid>
            <Grid item xs={12} sm={6}>
              <ImgOfGallery src={this.state.img6} imgId={this.state.id6} handleClick={this.props.handleClick}/>
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