const Employee = require('../model/model');

const resolvers = {
  Query: {
    employees: async (_, { filterType }) => {
      let filter = {};

      // Checking filterType and based on that adding data to the filer object
      if (filterType && filterType !== "All") {
        filter = { employeeType: filterType };
      }
      return await Employee.find(filter);
    },
    employee: async (_, { id }) => {
      console.log(id)
      return await Employee.findById(id);
    }
  },
  Mutation: {
    createEmployee: async (parent, { input }) => {
      const { firstName, lastName, age, dateOfJoining, title, department, employeeType } = input;
      const newEmployee = new Employee({
        firstName,
        lastName,
        age,
        department,
        dateOfJoining,
        employeeType,
        title,
        currentStatus: true 
      });
      await newEmployee.save();
      return newEmployee;
    },
    updateEmployee: async (_, { id, input }) => {
        const updatedEmployee = await Employee.findByIdAndUpdate(id, input, { new: true });
        return updatedEmployee;
    },
    deleteEmployee: async (_, { id }) => {
        const deletedEmployee = await Employee.findByIdAndDelete(id);
        return deletedEmployee;
    }
  }
};

module.exports = resolvers;
