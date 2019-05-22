import React from 'react';
import Camera from './Camera.js';
import ButtonP from './Button.js';
import GridOfFilters from './GridOfFilters.js';
import Filter from './Filter.js';

class MainApp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilterOn: false,
      isVideoOn: true,
      filterSrc: "a",
      readyToDownload: false,
      file: null
    };
  }
  
  handleClickTakePic = () => {
   
    if (this.state.isFilterOn) {
      this.setState(state => ({
        isFilterOn: false,
        isVideoOn: false,
        readyToDownload: true,
        file: null 
    }));
  
      let c = document.getElementById('videocanv');
      c.style.opacity = "1";
      let ctx = c.getContext("2d");
      ctx.clearRect(0,0, c.width, c.height);
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
        <ButtonP name="btn-takepicture" value={this.state.readyToDownload ? "Download" : "Take Picture"} handleClick={this.handleClickTakePic}/>
        <input accept="image" type="file" className="file-upload" onChange={this.fileSelectHandler} onClick={this.handleClickUpload}/>
        <ButtonP upload="true" name="btn-Upload" handleClick={this.handleClickUpload} value={this.state.isVideoOn ? "Upload" : "Camera"} />
        <GridOfFilters handleClick={this.handleClickFilter}/>
      </div>
    );
  }
  
}

export default MainApp;