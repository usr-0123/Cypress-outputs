# CYPRESS OUTPUT FORMATS INTO DATABRICKS.

## Exporting Cypress Test Results to CSV
- Cypress doesn’t natively support CSV, but you can use a custom Mocha reporter like mocha-reporter-csv to achieve this.

## Resources for JSON and HTML
- Mochawesome https://cytesting.github.io/cypress/2020/11/21/reporting-with-cypress-and-mochawesome.html
The code below is set up inside the `cypress.config.js`
```
const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
    reportDir: 'cypress/reports', // Directory where the report will be saved
    overwrite: false,
    html: true,
    json: true,
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
```
After running these tests, you can merge the JSON reports using the `mochawesome-merge`:

`npx mochawesome-merge cypress/reports/*.json > combined-report.json`

Also you can generate a single HTML report using `mochawesome-report-generator`

`npx marge combined-report.json -f report -o ./cypress/reports`

An example of the outputs in html and json are as  shown in the image snip below.

![Html & JSON output image](./html-json-output.png)

## JUnit for XML
- JUnit Reporter https://docs.cypress.io/app/tooling/reporters

## HTML
- Mochawesome https://cytesting.github.io/cypress/2020/11/21/reporting-with-cypress-and-mochawesome.html

## JSON/HTML
- Allure Report https://allurereport.org/docs/

## Multiple exports
- Cypress multireporters.

## Built in reporters
- spec reporter
- 3rd party reporters for Mocha
    - teamCity
    - junit

## Custom reporters
- custom Mocha reporters

# Meetings reports 
### CFA
- Manual cypress tests from github. This saves on time and costs. Manual trigger workflow.
- Tests triggered using github workflows.
This github workflow will create a docker image for the cypress test and save it on ECR instance on AWS.
They fire up an ec2 instance still in AWS which runs docker image and results stored in an s3 bucket as html/json.
- Its possible to trigger an automated testing on Github actions.

#### Theories came up with.
Python scripts in databricks - notepads, that will purpose to do the job.
We can use ECR or Docker hub since it saves the image created.

### Cypress
- It is possible to convert a json file to a csv file using a PySpark on Databricks notebooks.