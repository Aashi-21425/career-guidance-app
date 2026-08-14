const axios = require('axios');

// PASTE YOUR LOGIN TOKEN HERE
const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjZhNzczMDMyMGJhOGY4M2M4NDc1M2YwNSIsImlhdCI6MTc4NjY1NzA2NywiZXhwIjoxNzg3MjYxODY3fQ.OYFx1EtG2mJA-9JdHQjqRky7n2d1uiqsq193D89Ue40";

// PASTE THE RESUME _id FROM DAY 3'S SUCCESS RESPONSE
const RESUME_ID = '6a7f7b580d28142a596572bc';

axios
  .post(
    'http://localhost:5000/api/analysis/analyze',
    { resumeId: RESUME_ID, targetRole: 'Full Stack Developer' },
    { headers: { Authorization: `Bearer ${TOKEN}` } }
  )
  .then((res) => {
    console.log('SUCCESS:');
    console.log(JSON.stringify(res.data, null, 2));
  })
  .catch((err) => {
    console.log('ERROR:');
    console.log(err.response ? err.response.data : err.message);
  });