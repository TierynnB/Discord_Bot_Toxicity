module.exports = {
    name: 'server',
    aliases: ['system', 'channel'],
	description: 'return server information',
	execute(message, args) {
        message.channel.send(
            `Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}\nCreated At: ${message.guild.createdAt}`)
        
	},
};