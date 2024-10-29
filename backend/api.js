import http from "http";
import { request as _request } from "http";
import Db from "./db.js";
import generateShortURL from "./shortener.js";

/**
 * A sample URL object with a key, long URL, and short URL.
 * In a real application, this would be replaced with a database call.
 */
const url = {
  key: "h5i2bt2",
  longUrl: "https://www.google.com",
  shortUrl: "https://www.google.com",
};

/**
 * Stringify the URL object so that it can be sent in the request body.
 */
const data = JSON.stringify(url);

/**
 * A sample API token that will be sent in the Authorization header.
 * In a real application, this would be replaced with a secure token.
 */
const TOKEN = Buffer.from("TOKEN-12345").toString("base64");

/**
 * Options for the HTTP request to the API.
 * This includes the hostname, port, path, method, headers, and more.
 */
const options = {
  hostname: "localhost",
  port: 3000,
  path: "/api/urls",
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Content-Length": data.length,
    "X-Authorization": TOKEN,
  },
};

/**
 * Create an HTTP server that listens on port 3000.
 * The server will respond to requests to the root URL ("/") with a "Hello world!" message.
 * The server will also respond to requests to the "/shorten-url" URL with a POST request to the API.
 */
const server = http.createServer((req, res) => {
  /**
   * If the request is to the root URL, respond with a "Hello world!" message.
   */
  if (req.url === "/") {
    res.end("Hello world!");
  } else if (req.url === "/shorten-url" && req.method === "POST") {
    /**
     * Create an HTTP request to the API using the options above.
     * The request will be sent with the data stringified above.
     * The request will also have an Authorization header with the token above.
     */
    const request = _request(options, (response) => {
      console.log("Response Status Code :>> ", response.statusCode);

      /**
       * When the response is received, save the data to local storage.
       * This is a very simple example of how to store data in a database.
       * In a real application, you would want to use a more robust database like MongoDB or PostgreSQL.
       */
      response.on("data", (chunk) => {
        Db.saveToStorage("urls", chunk.toString());
        console.log(`Data arrived: ${chunk.toString()}`);
      });

      response.on("end", () => {
        console.log("Response finished.");
      });

      response.on("error", (err) => {
        console.log("Response error :>> ", err);
      });
    });

    request.on("error", (err) => {
      console.error("Request error :>> ", err);
    });

    /**
     * Write the data to the request body and end the request.
     * This will send the request to the API.
     */
    request.write(data);
    request.end();
    res.end("URL request sent!");
  }
});

/**
 * Start the server listening on port 3000.
 * This will start the server and make it available at localhost:3000.
 */
server.listen(3000, () => {
  console.log("Server started on localhost:3000!");
});
