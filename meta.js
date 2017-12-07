const path = require('path');
const fs = require('fs');

function sortObject(object) {
  // Based on https://github.com/yarnpkg/yarn/blob/v1.3.2/src/config.js#L79-L85
  const sortedObject = {};
  Object.keys(object).sort().forEach(item => {
    sortedObject[item] = object[item];
  });
  return sortedObject;
}

module.exports = {
  "helpers": {
    "if_or": function (v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }

      return options.inverse(this);
    }
  },
  "prompts": {
    "name": {
      "type": "string",
      "required": true,
      "message": "Project name"
    },
    "description": {
      "type": "string",
      "required": false,
      "message": "Project description",
      "default": "A Vue.js project"
    },
    "author": {
      "type": "string",
      "message": "Author"
    },
    "build": {
      "type": "list",
      "message": "Vue build",
      "choices": [
        {
          "name": "Runtime + Compiler: recommended for most users",
          "value": "standalone",
          "short": "standalone"
        },
        {
          "name": "Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specific HTML) are ONLY allowed in .vue files - render functions are required elsewhere",
          "value": "runtime",
          "short": "runtime"
        }
      ]
    },
    "lint": {
      "type": "confirm",
      "message": "Use ESLint to lint your code?"
    },
    "lintConfig": {
      "when": "lint",
      "type": "list",
      "message": "Pick an ESLint preset",
      "choices": [
        {
          "name": "Standard (https://github.com/standard/standard)",
          "value": "standard",
          "short": "Standard"
        },
        {
          "name": "Airbnb (https://github.com/airbnb/javascript)",
          "value": "airbnb",
          "short": "Airbnb"
        },
        {
          "name": "none (configure it yourself)",
          "value": "none",
          "short": "none"
        }
      ]
    }
  },
  "filters": {
    ".eslintrc.js": "lint",
    ".eslintignore": "lint"
  },
  "complete": function (data) {
    const packageJsonFile = path.join(
      data.inPlace ? "" : data.destDirName,
      "package.json"
    );
    const packageJson = JSON.parse(fs.readFileSync(packageJsonFile));
    packageJson.devDependencies = sortObject(packageJson.devDependencies);
    packageJson.dependencies = sortObject(packageJson.dependencies);
    fs.writeFileSync(
      packageJsonFile,
      JSON.stringify(packageJson, null, 2) + "\n"
    );

    const message = `To get started:\n\n  ${data.inPlace ? '' : `cd ${data.destDirName}\n  `}npm install\n  npm run dev\n\nDocumentation can be found at https://vuejs-templates.github.io/webpack`;
    console.log("\n" + message.split(/\r?\n/g).map(line => "   " + line).join("\n"));
  }
};
