const express = require('express');
const fs = require('node:fs');

const app = express();

if (!process.env.PORT) {
  throw new Error(
    'Please specify the port number for the HTTP server with the environment variable PORT.',
  );
}
const PORT = process.env.PORT;

app.get('/video', (_, res) => {
  const path = './videos/SampleVideo_1280x720_1mb.mp4';
  fs.stat(path, (err, stats) => {
    if (err) {
      console.error('An error occurred');
      console.error(err);
      res.sendStatus(500);
      return;
    }

    res.writeHead(200, {
      'Content-Length': stats.size,
      'Content-Type': 'video/mp4',
    });

    fs.createReadStream(path).pipe(res);
  });
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
