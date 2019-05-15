import React from 'react';

//either change design and put upload button somewhere else or make it work somehow like it is

class ButtonP extends React.Component {
  render() {
    return (
      <input type="button" className={this.props.name} value={this.props.value} onClick={this.props.handleClick}>
      </input>
    );
  }
  }

export default ButtonP;