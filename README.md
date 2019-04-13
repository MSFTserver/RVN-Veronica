# Bot for [developer.ravencoin.online Discord](http://discord.ravencoin.online)

(This README will be updated along with bot updates)

<details style="font-size=30px;"><summary><u>Features:</u></summary>

* Helper

  * displays help for any command given

    * Responds to `help`

    * Also Responds to `help <command>`

* Reputation Bots

  * displays reputation for you or specified user

    * Responds to `rep`

    * Also Responds to `rep <@username>`

  * give or take rep from a specified user (moderator only)

    * Responds to `rep <take/give> <@username> <amount>`

* Uptime bot

  * displays bot current uptime!

    * Responds to `uptime`

* User info bot

  * displays info about yourself or specified user

    * Responds to `userinfo`

    * Also Responds to `userinfo <@username>`

* 8ball bot

  * answers yes or no questions

    * Responds to `8ball <question?>`

* status bot

  * displays if url is up or down.

    * Responds to `status <url> <port>`

* Tags bot (set in the tags.json)

  * displays helpful tags you can use.

    * Responds to `tags`

* Server Stats bot

  * displays current servers Statistics (moderator only)

    * Responds to `serverstats`

* Moderation bots (moderator only)

  * Role setter bot (specified in the config!)

    * allows setting specific roles for users

      * Responds to `roles` - List Available Roles

      * Responds to `addrole <role-name> <user>` - Adds to Role

      * Responds to `delrole <role-name> <user>` - Deletes from Role

  * deletes # of messages from specified channel/user or current channel.

    * Responds to `purge <#>`

    * Also Responds to `purge <#channel-name/@username> <#>`

  * kicks a user for given Reason

    * Responds to `kick <@username> <reason>`

  * bans user for given Reason

    * Responds to `ban <@username> <reason>`

* utilizes mongodb with included helper functions

* alias commands allows them to be activated by a different word

* Dynamic command loading with permission support.

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

## Install Bot - Windows/Linux/Mac

1) Download and install the required tools listed below:

      * [mongodb > 3.6](https://www.mongodb.com/download-center?jmp=nav#community)
      * [git > 2.0.0](https://git-scm.com/downloads)
      * [node > 8.0.0](https://nodejs.org/en/)
        * [npm > 0.12.x](https://nodejs.org/en/)
          * [pm2 > latest](http://pm2.keymetrics.io/)
          * [yarn > latest](https://yarnpkg.com/en/docs/install)

2) After the above tools have been installed run `npm install` in the bots root directory.

    1) this may throw some errors on some systems not all packages are required for some systems, the bot will still run unless its a absolutely needed dependency.

    2) verify the following tools are installed by running the commands below in cmd:
          * mongodb - `if exist "C:\Program Files\MongoDB" (echo folder exists) else (echo does not exist)`
          * git - `git --version`
          * node - `node -v`
            * npm - `npm -v`
              * pm2 - `pm2 -v`
              * yarn - `yarn --version`

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
