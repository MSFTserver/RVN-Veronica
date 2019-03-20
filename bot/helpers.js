let config = require('config');
let permRanks = config.get('moderation');
let spamChannels = config.get('General').Channels.botspam;
let ExcludedSpam = config.get('excludedSpam');

// Checks if user is allowed to use a command only for mods/team members
exports.hasPerms = function(msg) {
  return msg.member.roles.some(r => permRanks.perms.includes(r.name));
};

// Check if command was sent in dm
exports.inPrivate = function(msg) {
  return msg.channel.type == 'dm';
};

// Checks if Message was sent from spam Channel
exports.inSpam = function(msg) {
  return spamChannels == msg.channel.id;
};

// Checks if Message was sent from a Excluded Channel
exports.hasExcludedSpamChannels = function(msg) {
  return ExcludedSpam.channels.includes(msg.channel.id);
};

// Checks if Message was sent from a Excluded user
exports.hasExcludedSpamUsers = function(msg) {
  return ExcludedSpam.users.includes(msg.author.id);
};

exports.getError = function (errCode){
    if (errCode == 122) {
      var message = 'API ERROR: Request-URI too long';
      return message;
    }
    if (errCode == 300) {
      var message = 'API ERROR: Multiple Choices';
      return message;
    }
    if (errCode == 301) {
      var message = 'API ERROR: Moved Permanently';
      return message;
    }
    if (errCode == 303) {
      var message = 'API ERROR: See Other';
      return message;
    }
    if (errCode == 304) {
      var message = 'API ERROR: Not Modified';
      return message;
    }
    if (errCode == 305) {
      var message = 'API ERROR: Use Proxy';
      return message;
    }
    if (errCode == 306) {
      var message = 'API ERROR: Switch Proxy';
      return message;
    }
    if (errCode == 307) {
      var message = 'API ERROR: Temporary Redirect';
      return message;
    }
    if (errCode == 308) {
      var message = 'API ERROR: Permanent Redirect';
      return message;
    }
    if (errCode == 400) {
      var message = 'API ERROR: Bad Request';
      return message;
    }
    if (errCode == 401) {
      var message = 'API ERROR: Unauth­orized';
      return message;
    }
    if (errCode == 402) {
      var message = 'API ERROR: Payment Required';
      return message;
    }
    if (errCode == 403) {
      var message = 'API ERROR: Forbidden';
      return message;
    }
    if (errCode == 404) {
      var message = 'API ERROR: Not Found';
      return message;
    }
    if (errCode == 405) {
      var message = 'API ERROR: Method Not Allowed';
      return message;
    }
    if (errCode == 406) {
      var message = 'API ERROR: Not Acceptable';
      return message;
    }
    if (errCode == 407) {
      var message = 'API ERROR: Proxy Authen­tic­ation Required';
      return message;
    }
    if (errCode == 408) {
      var message = 'API ERROR: Request Timeout';
      return message;
    }
    if (errCode == 409) {
      var message = 'API ERROR: Conflict';
      return message;
    }
    if (errCode == 410) {
      var message = 'API ERROR: Gone';
      return message;
    }
    if (errCode == 411) {
      var message = 'API ERROR: Length Required';
      return message;
    }
    if (errCode == 412) {
      var message = 'API ERROR: Precondition Failed';
      return message;
    }
    if (errCode == 413) {
      var message = 'API ERROR: Request Entity Too Large';
      return message;
    }
    if (errCode == 414) {
      var message = 'API ERROR: Request-URI Too Long';
      return message;
    }
    if (errCode == 415) {
      var message = 'API ERROR: Unsupported Media Type';
      return message;
    }
    if (errCode == 416) {
      var message = 'API ERROR: Requested Range Not Satisf­iable';
      return message;
    }
    if (errCode == 417) {
      var message = 'API ERROR: Expectation Failed';
      return message;
    }
    if (errCode == 418) {
      var message = "API ERROR: I'm a teapot";
      return message;
    }
    if (errCode == 422) {
      var message = 'API ERROR: Unprocessable Entity';
      return message;
    }
    if (errCode == 423) {
      var message = 'API ERROR: Locked';
      return message;
    }
    if (errCode == 424) {
      var message = 'API ERROR: Failed Dependency';
      return message;
    }
    if (errCode == 425) {
      var message = 'API ERROR: Unordered Collection';
      return message;
    }
    if (errCode == 426) {
      var message = 'API ERROR: Upgrade Required';
      return message;
    }
    if (errCode == 428) {
      var message = 'API ERROR: Precondition Required ';
      return message;
    }
    if (errCode == 429) {
      var message = 'API ERROR: Too Many Requests ';
      return message;
    }
    if (errCode == 431) {
      var message = 'API ERROR: Request Header Fields Too Large ';
      return message;
    }
    if (errCode == 444) {
      var message = 'API ERROR: No Response ';
      return message;
    }
    if (errCode == 449) {
      var message = 'API ERROR: Retry With ';
      return message;
    }
    if (errCode == 450) {
      var message = 'API ERROR: Blocked By Windows Parental Controls ';
      return message;
    }
    if (errCode == 451) {
      var message = 'API ERROR: Unavailable For Legal Reasons';
      return message;
    }
    if (errCode == 499) {
      var message = 'API ERROR: Client Closed Request';
      return message;
    }
    if (errCode == 500) {
      var message = 'API ERROR: Internal Server Error';
      return message;
    }
    if (errCode == 501) {
      var message = 'API ERROR: Not Implemented';
      return message;
    }
    if (errCode == 502) {
      var message = 'API ERROR: Bad Gateway';
      return message;
    }
    if (errCode == 503) {
      var message = 'API ERROR: Service Unavailable';
      return message;
    }
    if (errCode == 504) {
      var message = 'API ERROR: Gateway Timeout';
      return message;
    }
    if (errCode == 505) {
      var message = 'API ERROR: HTTP Version Not Supported';
      return message;
    }
    if (errCode == 506) {
      var message = 'API ERROR: Variant Also Negotiates';
      return message;
    }
    if (errCode == 507) {
      var message = 'API ERROR: Insufficient Storage';
      return message;
    }
    if (errCode == 508) {
      var message = 'API ERROR: Loop Detected';
      return message;
    }
    if (errCode == 509) {
      var message = 'API ERROR: Bandwidth Limit Exceeded';
      return message;
    }
    if (errCode == 510) {
      var message = 'API ERROR: Not Extended';
      return message;
    }
    if (errCode == 511) {
      var message = 'API ERROR: Network Authentication Required';
      return message;
    }
    if (errCode == 598) {
      var message = 'API ERROR: Network read timeout error';
      return message;
    }
    if (errCode == 599) {
      var message = 'API ERROR: Network connect timeout error';
      return message;
    }
}
