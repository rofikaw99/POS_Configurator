# Template Mocha Framework

## Prerequisite

- Visual Studio Code.
- NodeJS.
- [.env files](https://k-port/sites/itrepository/Documents/ProjectDocuments/COK/env%20files) and store in base project folder (same location with package.json).
- Find and Replace "NamaScrum" in package.json, with scrum / team name. (Ex: "Retail" for scrum retail, "LiveChat") for live chat team. (TBD)
- Run on cmd "npm install" to install node modules.

## Explanation about scripts

- qc-api          : run di env QC untuk semua file .js dalam PROJECT_DIR/tests_explorer/test_case/api
- qc-e2e          : run di env QC untuk semua file .js dalam PROJECT_DIR/tests_explorer/test_case/e2e
- staging-api     : run di env staging untuk semua file .js dalam PROJECT_DIR/tests_explorer/test_case/api
- staging-e2e     : run di env staging untuk semua file .js dalam PROJECT_DIR/tests_explorer/test_case/e2e
- qc-custom       : run di env QC untuk specific test case atau folder dalam PROJECT_DIR/tests_explorer/test_case/
- staging-custom  : run di env staging untuk specific test case atau folder dalam PROJECT_DIR/tests_explorer/test_case/

Notes:
one script will generate reports in html, xml, json & generate live output to terminal

## How to run scripts

- npm run qc-api
- npm run qc-custom --testcasepath=api/claim/create_loss_report.js
- npm run qc-custom --testcasepath=api/claim/

## How to debug

- Select breakpoint
- Go to menu "Run and Debug" / CTRL + SHIFT + D
- Click on JavaScript Debug Terminal
- Run scripts (ex. "npm run qc-api")

## Report date format

- YYMMDD_HHMMSS

### Docs

- **[MochaJs](https://mochajs.org/)**
- **[ChaiJs](https://www.chaijs.com/)**
- **[Faker](https://www.npmjs.com/package/faker)**
- **[DateJs](https://github.com/datejs/Datejs)**
