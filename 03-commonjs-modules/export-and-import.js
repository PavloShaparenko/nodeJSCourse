const { myName, myHobbies } = require("./multiple-exports");
const myFriendsName = "Kolya";

module.exports.myFriendsName = myFriendsName;
module.exports.myName = myName;
module.exports.myGreaetHobbies = myHobbies;
