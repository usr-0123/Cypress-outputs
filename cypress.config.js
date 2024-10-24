const { defineConfig } = require("cypress");

module.exports = {
  reporter: 'mocha-multi-reporters',
  reporterOptions: {
    reporterEnabled: 'mochawesome, mocha-junit-reporter, reporters/custom-csv-reporter, reporters/markdown-reporter.js',
    toConsole: true,

    mochawesomeReporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true,
      toConsole: true
    },

    mochaJunitReporterReporterOptions: {
      mochaFile: './cypress/reports/results.xml',
      overwrite: false,
      outputs: true,
      includePending: true,
      toConsole: true
    },
  },
  e2e: {
    // Your Cypress e2e test settings here
  }
};

