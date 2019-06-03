import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'; 

class Validate extends React.Component {

   componentDidMount = () => {
       let username = this.props.location.search.slice(1);
       console.log(username);
       axios.post('http://localhost:4000/users/val/' + username)
       .then((response) => {
           console.log(response + ' validated ' + username);
       })
       .catch((err) => {
           console.log(err);
       });
    };
    // 
  render() {
    return (
        <div>
            <h1 className="val">Thanks for validating!</h1>
        </div>
    );
  }
  }

export default withRouter(Validate);