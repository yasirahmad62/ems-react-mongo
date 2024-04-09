import React, { Component } from 'react';
import "../styles.css"

class EmployeeCreate extends Component {
  render() {
    const {
      formData,
      setFormData,
      handleSubmit,
      successMessage
    } = this.props;
    return (
      <div className="card">
        <h2>Create Employee</h2>
        {successMessage && <p>{successMessage}</p>}
        <form onSubmit={handleSubmit}>
          <label htmlFor="firstName">First Name:</label>
          <input
            type="text"
            id="firstName"
            className="input-field"
            name="firstName"
            value={formData.firstName}
            onChange={setFormData}
            required
          />

          <label htmlFor="lastName">Last Name:</label>
          <input
            type="text"
            id="lastName"
            className="input-field"
            name="lastName"
            value={formData.lastName}
            onChange={setFormData}
            required
          />

          <label htmlFor="age">Age (between 20 and 70):</label>
          <input
            type="number"
            id="age"
            className="input-field"
            name="age"
            value={formData.age}
            onChange={setFormData}
            min="20"
            max="70"
            required
          />

          <label htmlFor="dateOfJoining">Date of Joining:</label>
          <input
            type="date"
            id="dateOfJoining"
            className="input-field"
            name="dateOfJoining"
            value={formData.dateOfJoining}
            onChange={setFormData}
            required
          />

          <label htmlFor="title">Title:</label>
          <select
            id="title"
            className="input-field"
            name="title"
            value={formData.title}
            onChange={setFormData}
            required
          >
            <option value="">Select Title</option>
            <option value="Employee">Employee</option>
            <option value="Manager">Manager</option>
            <option value="Director">Director</option>
            <option value="VP">VP</option>
          </select>

          <label htmlFor="department">Department:</label>
          <select
            id="department"
            className="input-field"
            name="department"
            value={formData.department}
            onChange={setFormData}
            required
          >
            <option value="">Select Department</option>
            <option value="IT">IT</option>
            <option value="Marketing">Marketing</option>
            <option value="HR">HR</option>
            <option value="Engineering">Engineering</option>
          </select>

          <label htmlFor="employeeType">Employee Type:</label>
          <select
            id="employeeType"
            className="input-field"
            name="employeeType"
            value={formData.employeeType}
            onChange={setFormData}
            required
          >
            <option value="">Select Employee Type</option>
            <option value="FullTime">FullTime</option>
            <option value="PartTime">PartTime</option>
            <option value="Contract">Contract</option>
            <option value="Seasonal">Seasonal</option>
          </select>

          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    );
  }
}

export default EmployeeCreate;
