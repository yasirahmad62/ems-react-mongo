import React, { Component } from 'react';
import "../styles.css"
import { Link } from 'react-router-dom';

class EmployeeTable extends Component {

  render() {
    const { employees } = this.props;
    return (
      <div className="table-container">
        <h2>Employee Table</h2>
        {employees && (
          <div className="cardTable">
            <table>
              <thead>
                <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Age</th>
                  <th>Date Of Joining</th>
                  <th>Title</th>
                  <th>Department</th>
                  <th>EmployeeType</th>
                  <th>CurrentStatus</th>
                  <th>View/Update</th>
                </tr>
              </thead>
              <tbody>
                {employees.map((employee) => (
                  <tr key={employee._id} className="table-row">
                    <td>{employee.firstName}</td>
                    <td>{employee.lastName}</td>
                    <td>{employee.age}</td>
                    <td>{new Date(parseInt(employee.dateOfJoining)).toLocaleDateString()}</td>
                    <td>{employee.title}</td>
                    <td>{employee.department}</td>
                    <td>{employee.employeeType}</td>
                    <td>
                      <button className={employee.currentStatus ? 'active-button' : 'inactive-button'}>
                        {employee.currentStatus ? 'Active' : 'Inactive'}
                      </button>
                    </td>
                    <tr key={employee._id}>

                      <td><Link to={`/details/${employee._id}`}>View Details</Link></td>
                    </tr>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  }
}

export default EmployeeTable;
