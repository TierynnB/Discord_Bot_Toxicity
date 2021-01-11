// require the discord.js module
const fs = require('fs');
const Discord = require('discord.js');
const config = require('./config.json');
const { prefix, token } = require('./config.json');
const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
const client = new Discord.Client();

client.commands = new Discord.Collection();

// get list of commands from commands folder
for (const file of commandFiles){
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// when the client is ready, run this code
// this event will only trigger one time after logging in
client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', message => {

	// command must be prefixed
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	//trims away the prefix and makes lower case.
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// checks it is one of the defined commands
	if (!client.commands.has(commandName)) return;

	try {
		// dynamically read the command (using either name or alias)
		const command = client.commands.get(commandName) 
			|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
			
		if (!command) { return message.reply('this command doesnt exist');}

		// check arguments are provided
		if (command.args && !args.length) {
			reply = `You didn't provide any arguments, ${message.author}!`;
			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}
			return message.channel.send(reply);
		}
		//execute the command
		command.execute(message,args);

	} catch (error) {
		console.error(error);
		message.reply('there was an error trying to execute that command!');
	}


	// // user info
	// else if (command === `user-info`) {
	// 	message.channel.send(`User name: ${message.author.username}\nYour ID: ${message.author.id}`)
	// }

		 
	// 	message.channel.send(`Command name: ${command}\nArguments: ${args}`);
	// }
	// else if (command === 'kick') {
	// 	if (!message.mentions.users.size){
	// 		return message.reply('you need to tag a user in order to kick them!');
	// 	}
	// 	const taggedUser = message.mentions.users.first();

	// 	message.channel.send(`You wanted to kick: ${taggedUser.username}`);
	// }
	// // user avatar
	// else if (command === 'avatar') {
	// 	if (!message.mentions.users.size) {
	// 		return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
	// 	}
	// 	const avatarList = message.mentions.users.map(user => {
	// 		return `<${user.displayAvatarURL({ format: "png", dynamic: true })}`;
	// 	});
	// 	message.channel.send(avatarList);
	// }

});

// login to Discord with your app's token
client.login(token);