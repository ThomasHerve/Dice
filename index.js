const fs = require('node:fs');
const path = require('node:path');
const { Client, Events, GatewayIntentBits } = require('discord.js');
const { token, gmId } = require('./config.json');

const client = new Client({ intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent] });

client.once(Events.ClientReady, c => {
	console.log(`Ready, connected as ${c.user.tag}`);
});

client.on(Events.MessageCreate, async message => {
	if (message.content.startsWith("/roll"))
	{
		var total = 0;
		var txt = "";
		var msg = message.content.substring(6).split('+');
		for (var i = 0; i < msg.length; i++)
		{
			if (i > 0)
				txt += "+ ";
			msg[i] = msg[i].trim().toUpperCase();
			if (msg[i].includes('D'))
			{
				const dice = msg[i].split('D');
				const dices = parseInt(dice[0]);
				const faces = parseInt(dice[1]);
				txt += "( ";
				for (var j = 0; j < dices; j++)
				{
					const res = Math.floor(Math.random() * faces) + 1;
					total += res;
					txt += res + " ";
					if (j < dices - 1)
						txt += "+ ";
				}
				txt += ") ";
			}
			else
			{
				txt += msg[i] + " ";
				total += parseInt(msg[i]);
			}
		}
		message.reply(total + "\n" + txt);
	}
	if (message.content.startsWith("/gmroll")) {
		var total = 0;
		var txt = "";
		var msg = message.content.substring(8).split('+');
		for (var i = 0; i < msg.length; i++)
		{
			if (i > 0)
				txt += "+ ";
			msg[i] = msg[i].trim().toUpperCase();
			if (msg[i].includes('D'))
			{
				const dice = msg[i].split('D');
				const dices = parseInt(dice[0]);
				const faces = parseInt(dice[1]);
				txt += "( ";
				for (var j = 0; j < dices; j++)
				{
					const res = Math.floor(Math.random() * faces) + 1;
					total += res;
					txt += res + " ";
					if (j < dices - 1)
						txt += "+ ";
				}
				txt += ") ";
			}
			else
			{
				txt += msg[i] + " ";
				total += parseInt(msg[i]);
			}
		}
		client.users.fetch(gmId, false).then((user) => {
			user.send(message.author.displayName + " rolled a " + total + "\n" + txt);
		});
	}
});

client.login(token);
