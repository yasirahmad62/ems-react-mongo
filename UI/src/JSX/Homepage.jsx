import React, { Component } from 'react';
import './styles.css';
import NavBar from './componenets/NavBar';
import Footer from './componenets/Footer';
class HomePage extends Component {
  render() {
    return (
      <>
        <NavBar />
        <div className="container">
          <h1>Hello User !</h1>
          <h1 className="heading">Welcome to my Employee Management System</h1>
          <p className="message">We can add, remove, update and filter employee here</p>
        </div>
        <Footer />
      </>
    );
  }
}

export default HomePage;
