import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';
import axios from 'axios';
import { withRouter, Link } from 'react-router-dom'; 
// do handle submit function

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 2,
      paddingBottom: theme.spacing.unit * 2,
    },
  });

class Login extends React.Component {

    state = {
        name: 'Your name',
        email: '',
        checkedA: false,
        multiline: 'Controlled',
      };

    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };
    handleCheck = name => event => {
        this.setState({ [name]: event.target.checked });
    };

    handleSubmit = (e) => {
    //login
      e.preventDefault();
      e.persist();
      var self = this;
      if (this.state.checkedA) {  
          axios.post('http://localhost:4000/users/login/', {
            username: e.target.name.value,
            password: e.target.password.value
          })
          .then(function(response) {
              console.log(response.data);
              if (response.data) {
                document.cookie = "userId=" + response.data;
                self.authLogin();
              }
              else {
                console.log("wrong username or password");
                alert("VALIDATE! ALSO CHECK USERNAME AND PASSWORD");
              }
          })
          .catch(function(err) {
              console.log(err);
              alert("Something went wrong oops try again");
          });
      }
      else {
        let email = e.target.email.value;
        let username = e.target.username.value;
        self = this;
        axios.post('http://localhost:4000/users/add/', {
            username: e.target.name.value,
            email: e.target.email.value,
            password: e.target.password.value
        })
        .then(function(response) {
            console.log(response);
            self.setState({
              checkedA: true,
              name: e.target.name.value,
              email: e.target.email.value,
              password: e.target.password.value
          });
          self.sendEmail(email, username);
        })
        .catch(function(err) {
            console.log(err);
            alert('Wrong username or password format plase try again');
        })
      }
    };

    authLogin = () => {
      this.props.handleLogin();
      this.props.history.push('/main');
    }

    sendEmail = (email, username) => {
      console.log(email);
      axios.post('http://localhost:4000/posts/email', {
          email: email,
          subject: 'W E L C O M E',
          text: "please go to this link to validate your account: http://localhost:3000/val/?" + username + '#' + Math.floor((Math.random() * 1000) + 1) 
      });
  }

    render() {
        const { classes } = this.props;
        return(
            <div className="Login">
              <div className="paperThing">
                    {this.props.isLoggedIn ? <Typography variant="h5" color="primary" component="h3">You're logged in</Typography>: <Paper className={classes.root} elevation={1}>
                    <Switch
                        checked={this.state.checkedA}
                        onChange={this.handleCheck('checkedA')}
                        value="checkedA"
                        />
                        <Typography variant="h5" color="primary" component="h3">
                        {this.state.checkedA ? "Login" : "Signup"}
                        </Typography>
                        <Typography component="p">
                        {this.state.checkedA ? "Even easier" : "Its easy"}
                        </Typography>
                        <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
                            <TextField
                            id="name"
                            label="Name"
                            className={classes.textField}
                            placeholder={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            />
                            {this.state.checkedA ? "" : 
                            <TextField
                            id="email"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            margin="normal"
                            /> }
                            <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            />
                            <Button type="submit" variant="contained" className={classes.button} color="secondary"> {this.state.checkedA ? "Login" : "Sign up"}</Button>
                        </form>
                        
                    </Paper>}
                    <Link to='/forgot'>Forgot password?</Link>
                  </div>
                  
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Login));