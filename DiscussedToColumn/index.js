require('cross-fetch/polyfill');

const core = require('@actions/core');
const github = require('@actions/github');

const payload = github.context.payload.comment.issue_url
const splitted = payload.split("/");
const issue_number = splitted[splitted.length-1];
console.log(`issue_id: ${issue_number}`);
core.setOutput('issue_number', issue_number);

fetch(`https://api.github.com/repos/akleinau/githubJSActions/issues/${issue_number}/comments`)
  .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  })
  .then(user => {
    count = user.length
    console.log(user.length);
    if (count == 2) core.setOutput('continue', 'true');
    else core.setOutput('continue', 'false');

  })
  .catch(err => {
    console.error(err);
  });