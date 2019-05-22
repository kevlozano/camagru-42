import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Switch from '@material-ui/core/Switch';

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
        name: 'Mango',
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

    render() {
        const { classes } = this.props;
        return(
            <div className="Login">
                <div className="paperThing">
                    <Paper className={classes.root} elevation={1}>
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
                            {this.state.checkedA ? "" : <TextField
                            id="standard-name"
                            label="Name"
                            className={classes.textField}
                            placeholder={this.state.name}
                            onChange={this.handleChange('name')}
                            margin="normal"
                            /> }
                            <TextField
                            id="standard-required"
                            label="Email"
                            className={classes.textField}
                            value={this.state.email}
                            onChange={this.handleChange('email')}
                            margin="normal"
                            />
                            <TextField
                            id="standard-password-input"
                            label="Password"
                            className={classes.textField}
                            type="password"
                            autoComplete="current-password"
                            margin="normal"
                            />
                            <Button type="submit" variant="contained" className={classes.button} color="secondary"> {this.state.checkedA ? "Login" : "Sign up"}</Button>
                        </form>
                    </Paper>
                </div>
            </div>
        );
    }
}

export default withStyles(styles)(Login);