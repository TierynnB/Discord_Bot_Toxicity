module.exports = {
	name: 'avatar',
	description: 'avatar picture!',
	execute(message, args) {
			if (!message.mentions.users.size) {
			return message.channel.send(`Your avatar: <${message.author.displayAvatarURL({ format: "png", dynamic: true })}>`);
		}
		const avatarList = message.mentions.users.map(user => {
			return `<${user.displayAvatarURL({ format: "png", dynamic: true })}`;
		});
		message.channel.send(avatarList);
	},
};