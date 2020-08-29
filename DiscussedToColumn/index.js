require('cross-fetch/polyfill');

const core = require('@actions/core');
const github = require('@actions/github');

fetch('https://api.github.com/repos/akleinau/test/issues/1/comments')
  .then(res => {
    if (res.status >= 400) {
      throw new Error("Bad response from server");
    }
    return res.json();
  })
  .then(user => {
    console.log(user[0].id);
  })
  .catch(err => {
    console.error(err);
  });