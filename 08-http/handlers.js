import { comments } from "./data.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const commentFormPath = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    "files",
    "comment-form.html",
);
const maxBodySize = 1024 * 1024;

const getHome = (req, res) => {
    fs.readFile(commentFormPath, (err, data) => {
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
    res.setHeader("Content-Type", "application/json; charset=utf-8");
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
    let bodySize = 0;

    const rejectOversizedBody = (chunk) => {
        bodySize += chunk.length;
        if (bodySize > maxBodySize) {
            res.statusCode = 413;
            res.end("Request body is too large");
            req.destroy();
            return true;
        }
        return false;
    };

    if (
        req.headers["content-type"]?.startsWith(
            "application/x-www-form-urlencoded",
        )
    ) {
        let body = "";
        req.on("data", (chunk) => {
            if (rejectOversizedBody(chunk)) return;
            body += chunk.toString();
        });
        req.on("end", () => {
            const formData = new URLSearchParams(body);
            const comment = {
                id: Number(formData.get("id")),
                author: formData.get("author")?.trim(),
                text: formData.get("text")?.trim(),
            };

            if (!isValidComment(comment)) {
                res.statusCode = 400;
                return res.end("Invalid comment format");
            }

            comments.push(comment);
            res.statusCode = 201;

            res.setHeader("Content-type", "text/html");

            res.write("<html><body><div>");
            res.write("<h1>Comment data was received</h1>");
            res.write('<a href="/">Submit one more comment</a>');
            res.write("</div></body></html>");
            res.end();
        });
    } else if (req.headers["content-type"]?.startsWith("application/json")) {
        let commentJSON = "";

        req.on("data", (chunk) => {
            if (rejectOversizedBody(chunk)) return;
            commentJSON += chunk.toString();
        });

        req.on("end", () => {
            try {
                const comment = JSON.parse(commentJSON);

                if (!isValidComment(comment)) {
                    throw new Error("Invalid comment format");
                }

                comments.push(comment);
                res.statusCode = 201;
                res.end("comment was received");
            } catch (error) {
                res.statusCode = 400;
                res.end("Invalid comment format");
            }
        });
    } else {
        res.statusCode = 400;
        res.setHeader("Content-type", "text/html");
        res.end("Data must be in the JSON format :");
    }
};

const isValidComment = (comment) =>
    comment !== null &&
    !Array.isArray(comment) &&
    typeof comment === "object" &&
    Number.isInteger(comment.id) &&
    comment.id >= 0 &&
    typeof comment.text === "string" &&
    comment.text.trim().length > 0 &&
    typeof comment.author === "string" &&
    comment.author.trim().length > 0 &&
    !comments.some((existingComment) => existingComment.id === comment.id);

export { getHTML, getText, getComments, handleNotFound, postComment, getHome };
