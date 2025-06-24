const app  = require('../index')
module.exports = app

import cors from 'cors';

app.use(cors({
  origin: "https://holkarians-ave-college-space.vercel.app/",  
  credentials: true
}));
