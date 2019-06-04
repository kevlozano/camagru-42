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
import ForgotPassword from './components/ForgotPassword';
import ChangeStuff from './components/ChangeStuff';
import Validate from './components/Validate';
import Footer from './components/Footer';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: purple,
  },
  fabPadding: {
    padding: '100px',
  },
  typography: {
    fontFamily: [
      "Roboto",
      "-apple-system",
      "BlinkMacSystemFont",
      "Segoe UI",
      "Arial",
      "sans-serif"
    ].join(","),
    useNextVariants: true
  }
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
      imgId: "",
      userId: ""
    };
    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);

  }

  componentDidMount() {
    var cookieUser = document.cookie.match(/^(.*;)?\s*userId\s*=\s*[^;]+(.*)?$/);
    if (cookieUser) {
      cookieUser = cookieUser[0].split('=')[1];
    }
    if (cookieUser) {
      this.setState(
        { isLoggedIn: true ,
          userId: cookieUser
        }
      );
    }
  }

  handleLogin() {
    var cookieUser = document.cookie.match(/^(.*;)?\s*userId\s*=\s*[^;]+(.*)?$/);
    if (cookieUser) {
      cookieUser = cookieUser[0].split('=')[1];
    }
    if (cookieUser) {
      this.setState(
        { isLoggedIn: true ,
          userId: cookieUser
        }
      );
    }
  };
  handleLogout() {
    document.cookie = "userId=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    this.setState(
      { isLoggedIn: false }
    );
  };

  handleClickImgShow = (id) => {
    this.setState(
      {imgId : id}
    );
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <NavBar isLoggedIn={this.state.isLoggedIn} handleLogout={this.handleLogout} />
            <Route exact path="/" render={() => <Home isLoggedIn={this.state.isLoggedIn} />} />
            <Route path="/main" render={() => <MainApp isLoggedIn={this.state.isLoggedIn}/>} />
            <Route path="/login" render={() => <Login handleLogin={this.handleLogin} isLoggedIn={this.state.isLoggedIn} />} />
            <Route path="/val" render={() => <Validate />} />
            <Route path="/gallery" render={() => <Gallery isLoggedIn={this.state.isLoggedIn} handleClick={this.handleClickImgShow}/>} />
            <Route path="/show" render={() => <ImgShow isLoggedIn={this.state.isLoggedIn} imgId={this.state.imgId}/>} userId={this.state.userId}/>
            <Route path="/forgot" render={() => <ForgotPassword isLoggedIn={this.state.isLoggedIn} imgId={this.state.imgId}/>} userId={this.state.userId}/>
            <Route path="/change" render={() => <ChangeStuff isLoggedIn={this.state.isLoggedIn} imgId={this.state.imgId}/>} userId={this.state.userId}/>
            <Footer />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }

}

export default App;
