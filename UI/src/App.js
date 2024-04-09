import React from "react";
import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import client from "./client";

import AddEmployeePage from './JSX/addEmployeePage';

import EmployeeListing from "./JSX/employeeListing";
import HomePage from "./JSX/Homepage";
import EmployeeDetails from "./JSX/EmployeeDetails";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/list" element={<EmployeeListing />} />
            <Route path="/add" element={<AddEmployeePage />} />
            <Route path="/details/:id" element={<EmployeeDetails />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
