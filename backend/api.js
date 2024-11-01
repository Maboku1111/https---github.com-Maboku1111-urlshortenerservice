import http from "http";
import { request as _request } from "http";
import Db from "./db.js";
import generateShortURL from "./shortener.js";

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    res.end('Hello world!');
  } else if (req.url === '/shorten-url' && req.method === 'POST') {
    let body = '';

    // Step 1: Collect data in chunks
    req.on('data', (chunk) => {
      body += chunk;
    });

    // Step 2: Once all data is received, process it
    req.on('end', () => {
      try {
        const requestData = JSON.parse(body); // Parse JSON from client
        const long_url = requestData.long_url; // Access long_url sent by client
        const short_key = generateShortURL(long_url); // Generate short key

        const responseObject = {
          key: short_key,
          long_url: long_url,
          short_url: `http://localhost:3000/${short_key}`
        };

        // Step 3: Save to storage
        Db.saveToStorage("urls", responseObject);

        // Step 4: Send JSON response back to client
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(responseObject));
      } catch (error) {
        // Handle parsing errors or other issues
        res.writeHead(400, { "Content-Type": "application/json" });
        res.end(JSON.stringify({ error: "Invalid JSON data received" }));
      }
    });
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server started on localhost:3000!");
});
