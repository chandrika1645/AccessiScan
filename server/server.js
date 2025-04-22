const express = require('express');
const app = express();
const analyzeRoutes = require('./src/routes/analyze');

const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/api/analyze', analyzeRoutes);

app.get('/', (req, res) => {
  res.send('Welcome to the Website Analyzer API');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});