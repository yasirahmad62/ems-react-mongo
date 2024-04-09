const { gql } = require('apollo-server-express');

const typeDefs = gql`
  input CreateEmployeeInput {
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
  }

  input UpdateEmployeeInput {
    title: String
    department: String
    currentStatus: Boolean
  }

  type Employee {
    _id: ID!
    firstName: String!
    lastName: String!
    age: Int!
    dateOfJoining: String!
    title: String!
    department: String!
    employeeType: String!
    currentStatus: Boolean!
  }

  type Query {
    employees(filterType: String): [Employee!]!
    employee(id: ID!): Employee
  }

  type Mutation {
    createEmployee(input: CreateEmployeeInput!): Employee!
    updateEmployee(id: ID!, input: UpdateEmployeeInput!): Employee!
    deleteEmployee(id: ID!): Employee!
  }
`;

module.exports = typeDefs;
