const express = require('express')
const router = express.Router()
const Employee = require('../models/employee')

//Get all Employees
router.get('/',async(req,res) => {
   const employees = await Employee.find()
   res.json(employees)
})
// Get employee by ID
router.get('/:id', async (req, res) => {
   try {
     const employee = await Employee.findById(req.params.id);
     if (employee) {
       res.json(employee);
     } else {
       res.status(404).json({ message: 'Employee not found' });
     }
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 });
router.post('/',async(req,res) => {
   const employee = new Employee({
      name: req.body.name,
      age: req.body.age,
      designation: req.body.designation,
      bloodgroup: req.body.bloodgroup,
      fathername: req.body.fathername,
      experience: req.body.experience
   })
   try{
      const a1 = await employee.save()
      res.json(a1)

   }
   catch(err){
      res.json("Error")
   }
})
//Update employee
router.patch('/:id', async (req, res) => {
   try {
     const employee = await Employee.findById(req.params.id);
     if (employee) {
       Object.assign(employee, req.body);
       await employee.save();
       res.json(employee);
     } else {
       res.status(404).json({ message: 'Employee not found' });
     }
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 });
// Delete an employee by ID
router.delete('/:id', async (req, res) => {
   try {
     const employee = await Employee.findById(req.params.id);
     if (employee) {
       await employee.deleteOne(); // or use await Employee.findByIdAndDelete(req.params.id);
       res.json({ message: 'Employee deleted' });
     } else {
       res.status(404).json({ message: 'Employee not found' });
     }
   } catch (error) {
     res.status(500).json({ message: error.message });
   }
 });

module.exports = router
