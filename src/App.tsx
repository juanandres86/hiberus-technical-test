import React from 'react';
import logo from './logo.svg';
import './App.css';
import { useSelector } from 'react-redux';
import { getUsers } from './store/users/users.selectors';
import LoginPage from './pages/login/login.page';
import store from './store';
import { Provider }  from 'react-redux';
import MainNavigator from './navigation';

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <MainNavigator />
      </Provider>
    </div>
  );
}

export default App;
