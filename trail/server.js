const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const messagesFile = path.join(__dirname, 'messages.json');

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const newMessage = { name, email, message, date: new Date().toISOString() };
  let messages = [];
  if (fs.existsSync(messagesFile)) {
    messages = JSON.parse(fs.readFileSync(messagesFile));
  }
  messages.push(newMessage);
  fs.writeFileSync(messagesFile, JSON.stringify(messages, null, 2));
  res.json({ success: true });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 