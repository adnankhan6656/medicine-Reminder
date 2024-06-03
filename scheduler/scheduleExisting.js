const db = require('../models/index');
const Medication=db.Medication;
const { scheduleMedication } = require('./scheduleMedication');

// Schedule Existing Medications
const scheduleExistingMedications = async () => {
  const medications = await db.Medication.findAll();
  medications.forEach(medication => {
    scheduleMedication(medication);
  });
};

module.exports = scheduleExistingMedications;