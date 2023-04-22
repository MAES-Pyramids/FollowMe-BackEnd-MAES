const fs = require('fs');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const Doctor = require('../../models/doctorsModel');
const Student = require('./../../models/studentsModel');
//-------------------Config----------------//
dotenv.config({ path: './config.env' });
//--------------------DB-------------------//
const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(console.log('DB connection successful!'));
//------------------Read_File----------------//
const students = JSON.parse(
  fs.readFileSync(`${__dirname}/students.json`, 'utf-8')
);
const doctors = JSON.parse(
  fs.readFileSync(`${__dirname}/doctors.json`, 'utf-8')
);
//--------------------CRUD------------------//
// Import data into DB
async function importData() {
  try {
    await Student.create(students);
    await Doctor.create(doctors);
    console.log('Data successfully loaded!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}
// Delete all data from DB
async function deleteData() {
  try {
    await Student.deleteMany();
    await Doctor.deleteMany();
    console.log('Data successfully deleted!');
  } catch (err) {
    console.log(err);
  }
  process.exit();
}
// process.argv to check passed arguments
if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
