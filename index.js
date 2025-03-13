const express = require('express');
const fs = require('node:fs');

const app = express();
const port = 3000;

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
  // res.send('Hello, world!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
