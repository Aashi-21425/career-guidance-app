const axios = require('axios');

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNzczMDMyMGJhOGY4M2M4NDc1M2YwNSIsImlhdCI6MTc4Njc4NzA3OCwiZXhwIjoxNzg3MzkxODc4fQ.7Mg6_Mr2qOfBl-YL3_iFsyJaxDO0LAKCgJ0pog9eweU";

axios
  .get('http://localhost:5000/api/analysis/history', {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })
  .then((res) => {
    console.log('SUCCESS:');
    console.log(JSON.stringify(res.data, null, 2));
  })
  .catch((err) => {
    console.log('ERROR:');
    console.log(err.response ? err.response.data : err.message);
  });