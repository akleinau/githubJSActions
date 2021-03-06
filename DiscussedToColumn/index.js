require('cross-fetch/polyfill');

const core = require('@actions/core');
const github = require('@actions/github');

const payload = github.context.payload.comment.issue_url
const splitted = payload.split("/");
const issue_number = splitted[splitted.length-1];
console.log(`issue_id: ${issue_number}`);
core.setOutput('issue_number', issue_number);

const repoURL = core.getInput('repo');
const URL = `${repoURL}/issues/${issue_number}/comments`;
console.log(URL);
fetch(URL)
  .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  })
  .then(user => {
    count = user.length
    console.log(user.length);
    if (count == 3) core.setOutput('continue', 'true');
    else core.setOutput('continue', 'false');
    const URL2 = `${repoURL}/issues/${issue_number}`;
    console.log(URL2);
    return fetch(URL2);
  })
  .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  })
  .then(user => {
    console.log("pull_request" in user);
    if ("pull_request" in user) core.setOutput('continue', 'false');
  })
  .catch(err => {
    console.error(err);
  });


 