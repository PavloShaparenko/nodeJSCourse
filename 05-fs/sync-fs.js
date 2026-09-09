const fs = require("fs");

//not recommended
try {
    fs.writeFileSync("./first3.txt", "Text in 3 file");
    console.log("file was written");
    fs.appendFileSync("./first3.txt", "\nOne more 3 line");
    console.log("appended text");
    fs.renameSync("./first3.txt", "./renamed3-first.txt");
    console.log("renamed3 first.txt");
} catch (err) {
    console.log(err);
}
