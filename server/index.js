const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();
const port = 8000; // Choose the port you want to run the server on
app.use(cors({
    origin: '*'
}))
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!');
})

app.get('/jobs', async (req, res) => {
  try {
    console.log("hitting server")
    const { query} = req.query;
    console.log(query)
    
    console.log(query)

    const serpApiUrl = 'https://serpapi.com/search';
    const response = await axios.get(serpApiUrl, {
      params: {
  api_key: "caf2c4d5ec02b154ee0c4679ef19a7de35dbce63fe0df25389e7015bc0b966bb",
  engine: "google_shopping",
  lrad: "0",
  q: query,
  google_domain: "google.com",
  gl: "in"
}
    });

    res.json(response.data);
  } catch (error) {
    console.error('Error fetching data from SerpAPI:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});