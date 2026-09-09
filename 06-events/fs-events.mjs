import { EventEmitter } from "events";
import fs from "fs";
const fileEmitter = new EventEmitter();

const filePath = "./first4.txt";

fileEmitter.on("writeComplete", () => {
    console.log("file4 was written");
    fs.appendFile(filePath, "\nOne more 4 line", () => {
        fileEmitter.emit("appendComplete");
    });
});

fileEmitter.on("appendComplete", () => {
    console.log("appended text");
    fs.rename(filePath, "./renamed4-first.txt", () => {
        fileEmitter.emit("renameComplete");
    });
});

fileEmitter.on("renameComplete", () => {
    console.log("renamed4 first.txt");
});

fs.writeFile(filePath, "Text in 4 file", () => {
    fileEmitter.emit("writeComplete");
});
