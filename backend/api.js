import http from "http";
import { request as _request } from "http";
import Db from "./db.js";
import generateShortURL from "./shortener.js";

const url = {
  key: 'h5i2bt2',
  longUrl: 'https://www.google.com',
  shortUrl: 'https://www.google.com'
};

const data = JSON.stringify(url);

// const TOKEN = Buffer.from('TOKEN-12345').toString('base64')

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/urls',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
    // 'Content-Length': data.length,
    // 'X-Authorization': TOKEN
  }
}

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    res.end('Hello world!')
  }

  const request = _request(
    options, (response) => {
    console.log('Response Status Code :>> ', response.statusCode);
  
    response.on('data', (chunk) => {
      Db.saveToStorage('urls', chunk.toString())
      console.log(`Data arrived: ${chunk.toString()}`);
    });
  
    response.on('error', (err) => {
      console.log('Response error :>> ', err);
    })
  
  });
  
  request.write(data);
  
  request.end();
})


server.listen(3000, () => {
  console.log("Server started on localhost:3000!");
});
