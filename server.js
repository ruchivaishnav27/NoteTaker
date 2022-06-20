const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require('./apiRoutes/notesRoutes');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('notes'));

// Use apiRoutes
app.use('/api', apiRoutes);

app.listen(PORT, () => {
  console.log(`API server now on port ${PORT}!`);
});
