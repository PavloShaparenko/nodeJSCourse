import stream from "stream";
import fs from "fs";
// const filePath = "./files/stdin-dump.txt";

function reverseString(str) {
    return str.split("").reverse().join("");
}

// //pipe to file
// const writeStream = fs.createWriteStream(filePath);
// process.stdin.pipe(writeStream);

// //pipe to stdout
// process.stdin.pipe(process.stdout);

const upperCaseStream = new stream.Transform({
    transform: function (chunk, encoding, cb) {
        const result = reverseString(chunk.toString()).toUpperCase() + "\n";
        cb(null, result);
    },
});

process.stdin.pipe(upperCaseStream).pipe(process.stdout);
