const fetch = require("node-fetch");

module.exports = { getSongsList : async function() {
    let response = await fetch('https://openings.moe/api/list.php');
    let data = await response.json();
    return data;
    }
}