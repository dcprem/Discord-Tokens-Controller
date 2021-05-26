const Discord = require("discord.js");
const axios = require("axios");

async function execute() {
	const tokens = [
	    ...new Set(require("fs")
	        .readFileSync("./files/tokens.txt", "utf-8")
	        .replace(/\r/g, "")
	        .split("\n")),
	];

    let images = [];

    let page = Math.floor(Math.random() * 990) + 10;
    let maxPage = page + 10;

    for (page; page < maxPage; page++) {
        let response = await axios.get(`https://avatars.alphacoders.com/by_category/3?page=${page}`);
        response.data.match(/https:\/\/avatarfiles\.alphacoders\.com\/[0-9]+\/thumb-[0-9]+\.(png|jpg)/gm).forEach(image => images.push(image));
    }

	tokens.forEach(function(token) {
		const client = new Discord.Client();

		const status = array_rand(["dnd", "online", "idle"]);
		const avatar = array_rand(images);

		client.on("ready", () => {
		  	console.log(`Logged in as ${client.user.tag} (${status}) !`);

			client.user.setPresence({
				status: status
			});

			console.log(avatar);
			client.user.setAvatar(avatar); // if you do not want change avatar, delete this line 
			// Besides, this line can lock the accounts if they are too young!
		});

		client.login(token);
	});

	tokens.forEach(function(token) {
		const client = new Discord.Client();
		client.login(token);
	});
}

function array_rand(array) {
    let num = Math.floor(Math.random() * array.length);
    return array[(num)];
}

execute();
