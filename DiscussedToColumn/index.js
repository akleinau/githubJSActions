require('cross-fetch/polyfill');

const core = require('@actions/core');
const github = require('@actions/github');

fetch('https://api.github.com/repos/akleinau/githubJSActions/issues/2/comments')
  .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  })
  .then(user => {
    count = user.length
    console.log(user.length);
    if (count > 4) core.setOutput('continue', 'true');
    else core.setOutput('continue', 'false');
    const payload = JSON.stringify(github.context.payload, undefined, 2)
    console.log(`The event payload: ${payload}`);
    const url = payload.comment;
    console.log(`The url: ${url}`);

  })
  .catch(err => {
    console.error(err);
  });