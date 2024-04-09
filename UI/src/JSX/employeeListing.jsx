import React, { Component } from "react";
import { ApolloConsumer } from "@apollo/client";
import LoadingIcon from "./componenets/LoadingIcon";
import EmployeeTable from "./componenets/employeeTable";
import NavBar from "./componenets/NavBar";
import FilterDropdown from "./componenets/FilterDropdown";
import { GET_EMPLOYEES } from "../query";
import Footer from "./componenets/Footer";

class EmployeeListing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null,
      data: [],
      filterType: 'All'
    };
  }

  componentDidMount() {
    // Fetching data when component mounts
    this.fetchData();
    const params = new URLSearchParams(window.location.search);
    const filterType = params.get("type") || "All";
    this.setState({ filterType });
  }

  fetchData = async () => {
      const { client } = this.props;
      const { data } = await client.query({
        query: GET_EMPLOYEES,
        fetchPolicy: 'network-only'
      });
      this.setState({ data: data.employees, loading: false });

  };

  handleFilterChange = (selectedType) => {
    this.setState({ filterType: selectedType });
  };

  render() {
    const { loading, error, data, filterType } = this.state;

    if (loading) return <div className="loadingScreen"> <LoadingIcon /></div>;
    if (error) return <p>{error}</p>;

    let filteredEmployees = data;

    if (filterType !== 'All') {
      filteredEmployees = data.filter(employee => employee.employeeType === filterType);
    }

    return (
      <>
        <NavBar />
        <div className="container">
          <h1>Employee Directory</h1>
          <FilterDropdown
            selectedType={filterType}
            onTypeChange={this.handleFilterChange}
          />
          <div className="employeeSection">
            <EmployeeTable employees={filteredEmployees} />
          </div>
        </div>
        <Footer/>
      </>
    );
  }
}

export default props => (
  <ApolloConsumer>
    {client => <EmployeeListing {...props} client={client} />}
  </ApolloConsumer>
);
