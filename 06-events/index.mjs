import { EventEmitter } from "events";

const myEmitter = new EventEmitter();

const timeoutListenerFn = (secondsQty) => {
    console.log(`timeout event in ${secondsQty} seconds `);
};
myEmitter.on("timeout", timeoutListenerFn);

myEmitter.emit("timeout", 0);

setTimeout(() => myEmitter.emit("timeout", 1), 1000);

myEmitter.once("singleEvent", () => {
    console.log("single event ");
});

setTimeout(() => myEmitter.emit("singleEvent"), 2000);

setTimeout(() => myEmitter.emit("singleEvent"), 2000);

setTimeout(() => myEmitter.off("timeout", timeoutListenerFn), 3000);
setTimeout(() => myEmitter.emit("timeout", 4), 4000);
