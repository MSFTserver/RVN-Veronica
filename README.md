# Bot for [RVN's Discord](https://discord.gg/BmwqstP)

(This README will be updated along with bot updates)

<details style="font-size=30px;"><summary><u>Features:</u></summary>

* Helper

  * displays help for any command given

    * Responds to `!help`

    * Also Responds to `!help <command>`

* Reputation Bots

  * displays reputation for you or specified user

    * Responds to `!rep`

    * Also Responds to `!rep <@username>`

  * give or take rep from a specified user (moderator only)

    * Responds to `!rep <take/give> <@username> <amount>`

* Network bot

  * displays current network Raven Network Stats.

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

  * displays info about yourself or specified user

    * Responds to `!userinfo`

    * Also Responds to `!userinfo <@username>`

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

* Role setter bot (specified in the config!)

  * allows users to set specific roles for themselves

    * Responds to `!roles` - List Available Roles

    * Responds to `!addrole <role-name>` - Adds to Role

    * Responds to `!delrole <role-name>` - Deletes from Role

* helpful commands bot (set in the commands.json)

  * displays helpful commands you can use.

    * Responds to `!helpcommands`

* Welcome bot

  * sends Direct Message when new users join, moderators only  can also send it again

    * Responds to `!welcome <@username>`

* Server Stats bot

  * displays current servers Statistics (moderator only)

    * Responds to `!serverstats`

* Moderation bots (moderator only)

  * deletes # of messages from specified channel/user or current channel.

    * Responds to `!purge <#>`

    * Also Responds to `!purge <#channel-name/@username> <#>`

  * kicks a user for given Reason

    * Responds to `!kick <@username> <reason>`

  * bans user for given Reason

    * Responds to `!ban <@username> <reason>`

* pm2 Bots (Bot Devs Only)

  * allows updating and shutting down of bots

    * Responds to `!update <app-name>`

    * Responds to `!shutdown <app-name>`

* utilizes mongodb with included helper functions

* Specific User Message Logger

* alias plugin to allow commands to be activated by a different word

* Spam Detection Bot to Prevent Discord Raids and Spammers

* Discord Invite Link Detection

* Dynamic plugin loading with permission support.

* [PM2 support](http://pm2.keymetrics.io/)

</details>

<details><summary><u>Installation</u></summary>

## Create a Bot

1) Create a bot and get the bots Token and Client ID: https://discordapp.com/developers/applications/me

    1) After going to the link above click “new application”. Give it a name, picture and description.

    2) Click “Create Bot User” and click “Yes, Do It!” when the dialog pops up.

    3) Copy down the token used to login and Client ID to invite your new bot to your discord server.

2) invite the bot to your server using the link below and entering the Client ID or generate your own [Here :link:](https://discordapi.com/permissions.html)

```
https://discordapp.com/oauth2/authorize?client_id=INSERT_CLIENT_ID_HERE&scope=bot&permissions=27648
```

## Edit Files

1) Edit and rename `default.json.example` to `default.json` in `/config`.

2) Edit and rename `ecosystem.json.js.example` to `ecosystem.json.js` in the root folder to match the correct directories.

## Install Bot

### Auto - Windows

1) run the `windows-install.bat` file to install needed tools, Not on windows or don't want to auto install follow the instructions below for manual Installation.

2) verify the following tools are installed by running the commands below in cmd:
      * mongodb - `if exist "C:\Program Files\MongoDB" (echo folder exists) else (echo does not exist)`
      * git - `git --version`
      * node - `node -v`
        * npm - `npm -v`
          * pm2 - `pm2 -v`
          * yarn - `yarn -v`

3) start the bot with `yarn start` or `pm2 start ecosystem.config.js` in the bots root directory

    1) if the bot fails to start and throws missing npm package errors simply run `npm install` again in the bots root directory

### Manual - Linux/Mac

1) Download and install the required tools listed below:

      * [mongodb > 3.6](https://www.mongodb.com/download-center?jmp=nav#community)
      * [git > 2.0.0](https://git-scm.com/downloads)
      * [node > 8.0.0](https://nodejs.org/en/)
        * [npm > 0.12.x](https://nodejs.org/en/)
          * [pm2 > latest](http://pm2.keymetrics.io/)
          * [yarn > latest](https://yarnpkg.com/en/docs/install)

2) After the above tools have been installed run `npm install` in the bots root directory.

    1) this may throw some errors on some systems not all packages are required for some systems, the bot will still run unless its a absolutely needed dependency.

3) start the bot with `yarn start` or `pm2 start ecosystem.config.js` in the bots root directory

</details>

<details><summary><u>Development</u></summary>

Be sure to run the command below before working on any code, this ensures
prettier goes to work and keeps code to our standard.

```
yarn install --production=false
```

to run the prettier on the code use the following:

```
yarn precommit
```
