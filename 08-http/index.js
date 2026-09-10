import http from "http";

import {
    getHTML,
    getText,
    getComments,
    handleNotFound,
    postComment,
    getHome,
} from "./handlers.js";
const PORT = 5000;

const server = http.createServer((req, res) => {
    if (req.method === "GET" && req.url === "/") {
        res.statusCode = 200;
        return getHome(req, res);
    }

    if (req.method === "GET" && req.url === "/html") {
        return getHTML(req, res);
    }
    if (req.method === "GET" && req.url === "/text") {
        return getText(req, res);
    }
    if (req.method === "GET" && req.url === "/comments") {
        return getComments(req, res);
    }
    if (req.method === "POST" && req.url === "/comments") {
        return postComment(req, res);
    } else {
        return handleNotFound(req, res);
    }
});

server.listen(PORT, () => {
    console.log(`Server was luanched on port ${PORT}`);
});
