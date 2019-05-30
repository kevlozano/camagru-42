import React from 'react';
import './App.css';
import MainApp from "./components/MainApp";
import Login from "./components/Login";
import Home from "./components/Home";
import NavBar from './components/NavBar.js';
import { purple } from '@material-ui/core/colors';
import Gallery from './components/Gallery';
import ImgShow from './components/ImgShow';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: purple,
  },
  fabPadding: {
    padding: '100px',
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      user: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  handleLogin() {
    this.setState(
      { isLoggedIn: true }
    );
  };
  handleLogout() {
    document.cookie = "userId" + '=;expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    this.setState(
      { isLoggedIn: false }
    );
  };

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <NavBar isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} />
            <Route exact path="/" render={() => <Home isLoggedIn={this.state.isLoggedIn} />} />
            <Route path="/main" render={() => <MainApp isLoggedIn={this.state.isLoggedIn}/>} />
            <Route path="/login" render={() => <Login handleLogin={this.handleLogin} />} />
            <Route path="/gallery" render={() => <Gallery isLoggedIn={this.state.isLoggedIn} />} />
            <Route path="/show" render={() => <ImgShow isLoggedIn={this.state.isLoggedIn} />} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }

}

export default App;
