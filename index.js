// require the discord.js module
const Discord = require('discord.js');

// create a new Discord client
const client = new Discord.Client();

const config = require('./config.json');

const { prefix, token } = require('./config.json');

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});


client.on('message', message => {

	if (!message.content.startsWith(prefix) || message.author.bot) return;

	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const command = args.shift().toLowerCase();

	if (command.includes(`woah`)) {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('Nice Cock');
	}	
	else if (command.includes('tierynn') && message.content.includes('rune') ) {
		// send back "Pong." to the channel the message was sent in
		message.channel.send('What are runes?');
	}	
	//server info command
	else if (command === `server`) {
		message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nCreated At: ${message.guild.createdAt}`)
	}
	// user info
	else if (command === `user-info`) {
		message.channel.send(`User name: ${message.author.username}\nYour ID: ${message.author.id}`)
	}
	else if (command === 'args-info') {
		if (!args.length) {
			return message.channel.send(`You didn't provide any arguments, ${message.author}!`);
		}
		 
		message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	}
	else if (command === 'kick') {
		if (!message.mentions.users.size){
			return message.reply('you need to tag a user in order to kick them!');
		}
		const taggedUser = message.mentions.users.first();

		message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	}
	// user avatar
	else if (command === 'avatar') {
		if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
		}
		const avatarList = message.mentions.users.map(user => {
			return `<${user.displayAvatarURL({ format: "png", dynamic: true })}`;
		});
		message.channel.send(avatarList);
	}
});

// login to Discord with your app's token
client.login(token);