const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

// PASTE YOUR LOGIN TOKEN HERE (from Day 2 login test)
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNzczMDMyMGJhOGY4M2M4NDc1M2YwNSIsImlhdCI6MTc4NjczOTI4NiwiZXhwIjoxNzg3MzQ0MDg2fQ.TWRVtXriLfuSTo9RzYz2ThMQe1RXPWxBYU1yHk8aV6g";

const form = new FormData();
form.append('resume', fs.createReadStream('./AASHI MISHRA_CSDS A_RESUME.pdf'));

axios
  .post('http://localhost:5000/api/resume/upload', form, {
    headers: {
      ...form.getHeaders(),
      Authorization: `Bearer ${TOKEN}`,
    },
  })
  .then((response) => {
    console.log('SUCCESS:');
    console.log(response.data);
  })
  .catch((error) => {
    console.log('ERROR:');
    console.log(error.response ? error.response.data : error.message);
  });