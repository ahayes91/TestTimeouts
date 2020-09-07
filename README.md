# testTimeouts

## How to run
 - `yarn install` at the root
 - `yarn test` to run all tests
 - `yarn test:ci` to run the same test command we run in the CI
 - `yarn test-with-memory-and-inspector` to run the node memory inspector with Chrome
 - `yarn workspace @test/parentApp test --detect-leaks` to run the tests for the main parent app (including the flaky integration tests) with the flag to detect memory leaks

## Functionality of the app

Based on https://www.facebook.com/TheIrishPost/videos/ho-ro-the-rattlin-bog/413570899233063/ 

The flaky integration test for this app is at `packages/apps/parentApp/src/integrationTests/App.integration.test.js`.

The parent app needs to make sequential data calls, and the child app also makes a call based on the data from the parent.

- First we make a POST request for the bogs, and then a GET request for holes associated with that bog. 
- We do a standalone POST request for the trees in the bog (the result of this request doesn't do anything as it's not relevant to the integration test that is failing).
- We then do a POST request for branches associated with the bog (this is currently mocked in the test to either set the branches as unavailable, or as empty).
- The app would also make a GET request for limbs in the bog if there were branches associated with the bog, but we haven't mocked that in this app as the test is already flaky when rendering the results of the branches POST request. 
