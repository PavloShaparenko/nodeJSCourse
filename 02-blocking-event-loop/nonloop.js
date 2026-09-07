let isRunning = true;

setTimeout(() => {
    isRunning = false;
},40);


process.nextTick(() => {
    console.log('Next tick 1');
});




const setImmediatePromise = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('Immediate Promise Resolved');
            console.log('Immediate Promise Resolved');
        }, 0);
    });
}


async function whileLoop() {

    while (isRunning) {
        console.log('Looping...');
        await setImmediatePromise()
    }
}

whileLoop()
.then (() => {
    console.log('Loop finished');
})  
