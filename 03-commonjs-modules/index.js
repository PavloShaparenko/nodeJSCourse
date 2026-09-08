const { myName, myHobbies, myFavoriteNumber } = require("./multiple-exports");
const greetingFn = require("./my-modules/single-export");
const {
    myFriendsName,
    myName: myOtherName,
    myGreaetHobbies,
} = require("./export-and-import");

console.log(myOtherName);
myHobbies.push("programming");
console.log(myGreaetHobbies);
console.log(myFavoriteNumber);

greetingFn(myFriendsName);
