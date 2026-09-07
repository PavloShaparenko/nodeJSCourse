let isRunning = true;

setTimeout(() => {
    isRunning = false;
},0);


process.nextTick(() => {
    console.log('Next tick 1');
});

while (isRunning) {
  console.log('Looping...');
}