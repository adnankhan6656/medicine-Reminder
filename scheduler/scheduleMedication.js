const cron = require('node-cron');
const nodemailer = require('nodemailer');
const db=require("../models/index.js");
const { Op } = require('sequelize');
const moment=require("moment");
const Medication=db.Medication;


// Setup nodemailer
const transporter = nodemailer.createTransport({
  service:'gmail',
  port: 465,
  host: "smtp.gmail.com",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_PASS
  }
});

// Function to send email
const sendEmail = async (medication) => {
  const mailOptions = {
    from: process.env.GMAIL_USER,
    to: 'b',
    subject: `Medication Reminder: ${medication.name}`,
    text: `It's time to take your medication: ${medication.name}\nDescription: ${medication.description}`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Email has been sent`);
  } catch (error) {
    console.error(`Error While Sending Email`);
  }
};

// Schedule One Time Medication
const scheduleOneTimeMedication = (medication) => {
  const time = new Date(medication.date);
  cron.schedule(time, () => sendEmail(medication));
};

// Schedule Recurring Medication
const scheduleRecurringMedication = (medication) => {
  let cronExpression;
  if (medication.frequency === 'Daily') {
    cronExpression = `0 ${medication.time.split(':')[1]} ${medication.time.split(':')[0]} * * *`;
  } else if (medication.frequency === 'Weekly') {
    const dayOfWeekMap = {
      'Sunday': 0,
      'Monday': 1,
      'Tuesday': 2,
      'Wednesday': 3,
      'Thursday': 4,
      'Friday': 5,
      'Saturday': 6
    };
    const dayOfWeek = dayOfWeekMap[medication.dayOfWeek];
    cronExpression = `0 ${medication.time.split(':')[1]} ${medication.time.split(':')[0]} * * ${dayOfWeek}`;
  }
  cron.schedule(cronExpression, () => sendEmail(medication));
};

// Schedule Medication
const scheduleMedication = async() => {
try{
  cron.schedule("* * * * *",async()=>{
    const currentTime = moment();
    console.log(currentTime);
  const medications = await Medication.findAll({
    where: {
      startDate: {
        [Op.lte]: currentTime
      },
      endDate: {
        [Op.gte]: currentTime
      },
      
    }
  });
      console.log(medications)
      medications.forEach((medication)=>{
        if(medication.recurring==='one time'){
           console.log("hi")
          scheduleOneTimeMedication(medication);
        }
        else{
          scheduleRecurringMedication(medication);
        }
      })
  })
  // 
}
catch(error){
  console.log(error);
}
};

module.exports = {
  scheduleMedication
};