import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router-dom'; 
import axios from 'axios';
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
    
    handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitted");
        var cookieUser = document.cookie.match(/^(.*;)?\s*userId\s*=\s*[^;]+(.*)?$/);
        console.log(cookieUser);
        if (cookieUser) {
            cookieUser = cookieUser[0].split('=')[1];
            console.log("HERE");
            if (!e.target.name.value || !e.target.email.value || !e.target.password.value) {
                alert('fill all the fields!');
            }
            else {
                axios.post('http://localhost:4000/users/update/' + cookieUser, {
                username: e.target.name.value,
                email: e.target.email.value,
                password: e.target.password.value,
                receiveEmails: e.target.emails.value
                })
                .then((response) => {
                    console.log(response);
                    alert('Everything updated!')
                })
                .catch((err) => {
                    console.log(err.response);
                });
            }
        }
        else
            alert("login");
    }
          

    render() {
        const { classes } = this.props;
        return(
            <div className="Login">
              <div className="paperThing">
                <Paper>
                        <Typography variant="h5" color="primary" component="h3">
                        Change stuff
                        </Typography>
                        <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
                            <Typography component="p">
                            No Emails? <input type="checkbox" name="sports" id="emails"  />
                            </Typography>
                            <br />
                            <TextField
                            id="name"
                            label="Name"
                            className={classes.textField}
                            placeholder={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            /> 
                            <TextField
                            id="email"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            margin="normal"
                            />
                            <TextField
                            id="password"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            />
                            <Button type="submit" variant="contained" className={classes.button} color="secondary">Change</Button>
                        </form>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default withRouter(withStyles(styles)(Login));