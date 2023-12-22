const { Events } = require('discord.js');
const chalk = require('chalk');
const mongoose = require('mongoose');
const { table } = require("table");

function progressBar(progress) {
    const width = 20;
    const percentage = Math.floor(progress / 100 * width);
    const progressBar = `${'='.repeat(percentage)}${' '.repeat(width - percentage)}`;
    return `[${progressBar}] ${progress}%`;
}

module.exports = {
    name: Events.ClientReady,
    once: true,
    async execute(client, interaction) {

        console.log(chalk.bold("Connexion à la base de données..."));

        try {
            let progress = 10;
            const progressUpdateInterval = 10; // Increase to set more frequent updates
            const maxProgress = 100;

            while (progress <= maxProgress) {
                console.log(chalk.yellow.bold(`Connexion à la base de données: ${progressBar(progress)}`));
                await new Promise(resolve => setTimeout(resolve, 500)); // Increased to 0.5 second delay
                progress += progressUpdateInterval;
            }

            await new Promise(resolve => setTimeout(resolve, 1000)); // Increased to 1 second delay

            mongoose.connection.on('connexion', () => {
                console.log(chalk.gray.bold('Connexion à la base de données : tentative de connexion...'));
            });

            mongoose.connection.on('connecté', () => {
                console.log(chalk.green.bold('Connexion à la base de données : ✅ Connecté'));
            });

            mongoose.connection.on('erreur', (error) => {
                console.error(chalk.red.bold('Erreur de connexion à la base de données:', error.message));
            });

            mongoose.connection.on('déconnecté', () => {
                console.log(chalk.red.bold('Connexion à la base de données : ❌ Déconnecté'));
            });

            await mongoose.connect(process.env.mongodb, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            if (mongoose.connection.readyState !== 1) {
                console.log(chalk.red.bold('Connexion à la base de données : ❌ Faible'));
            }

            // Adding a 1-second delay here before printing "Ence is now online."
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log(chalk.green.bold(`Connexion à la base de données ✅.`));
        } catch (error) {
            console.error(chalk.red.bold('Erreur de connexion à la base de données:', error.message));
            console.log(chalk.red.bold('Connexion à la base de données : ❌ Échec'));
            console.log(chalk.white(`[${chalk.blueBright("CLIENT")}]${chalk.white(" - ")}✅Connecté à ${client.user.username}, démarré dans ${client.guilds.cache.size} serveur(s)`))
            console.log(" ")
        } const data = [
            ["CONNECTÉ EN TANT QUE:", `${chalk.red.bold(client.user.tag)}`, "Le bot que je suis connecté en tant que."],
            ["NOMBRE DE SERVEURS:", `${chalk.yellow.bold(client.guilds.cache.size.toLocaleString())}`, "La quantité de serveurs dans lesquels je suis."],
            ["NOMBRE D'UTILISATEURS:", `${chalk.green.bold(client.users.cache.size.toLocaleString())}`, "Le nombre d’utilisateurs utilisant mes commandes."],
            ["NOMBRE DE COMMANDES:", `${chalk.cyan.bold(client.commands.size.toLocaleString())}`, "Commandes chargées"]
        ]

        //Table Setup for my Terminal
        const config = {
            border: {
                topBody: `─`,
                topJoin: `┬`,
                topLeft: `┌`,
                topRight: `┐`,

                bottomBody: `─`,
                bottomJoin: `┴`,
                bottomLeft: `└`,
                bottomRight: `┘`,

                bodyLeft: `│`,
                bodyRight: `│`,
                bodyJoin: `│`,

                joinBody: `─`,
                joinLeft: `├`,
                joinRight: `┤`,
                joinJoin: `┼`
            },
            header: {
                alignment: 'center',
                content: "CLIENT DATA"
            }
        };
        console.log(table(data, config))

        //Random Ascii Art
        const loading = String.raw`
    __         ______   __    __  __    __   ______   __    __  ______  __    __   ______  
   /  |       /      \ /  |  /  |/  \  /  | /      \ /  |  /  |/      |/  \  /  | /      \ 
   $$ |      /$$$$$$  |$$ |  $$ |$$  \ $$ |/$$$$$$  |$$ |  $$ |$$$$$$/ $$  \ $$ |/$$$$$$  |
   $$ |      $$ |__$$ |$$ |  $$ |$$$  \$$ |$$ |  $$/ $$ |__$$ |  $$ |  $$$  \$$ |$$ | _$$/ 
   $$ |      $$    $$ |$$ |  $$ |$$$$  $$ |$$ |      $$    $$ |  $$ |  $$$$  $$ |$$ |/    |
   $$ |      $$$$$$$$ |$$ |  $$ |$$ $$ $$ |$$ |   __ $$$$$$$$ |  $$ |  $$ $$ $$ |$$ |$$$$ |
   $$ |_____ $$ |  $$ |$$ \__$$ |$$ |$$$$ |$$ \__/  |$$ |  $$ | _$$ |_ $$ |$$$$ |$$ \__$$ |
   $$       |$$ |  $$ |$$    $$/ $$ | $$$ |$$    $$/ $$ |  $$ |/ $$   |$$ | $$$ |$$    $$/ 
   $$$$$$$$/ $$/   $$/  $$$$$$/  $$/   $$/  $$$$$$/  $$/   $$/ $$$$$$/ $$/   $$/  $$$$$$/  
                                                                                                                                                                                        
  `;
        try {
            let slash = [];
            let table = new ascii("Slash commands");
            console.log("Slash Commands Loaded");
            console.log(red(`Starting ${client.user.tag}, hold on ...`))
            console.log(red(loading))
            const prefix = "!necro";
            console.log(``);
            console.log(green(`                                                    An Ok Bot`));
            console.log(``);
            console.log(``);
            console.log(yellow('               + ================================================================================== +'));
            console.log(cyan(`                                [i] :: ${prefix} help       :: Displays commands.                   `));
            console.log(cyan(`                                [i] :: /help                :: Displays slash commands                `));
            console.log(yellow('               + ================================Commands========================================== +'));
            console.log(cyan(`                       Author   [i] :: programmé par [french_creating_fr]    :: © 2023 MFR MultiPurpose                   `));
            console.log(cyan(`                       Bot info [i] :: Status                       :: ✅ Online                           `));
            console.log(cyan(`                       Users    [i] ::                              :: ${client.users.cache.size}  utilisateurs   `));
            console.log(cyan(`                       Guilds   [i] ::                              :: ${client.guilds.cache.size} corporations  `));



            console.log(red("Press [CTRL + C] to stop the Terminal ..."))
        } catch (err) {

        }
    }
}