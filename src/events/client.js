const { ActivityType } = require("discord.js")
require("colors")

async function setGuildStatus(client) {
  const activities = [`Status au choix`, `Status au choix`];

  // assign activity at startup of bot instead of waiting 15 minutes
  let i = 0;
  let currentActivity = activities[i];
  client.user.setPresence({
    activities: [
      {
        name: currentActivity,
        type: ActivityType.Custom,
      },
    ],
  });

  setInterval(() => {
    currentActivity = activities[i++ % activities.length];
    client.user.setPresence({
      activities: [
        {
          name: currentActivity,
          type: ActivityType.Custom,
        },
      ],
    });
  }, 5000); // 60,000 = 1 minute, 900,000 = 15 minutes
}

module.exports = { setGuildStatus };