const fs = require("fs/promises");

fs.writeFile("./first2.txt", "Text in 2 file")
    .then(() => console.log("file was written"))
    .then(() => fs.appendFile("./first2.txt", "\nOne more 2 line"))
    .then(() => console.log("appended text"))
    .then(() => fs.rename("./first2.txt", "./renamed2-first.txt"))
    .then(() => console.log("renamed2 first.txt"))
    .catch((err) => console.log(err));
