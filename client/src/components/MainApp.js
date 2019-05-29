import React from 'react';
import Camera from './Camera.js';
import ButtonP from './Button.js';
import GridOfFilters from './GridOfFilters.js';
import Filter from './Filter.js';
import axios from 'axios';

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilterOn: false,
      isVideoOn: true,
      filterSrc: "a",
      readyToDownload: false,
      file: null,
      loggedIn: false
    };
  }

  componentDidMount() {
    let cookieUser = document.cookie.match(/^(.*;)?\s*username\s*=\s*[^;]+(.*)?$/);
    if(cookieUser) {
      this.setState({
        loggedIn: true
      });
    };
  };
  
  handleClickTakePic = () => {
   
    let c = document.getElementById('videocanv');
    c.style.opacity = "1";
    let ctx = c.getContext("2d");
    ctx.clearRect(0,0, c.width, c.height);
    
    if (this.state.isFilterOn) {
      if (!this.state.isVideoOn) {
        var img2 = new Image();
        img2.src = this.state.file;
        ctx.drawImage(img2, 0, 0, 290, 120);
      }
      else {
        let video = document.querySelector('video');
        ctx.drawImage(video,  0, 0, 280, 115); 
      }
      setTimeout(() => {
        var img = new Image ();
        img.src = this.state.filterSrc;
        ctx.drawImage(img,  0, 0, 280, 115); 
      }, 0);
    }
    else {
      if (!this.state.isVideoOn) {
        var img2 = new Image();
        img2.src = this.state.file;
        ctx.drawImage(img2, 0, 0, 290, 120);
      }
      else {
        let video = document.querySelector('video');
        ctx.drawImage(video,  0, 0, 280, 115); 
      }
    }
  this.setState(state => ({
    isFilterOn: false,
    isVideoOn: false,
    readyToDownload: true,
    file: null 
}));
  }

  handleUploadFinalImage = () => {
    let c = document.getElementById('videocanv');
    let finalImage = c.toDataURL();
    var cookieUser = document.cookie.match(/^(.*;)?\s*userId\s*=\s*[^;]+(.*)?$/);
    cookieUser = cookieUser[0].split('=')[1];

    axios.post('http://localhost:4000/posts/add', {
      media: finalImage,
      userId: cookieUser
    })
    .then(function(response){
      console.log("image uploaded!: " + response);
      alert("YOU'RE POPULAR NOW CONGRATS");
    })
    .catch(function(err){
      console.log("LOSER: " + err);
    });
  }

  handleClickFilter = (src) => {
    this.setState(state => ({
        isFilterOn: !state.isFilterOn,
        filterSrc: src 
    }));
    console.log(src);
  }

  handleClickUpload = (event) => {
    if (!this.state.isVideoOn) {
      event.preventDefault();
      let c = document.getElementById('videocanv');
      c.style.opacity = "0";
      this.setState(state => ({
        readyToDownload: false,
        isFilterOn: false,
        filterSrc: "" 
    }));
    }
    this.setState(state => ({
      isVideoOn: !state.isVideoOn,
      }));
  }
 
  fileSelectHandler = (e) => {
    console.log(e.target.files[0]);
    this.setState({
      file: URL.createObjectURL(e.target.files[0])
      });
  }

  render() {
    return (
      <div className="MainApp">
        {this.state.isFilterOn ? <Filter filter="true" filterSrc={this.state.filterSrc}/> : ""}
        <Camera isVideoOn={this.state.isVideoOn} src={this.state.file} isFilterOn={this.state.isFilterOn} filterSrc={this.state.filterSrc}/>
        <canvas id="videocanv" className="videocanv"></canvas>
        <ButtonP name="btn-takepicture" value={this.state.readyToDownload ? "Upload to profile" : "Take Picture"} handleClick={this.state.readyToDownload ? this.handleUploadFinalImage : this.handleClickTakePic} />
        <input accept="image" type="file" className="file-upload" onChange={this.fileSelectHandler} onClick={this.handleClickUpload}/>
        <ButtonP upload="true" name="btn-Upload" handleClick={this.handleClickUpload} value={this.state.isVideoOn ? "Upload" : "Camera"} />
        <GridOfFilters handleClick={this.handleClickFilter}/>
      </div>
    );
  }
  
}

export default MainApp;