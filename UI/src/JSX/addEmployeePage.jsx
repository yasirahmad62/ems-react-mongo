import React, { Component } from 'react';
import { ApolloConsumer } from '@apollo/client';
import { CREATE_EMPLOYEE } from '../query';
import EmployeeCreate from './componenets/employeeCreate';
import NavBar from './componenets/NavBar';
import Footer from './componenets/Footer';

class AddEmployeePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formData: {
                firstName: '',
                lastName: '',
                age: '',
                dateOfJoining: '',
                title: '',
                department: '',
                employeeType: ''
            },
            successMessage: ''
        };
    }

    handleChange = (e) => {
        this.setState({
            formData: {
                ...this.state.formData,
                [e.target.name]: e.target.value
            }
        });
    }

    handleSubmit = async (client) => {
        //Parsing age to Int and then passing to the formData
        const formDataWithIntAge = {
            ...this.state.formData,
            age: parseInt(this.state.formData.age, 10)
        };
        await client.mutate({
            mutation: CREATE_EMPLOYEE,
            variables: {
                input: formDataWithIntAge
            }
        });

        this.setState({
            formData: {
                firstName: '',
                lastName: '',
                age: '',
                dateOfJoining: '',
                title: '',
                department: '',
                employeeType: ''
            },
            successMessage: 'Employee created successfully'
        });
        // This will clear the success message after some time
        setTimeout(() => {
            this.setState({ successMessage: '' });
        }, 3000); 
    }


    render() {
        const {successMessage}=this.state
        return (
            <>
                <NavBar />
                <ApolloConsumer>
                    {client => (
                        <div className="container">
                            <div className="employeeSection">
                                <EmployeeCreate
                                    formData={this.state.formData}
                                    setFormData={this.handleChange}
                                    handleSubmit={() => this.handleSubmit(client)}
                                    successMessage={successMessage}
                                />
                            </div>
                            {successMessage}
                        </div>
                    )}
                </ApolloConsumer>
                <Footer />
            </>
        );
    }
}

export default AddEmployeePage;
