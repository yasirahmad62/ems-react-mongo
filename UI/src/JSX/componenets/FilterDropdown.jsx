import React, { Component } from "react";
import "../styles.css";

class FilterDropdown extends Component {
  handleTypeChange = (event) => {
    const selectedType = event.target.value;
    this.props.onTypeChange(selectedType);
  };

  render() {
    const { selectedType } = this.props;
    return (
      <div className="filter-dropdown">
        <select
          className="dropdown-select"
          value={selectedType}
          onChange={this.handleTypeChange}
        >
          <option value="All">All</option>
          <option value="FullTime">Full Time</option>
          <option value="PartTime">Part Time</option>
          <option value="Contract">Contract</option>
          <option value="Seasonal">Seasonal</option>
        </select>
      </div>
    );
  }
}

export default FilterDropdown;
