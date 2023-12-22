const { REST } = require("@discordjs/rest");
const { Routes } = require('discord-api-types/v9');
const fs = require('fs');

const clientId = process.env.clientId; 

module.exports = (client) => {
    client.handleCommands = async (commandFolders, path) => {
        client.commandArray = [];
        for (folder of commandFolders) {
            const commandFiles = fs.readdirSync(`${path}/${folder}`).filter(file => file.endsWith('.js'));
            for (const file of commandFiles) {
                const command = require(`../commands/${folder}/${file}`);
                client.commands.set(command.data.name, command);
                client.commandArray.push(command.data.toJSON());
            }
        }

        const rest = new REST({
            version: '9'
        }).setToken(process.env.token);

        (async () => {
            try {
                console.log('Started refreshing application (/) commands.');

                if (process.env.serverId) {
                    await rest.put(
                        Routes.applicationGuildCommands(clientId, process.env.serverId), {
                            body: client.commandArray
                        },
                    );

                    await rest.put(
                        Routes.applicationCommands(clientId), {
                            body: []
                        },
                    );
                } else {
                    await rest.put(
                        Routes.applicationCommands(clientId), {
                            body: client.commandArray
                        },
                    );
                }

                console.log('Successfully reloaded application (/) commands.');
            } catch (error) {
                console.error(error);
            }
        })();
    };
};