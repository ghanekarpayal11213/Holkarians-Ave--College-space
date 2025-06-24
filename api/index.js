const app  = require('../index')
module.exports = app

import cors from 'cors';

app.use(cors({
  origin: "https://holkarians-ave-college-space.vercel.app/",  
  credentials: true
}));
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
