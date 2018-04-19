# Bot for [RVN's Discord](https://discord.gg/BmwqstP)

(This README will be updated along with bot updates)

<h3>
<details style="font-size=30px;"><summary><u>Features:</u></summary>

* Helper

  * displays help for any command given

    * Responds to `!help`

    * Also Responds to `!help <command>`

* Network bot

  * displays current network Raven Netowrk Stats.

    * Responds to `!network`

* Market bot

  * displays current market stats from coinmarketcap

    * Responds to `!market`

* Hashpower bot

  * calculates given MH/s to RVN & fiat per min, hr, day.

    * Responds to `!hashpower <MH/s> <fiat>`

* Price bot

  * displays price of currencies.

    * Responds to `!price <fiat/coin> <amount> <fiat/coin>`

* Lambo bot

  * displays how much rvn is needed or if amount is supplied how many needed for 1 lambo

    * Responds to `!lambo`

    * Responds to `!lambo <amount>`

* Balance bot

  * Displays balance of supplied Raven Address

    * Responds to `!balance <address>`

* Note bot

  * logs note for the bot workers!

    * Responds to `!botmaster <whatever you want to say>`

* Uptime bot

  * displays bot current uptime!

    * Responds to `!uptime`

* User info bot

  * displays info about a certain users

    * Responds to `!userinfo <@username>`

* Pools bot

  * displays pools on the raven network

    * Responds to `!pools`

    * Also Responds to `!pools <pool name>`

  * allows Pool Operators to add themselves to the list

    * Responds to `!pools set, <poolName>, <poolURL>, <poolFee>, <poolStratum>, <poolPort>, <poolExtraInfo>`

* 8ball bot

  * answers yes or no questions

    * Responds to `!8ball <question?>`

* status bot

  * displays if url is up or down.

    * Responds to `!status <url> <port>`

* Role setter bot

  * allows users to set specific roles for themselves

    * (specified in the config!)

    * Responds to `!addrole <role-name>` - Adds to Role

    * Responds to `!delrole <role-name>` - Deletes from Role

    * Responds to `!roles` - List Available Roles

* helpful commands bot

  * displays helpful commands you can use.

    * (set in the commands.json)

    * Responds to `!helpcommands`

* Welcome bot

  * sends Direct Message when new users join,

    * (moderator only) Responds to `!welcome <@username>`

* Server Stats bot

  * displays current servers Statistics

    * (moderator only) Responds to `!serverstats`

* Purge Bot

  * deletes # is amount of messages.

    * (moderator only) Responds to `!purge <#>`

* pm2 Bots

  * allows updating and shutting down of bots

    * (Bot Devs Only) Responds to `!update <app-name>`

    * (Bot Devs Only) Responds to `!shutdown <app-name>`

* Specific User Message Logger

* alias plugin to allow commands to be activated by a different word

* Spam Detection Bot to Prevent Discord Raids and Spammers

* Discord Invite Link Detection

* Dynamic plugin loading with permission support.

* [PM2 support](http://pm2.keymetrics.io/)

</details>
</h3>

## Auto-Installation

for Windows Users Only!

Create a bot and get the bot's API Token:
https://discordapp.com/developers/applications/me

Edit and rename example config to default.json in /config

if yarn is already installed just run `yarn prebuild`,

otherwise proceed to running the windows-install.bat file!

and finally `yarn start`

ENJOY!

## Manual-Installation

### Requirements

* mongodb > 3.2
* git > 2.0.0
* node > 8.0.0
* npm > 0.12.x
* pm2 > latest
* yarn ( install with npm install -g yarn if not installed )

Create a bot and get the bot's API Token:
https://discordapp.com/developers/applications/me

Edit the ecosystem.json.js file to match your directories

Edit and rename example config to default.json in /config, then cd to bot directory

make sure you have node, git, and MongoDB installed then run:

```
npm install
npm yarn -g
npm pm2 -g
yarn start
```

## Development

Be sure to run the command below before working on any code, this ensures
prettier goes to work and keeps code to our standard.

```
yarn install --production=false
```

to run the prettier code use the following:

```
yarn precommit
```
