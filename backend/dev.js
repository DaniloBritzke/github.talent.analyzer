const concurrently = require('concurrently');

//   "serve:back": "concurrently --raw  --kill-others --handle-input=false  \"\" \"\"",

concurrently(
  [
    {
      command: "tsx watch src",
      name: 'server',
      env: { DEBUG_COLORS: 1 },
    },
    { command: 'nodemon --config nodemon.tsoa.json', name: 'tsoa' },
  ],
  {
    prefix: 'name',
    raw: true,
    killOthers: ['failure'],
    restartTries: 3,
    pauseInputStreamOnFinish: false,
    handleInput: false,
    defaultInputTarget: 0,
    inputStream: null,
    timestampFormat: '-',
  },
);
