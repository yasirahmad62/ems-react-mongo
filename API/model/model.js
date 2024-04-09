const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  dateOfJoining: { type: Date, required: true },
  age: { type: Number, required: true, min: 20, max: 70 },
  title: { type: String, required: true, enum: ['Employee', 'Manager', 'Director', 'VP'] },
  employeeType: { type: String, required: true, enum: ['FullTime', 'PartTime', 'Contract', 'Seasonal'] },
  
  department: { type: String, required: true, enum: ['IT', 'Marketing', 'HR', 'Engineering'] },
  
  currentStatus: { type: Boolean, default: true } 
});

module.exports = mongoose.model('EmployeeData', employeeSchema);
