// custom-csv-reporter.js
const Mocha = require('mocha');
const fs = require('fs');
const path = require('path');
const { Base } = Mocha.reporters;

// Custom CSV Reporter
class CustomCSVReporter extends Base {
  constructor(runner) {
    super(runner);

    // CSV header
    const outputPath = path.join('cypress/reports/results.csv');
    const csvHeader = 'Suite Title,Test Title,State,Duration (ms),Error Message\n';

    // Create (or overwrite) the CSV file with the header
    fs.writeFileSync(outputPath, csvHeader, (err) => {
      if (err) throw err;
    });

    // On each test completion (pass, fail, skip)
    runner.on('test end', (test) => {
      const testResult = [
        test.parent.title, // Suite Title
        test.title,        // Test Title
        test.state || 'skipped', // Test State (passed, failed, skipped)
        test.duration || 0,      // Duration in ms
        test.err ? `"${test.err.message.replace(/\n/g, '')}"` : '' // Error message, if failed
      ];

      // Append test result to CSV
      const csvLine = testResult.join(',') + '\n';
      fs.appendFileSync(outputPath, csvLine, (err) => {
        if (err) throw err;
      });
    });

    // On run end
    runner.on('end', () => {
      console.log('Test results have been written to CSV file.');
    });
  }
}

module.exports = CustomCSVReporter;
