import React from 'react';
import './App.css';
import Camera from './components/Camera.js'
import NavBar from './components/NavBar.js'
import ButtonP from './components/Button.js'
import GridOfFilters from './components/GridOfFilters.js'
import Filter from './components/Filter.js'

//why is the video not starting again?

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isFilterOn: false,
      isVideoOn: true,
      filterSrc: "a",
      file: null
    };
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
      <div className="App">
        <NavBar />
        <Camera isVideoOn={this.state.isVideoOn} src={this.state.file}/>
        {this.state.isFilterOn ? <Filter filter="true" filterSrc={this.state.filterSrc}/> : ""}
        <ButtonP name="btn-takepicture" value="Take Picture" />
        <input accept="image" type="file" className="file-upload" onChange={this.fileSelectHandler} onClick={this.handleClickUpload}/>
        <ButtonP upload="true" name="btn-Upload" handleClick={this.handleClickUpload} value={this.state.isVideoOn ? "Upload" : "Camera"} />
        <GridOfFilters handleClick={this.handleClickFilter}/>
      </div>
    );
  }
  
}

export default App;
