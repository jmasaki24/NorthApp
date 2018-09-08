import React from 'react';
import { Scene, Router, } from 'react-native-router-flux';
import HomePage from './components/HomePage';
import MenuPage from './components/MenuPage';

const RouterComponent = () => {
    return (
      <Router>
        <Scene key="root" hideNavBar>
          <Scene key="home" component={HomePage} initial />
          <Scene key="menu" component={MenuPage} />
        </Scene>
      </Router>
    );
};

export default RouterComponent;
