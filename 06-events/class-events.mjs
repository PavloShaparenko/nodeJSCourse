import EventEmitter from "events";

class Post extends EventEmitter {
    constructor(author, text) {
        super();
        this.author = author;
        this.text = text;
        this.likesQty = 0;
        this.on("liked", (username) => {
            console.log(`${username} liked your post`);
        });
        this.on("error", (error) => {
            console.error(error.message);
            console.log(`othername liked your post`);
        });
    }

    like(username) {
        if (!username) {
            const err = new Error(
                "\n !!!ERROR : no username in the liked post!!!! \n",
            );
            this.emit("error", err);
            username = "othername";
            return;
        }
        this.likesQty++;
        this.emit("liked", username);
    }
}

const myPost = new Post("Pavel", "Real Madrid - the best footbal club");

console.log(myPost.author);
console.log(myPost.text);
console.log(myPost.likesQty);

myPost.like("Oleh");
myPost.like();
console.log(myPost.likesQty);

setTimeout(() => {
    for (let i = 0; i < 15; i++) {
        myPost.like("noname");
    }
}, 3000);

setTimeout(() => console.log(myPost.likesQty), 3500);
