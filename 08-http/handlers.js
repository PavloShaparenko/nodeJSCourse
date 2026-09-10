import { comments } from "./data.js";
import fs from "fs";
const getHome = (req, res) => {
    fs.readFile("./files/comment-form.html", (err, data) => {
        if (err) {
            res.statusCode = 500;
            res.setHeader("Content-type", "text/plain");
            res.end("server error while loading html file");
        } else {
            res.statusCode = 200;
            res.setHeader("Content-type", "text/html");
            res.end(data);
        }
    });
};

const getHTML = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-Type", "text/html");
    res.write("<html><body><div>");
    res.write("<h1>Greetings from the HTTP server!</h1>");
    res.write("</div></body></html>");
    res.end();
};

const getText = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.end("this is plain text");
};

const getComments = (req, res) => {
    res.statusCode = 200;
    res.setHeader("Content-type", "text/plain");
    res.end(JSON.stringify(comments));
};

const handleNotFound = (req, res) => {
    res.statusCode = 404;
    res.setHeader("Content-type", "text/html");
    res.write("<html><body><div>");
    res.write("<h1>Your page not found :(</h1>");
    res.write("</div></body></html>");
    res.end();
};

const postComment = (req, res) => {
    res.setHeader("Content-type", "text/plain");
    if (req.headers["content-type"]?.startsWith("application/json")) {
        let commentJSON = "";

        req.on("data", (chunk) => (commentJSON += chunk));

        req.on("end", () => {
            try {
                const comment = JSON.parse(commentJSON);

                if (
                    comment === null ||
                    Array.isArray(comment) ||
                    typeof comment !== "object" ||
                    comment.id === undefined ||
                    typeof comment.text !== "string" ||
                    typeof comment.author !== "string"
                ) {
                    throw new Error("Invalid comment format");
                }

                comments.push(comment);
                res.statusCode = 200;
                res.end("comment was received");
            } catch (error) {
                res.statusCode = 400;
                res.end("Invalid comment format");
            }
        });
    } else {
        res.statusCode = 400;
        res.setHeader("Content-type", "text/html");
        res.write("<html><body><div>");
        res.write("<h1>Data must be in the JSON format :(</h1>");
        res.write("</div></body></html>");
        res.end();
    }
};

export { getHTML, getText, getComments, handleNotFound, postComment, getHome };
