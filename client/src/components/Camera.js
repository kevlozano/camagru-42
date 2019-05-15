import React from 'react';

class Camera extends React.Component {
  startVideo = () => {
    if(this.props.isVideoOn) {
      var video = document.getElementById('video');
      if(navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia({ video: true }).then(function(stream) {
              video.srcObject = stream;
              video.play();
          });
      }
    };
  }

  componentDidMount() {
   this.startVideo(); 
  }

  componentDidUpdate() {
    this.startVideo();
  }
  
  render() {
    return (
      <div className="video">
        {this.props.isVideoOn ? <video id="video" width="100%" autoplay></video> : <img className="uploadedImg" src={this.props.src}></img>}
      </div>
    );
  }
}

export default Camera;