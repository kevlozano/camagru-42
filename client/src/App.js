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
  Link,
  Redirect,
  withRouter
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
  

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <Router>
          <div>
            <NavBar />
            <Route exact path="/" component={Home} />
            <Route path="/main" component={MainApp} />
            <Route path="/Login" component={Login} />
            <Route path="/gallery" component={Gallery} />
            <Route path="/show" component={ImgShow} />
          </div>
        </Router>
      </MuiThemeProvider>
    );
  }
  
}

export default App;
