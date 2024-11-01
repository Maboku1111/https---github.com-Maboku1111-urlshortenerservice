import http from "http";
import { request as _request } from "http";
import Db from "./db.js";
import generateShortURL from "./shortener.js";

// const url = {
//   key: 'h5i2bt2',
//   longUrl: 'https://www.google.com',
//   shortUrl: 'https://www.google.com'
// };

// const data = JSON.stringify(url);

// const TOKEN = Buffer.from('TOKEN-12345').toString('base64')

// const options = {
//   hostname: 'localhost',
//   port: 3000,
//   path: '/shorten-url',
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json',
//     'Content-Length': data.length,
//     'X-Authorization': TOKEN
//   }
// }

const server = http.createServer((req, res) => {
  if (req.url === "/") {
    res.end("Hello world!");
  } else if (req.url === "/shorten-url" && req.method === "POST") {
    const long_url = "https://github.com/pmndrs/zustand/discussions/1799";

    const responseData = {
      key: Date.now(),
      long_url: "https://github.com/pmndrs/zustand/discussions/1799",
      short_url: "http://ezrahcodes.com/" + generateShortURL(long_url),
    };

    const jsonContent = JSON.stringify(responseData);
    Db.saveToStorage("urls", jsonContent);
    res.end(jsonContent);

    // res
    //   .writeHead(
    //     200, {
    //       'Content-Type': 'application/json'
    //     }
    // )
    // const url = "https://github.com/pmndrs/zustand/discussions/1799";
    // const generatedLink = generateShortURL(url);
    // Db.saveToStorage('short_url', generatedLink);
    // res.end(generatedLink)

    // const request = _request(options, (response) => {
    //   console.log('Response Status Code :>> ', response.statusCode);

    //   response.on('data', (chunk) => {
    //     Db.saveToStorage('urls', chunk.toString())
    //     console.log(`Data arrived: ${chunk.toString()}`);
    //   });

    //   response.on('error', (err) => {
    //     console.log('Response error :>> ', err);
    //   })

    // });

    // request.write(data);

    // request.end();
  }
});

server.listen(3000, () => {
  console.log("Server started on localhost:3000!");
});
