import React, { Component } from 'react';
import './styles.css';

class EmployeeSearch extends Component {
  render() {
    //{added props and searchchange function for future implementations}
    const { searchQuery, onSearchChange } = this.props;
    return (
      <div className="search-container">
        <h2 className="search-title">Employee Search</h2>
        <div className="search-input-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search..."
            value={searchQuery}
            onChange={onSearchChange}
          />
          <button className="search-button">Search</button>
        </div>
      </div>
    );
  }
}

export default EmployeeSearch;
