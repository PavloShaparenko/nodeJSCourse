const fs = require("fs");
const dns = require("dns");
const { error, time } = require("console");

// Helper to print a label with a timestamp for easier event-loop ordering
function info(text) {
    console.log(text, performance.now().toFixed(3));
}

// Synchronous work runs first
info("program start");

// Timers are processed in the timer phase
setTimeout(() => info("timeout 1"), 0);
setTimeout(() => {
    // nextTick runs before the next event loop phase
    process.nextTick(() => info("Next tick 2"));
    info("timeout 2");
}, 100);

// Microtasks (Promises) run before the next timer phase
Promise.resolve().then(() => info("promise 1"));

// File I/O callback runs after the current phase completes
fs.writeFile("./test.txt", "Hello Node.js", () => info("file created"));

// nextTick callbacks have priority over other queued work
process.nextTick(() => info("Next tick 1"));
info("program end");

let intervalCount = 0;
const intervalId = setInterval(() => {
    console.log(
        `Interval ${(intervalCount += 1)}`,
        performance.now().toFixed(3),
    );
    if (intervalCount == 5) clearInterval(intervalId);
}, 50);

// DNS lookup uses async I/O and runs in the appropriate callback phase
dns.lookup("localhost", (err, addrees, family) => {
    console.log("DNS 1 localhost", addrees, performance.now().toFixed(3));
    Promise.resolve().then(() => info("promise 2"));

    process.nextTick(() => info("next tick 3"));
});

// setImmediate callbacks run in the check phase
setImmediate(() => info("immediate "));
