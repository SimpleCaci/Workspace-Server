const fs = require('fs/promises');
const path = require('path');
const express = require('express');

const app = express();
const port = Number(process.env.PORT) || 3000;
const messageFile = path.join(__dirname, 'allMessages.json');

app.use(express.static(path.join(__dirname, 'website')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json({ limit: '16kb' }));

async function readMessages() {
  try {
    const content = await fs.readFile(messageFile, 'utf8');
    const parsed = JSON.parse(content);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    if (error.code === 'ENOENT') return [];
    throw error;
  }
}

app.post('/messageSend', async (request, response) => {
  const { sender, receiver, message } = request.body;
  if (![sender, receiver, message].every((value) => typeof value === 'string' && value.trim())) {
    return response.status(400).json({ error: 'sender, receiver, and message are required' });
  }

  try {
    const messages = await readMessages();
    const entry = {
      sender: sender.trim(),
      receiver: receiver.trim(),
      message: message.trim(),
      createdAt: new Date().toISOString(),
    };
    messages.push(entry);
    await fs.writeFile(messageFile, JSON.stringify(messages, null, 2));
    return response.status(201).json(entry);
  } catch (error) {
    console.error('Could not save message:', error.message);
    return response.status(500).json({ error: 'Could not save message' });
  }
});

app.get('/messageView', async (_request, response) => {
  try {
    return response.json(await readMessages());
  } catch (error) {
    console.error('Could not read messages:', error.message);
    return response.status(500).json({ error: 'Could not read messages' });
  }
});

app.listen(port, () => {
  console.log(`Workspace Server listening on http://localhost:${port}`);
});
