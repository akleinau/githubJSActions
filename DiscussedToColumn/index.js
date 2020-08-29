const core = require('@actions/core');
const github = require('@actions/github');

try {
  // `who-to-greet` input defined in action metadata file
  fetch('https://api.github.com/repos/akleinau/test/issues/1/comments')
  .then(function (response) {
    return response.json();
  })
  .then(function (data) {
    appendData(data);
  })
  .catch(function (err) {
    console.log(err);
  });
} catch (error) {
  core.setFailed(error.message);
}