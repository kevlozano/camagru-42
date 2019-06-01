import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { Link, withRouter} from 'react-router-dom';
import axios from 'axios';

const styles = theme => ({
    root: {
      ...theme.mixins.gutters(),
      paddingTop: theme.spacing.unit * 4,
      paddingBottom: theme.spacing.unit * 4,
    },
  });

class ForgotPassword extends React.Component {
    handleChange = name => event => {
        this.setState({ [name]: event.target.value });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        console.log(e.target.email.value);
        let email = e.target.email.value;
        var self = this;
        axios.post('http://localhost:4000/users/forgot', {
            email: email
        })
        .then((response) => {
            console.log('temporary password reset');
            self.sendEmail(email, response);
        })
        .catch((err) => {
            console.log(err);
        })
    }

    sendEmail = (email, temporaryP) => {
        axios.post('http://localhost:4000/posts/email', {
            email: email,
            subject: 'retrieving password!',
            text: "Access your account with this temporary password (and change it ASAP): " + temporaryP.data
        });
        alert("Done! check your email");
    }

render() {
    const { classes } = this.props;
    return(
        <div className="Login">
          <div className="paperThing">
                <Paper>
                    <Typography variant="h5" color="primary" component="h3">
                    Retrieve Password
                    </Typography>
                    <Typography component="p">
                    Its easy
                    </Typography>
                    <form onSubmit={this.handleSubmit} className={classes.container} noValidate autoComplete="off">
                        <TextField
                        id="email"
                        label="email"
                        className={classes.textField}
                        placeholder="email"
                        onChange={this.handleChange('email')}
                        margin="normal"
                        />
                        <Button type="submit" variant="contained" className={classes.button} color="secondary"> Send </Button>
                    </form>
                </Paper>
              </div>
        </div>
    );
}
}

export default withRouter(withStyles(styles)(ForgotPassword));