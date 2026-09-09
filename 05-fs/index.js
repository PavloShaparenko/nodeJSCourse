const fs = require("fs");

fs.writeFile("./first.txt", "Text in 1 file", (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("file was written");
        fs.appendFile("./first.txt", "\nOne more line", (err) => {
            if (err) {
                console.log(err);
            } else {
                console.log("appended text");

                fs.rename("./first.txt", "./renamed-first.txt", (err) => {
                    if (err) {
                        console.log(err);
                    } else {
                        console.log("renamed first.txt");
                    }
                });
            }
        });
    }
});
