import React from 'react';

import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

//components
import Header from './components/headerComponent/header';
import Footer from './components/footerComponent/footer';
import Homepage from './components/pages/HomePage';
import Login from './components/pages/SingIn';
import SingUp from './components/pages/SingUp';

import "./Assets/css/default.min.css";

function App() {
  
    return (
      <Router>
        <div className="App">
            <Header />
              <Route exact path="/" component={Homepage} />
              <Route exact path="/Login" component={Login} />
              <Route exact path="/SingUp" component={SingUp} />

            <Footer />
        </div>
      </Router>
    );
}

export default App;
