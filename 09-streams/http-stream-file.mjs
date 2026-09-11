import http from "http";
import fs from "fs";

const filePath = "./files/index.html";
const server = http.createServer((req, res) => {
    //with streams
    if (req.url === "/" && req.method === "GET") {
        const readStrem = fs.createReadStream(filePath);
        res.statusCode = 200;
        res.setHeader("Content-type", "text/html");
        readStrem.pipe(res);
    }
    //without streams
    if (req.url === "/no-stream" && req.method === "GET") {
        fs.readFile(filePath, (err, data) => {
            if (err) {
                res.statusCode = 500;
                res.end("error reading dile on server");
            } else res.statusCode = 200;
            res.setHeader("Content-type", "text/html");
            res.end(data);
        });
    }
});

server.listen(5000, () => {
    console.log("server started at port 5000");
});
