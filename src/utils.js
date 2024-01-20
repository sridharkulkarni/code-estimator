var fs = require("fs");
var path = require("path");
var readline = require('readline');

module.exports.readFromFile = (file) => {
  return new Promise((resolve, reject) => {
      fs.readFile(file, (err, data) => {
          if (err) {
              console.log(err);
              reject(err);
          }
          else {
              resolve(data.toString());
          }
      });
  });
}

module.exports.parseFile = (codeString) => {
  let totalLineComments = 0
  let totalBlankLines = 0
  let totalCodeLines = 0
  const linesData = codeString.split('\n');
  const totalLines = linesData.length;
  linesData.forEach(element => {
    const cleanElement = element.trim()
    if(!cleanElement) {
      totalBlankLines+=1;
      return;
    }
    if(cleanElement.indexOf('//') === 0) {
      totalLineComments+=1;
      return;
    }
    if(cleanElement) {
      totalCodeLines+=1;
      return;
    }
  });
  return {
    totalLines,
    totalBlankLines,
    totalLineComments,
    totalCodeLines
  }
}

const mapPythonSyntax = {
  "//": "Comments",
}

const mapJavaSyntax = {
  "//": "Comments",
}
