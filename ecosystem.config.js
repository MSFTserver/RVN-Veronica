module.exports = {
  apps: [
    {
      name: 'veronica',
      script: './bot/bot.js',
      cwd: 'C:/Users/RavenDev/Desktop/Bots/Veronica',
      instance_id_env: '0',
      error_file:
        'C:/Users/RavenDev/Desktop/Bots/Veronica/Logs/veronica-err.log',
      out_file: 'C:/Users/RavenDev/Desktop/Bots/Veronica/Logs/veronica-out.log',
      env: {
        NODE_ENV: 'development'
      },
      env_production: {
        NODE_ENV: 'production'
      }
    }
  ]
};
