const myName = "Pavel";
const myHobbies = ["tanks", "guitar", "planes"];
const myFavoriteNumber = 77;

// module.exports = {
//     myName,
//     myHobbies,
//     myFavoriteNumber,
// };

console.log("text from multiple-exports.js file");

module.exports.myName = myName;
module.exports.myHobbies = myHobbies;
module.exports.myFavoriteNumber = myFavoriteNumber;
