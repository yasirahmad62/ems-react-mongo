import React, { Component } from 'react';
import { UPDATE_EMPLOYEE, GET_EMPLOYEE_BY_ID, DELETE_EMPLOYEE } from "../query";
import { ApolloConsumer } from '@apollo/client';
import NavBar from './componenets/NavBar';
import './styles.css';
import Footer from './componenets/Footer';

class EmployeeDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            employee: null,
            loading: true,
            error: null,
            isEditing: false,
            title: '',
            department: '',
            currentStatus: false,
            isModalOpen: false, 
        };
    }

    async componentDidMount() {
        const currentUrl = window.location.href;
        const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
        const { client } = this.props;
        const { data } = await client.query({
            query: GET_EMPLOYEE_BY_ID,
            variables: { id }
        });
        const { title, department, currentStatus } = data.employee;
        this.setState({ employee: data.employee, loading: false, title, department, currentStatus });

    }
    // helper function to parse timeStamp to date
    formatDate = (timestamp) => {
        const date = new Date(parseInt(timestamp));
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }

    //changint the state to edit true
    handleEditClick = () => {
        this.setState({ isEditing: true });
    };

    handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        //Active status of employee
        const val = type === 'checkbox' ? checked : value;
        this.setState({ [name]: val });
    };

    handleSaveClick = async () => {
        const { client } = this.props;
        const { title, department, currentStatus } = this.state;
        const currentUrl = window.location.href;
        const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
        await client.mutate({
            mutation: UPDATE_EMPLOYEE,
            variables: {
                id,
                input: { title, department, currentStatus }
            }
        });
        this.setState({ isEditing: false });
    };

    handleDeleteConfirm = async () => {
        const { client } = this.props;
        const currentUrl = window.location.href;
        const id = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
            await client.mutate({
                mutation: DELETE_EMPLOYEE,
                variables: { id }
            });
            // Go back to the list page instead of using window.location.href
            window.location.href = '/list';
    };

    openModal = () => {
        this.setState({ isModalOpen: true });
    };

    closeModal = () => {
        this.setState({ isModalOpen: false });
    };

    render() {
        const { employee, loading, error, isEditing, title, department, currentStatus, isModalOpen } = this.state;
        if (loading) return <p className="loadingScreen">Loading...</p>;
        if (error) return <p>Error: {error}</p>;
        if (!employee) return <p>No employee found</p>;
        // Inside the render() method of the EmployeeDetails component

        return (
            <div className="employee-details-container">
                <NavBar />
                <div className="container">
                    <div className="card">
                        <h2>Employee Details</h2>
                        <p>First Name: <span>{employee.firstName}</span></p>
                        <p>Last Name: <span>{employee.lastName}</span></p>
                        <p>Age: <span>{employee.age}</span></p>
                        <p>Date Of Joining: <span>{this.formatDate(employee.dateOfJoining)}</span></p>
                        <form className="editable-fields-form">
                            <div className="form-group">
                                <label>Title:</label>
                                {isEditing ? (
                                    <select name="title" value={title} onChange={this.handleInputChange} className="input-field">
                                        <option value="Employee">Employee</option>
                                        <option value="Manager">Manager</option>
                                        <option value="Director">Director</option>
                                        <option value="VP">VP</option>
                                    </select>
                                ) : (
                                    <span>{title}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Department:</label>
                                {isEditing ? (
                                    <select name="department" value={department} onChange={this.handleInputChange} className="input-field">
                                        <option value="IT">IT</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="HR">HR</option>
                                        <option value="Engineering">Engineering</option>
                                    </select>
                                ) : (
                                    <span>{department}</span>
                                )}
                            </div>
                            <div className="form-group">
                                <label>Current Status:</label>
                                {isEditing ? (
                                    <input type="checkbox" name="currentStatus" checked={currentStatus} onChange={this.handleInputChange} />
                                ) : (
                                    <span>{currentStatus ? 'Active' : 'Inactive'}</span>
                                )}
                            </div>
                        </form>
                        <div className="button-section">
                            {!isEditing ? (
                                <button onClick={this.handleEditClick} className="active-button">Edit Info</button>
                            ) : (
                                <button onClick={this.handleSaveClick} className="submit-button">Save</button>
                            )}
                            <button onClick={this.openModal} className="delete-button inactive-button">Delete</button>
                        </div>
                    </div>
                </div>
                <Footer />
                {isModalOpen && (
                    <div className="modal-overlay">
                        <div className="modal">
                            <div className="modal-content">
                                <p>Are you sure you want to delete this employee?</p>
                                <div className="modal-buttons">
                                    <button onClick={this.handleDeleteConfirm} className="confirm-button">Yes</button>
                                    <button onClick={this.closeModal} className="cancel-button">No</button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );

    }
}

const EmployeeDetailsWithData = (props) => (
    <ApolloConsumer>
        {client => <EmployeeDetails {...props} client={client} />}
    </ApolloConsumer>
);

export default EmployeeDetailsWithData;
