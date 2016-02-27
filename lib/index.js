'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fsExtra = require('fs-extra');

var _fsExtra2 = _interopRequireDefault(_fsExtra);

var _cybersquatt = require('cybersquatt');

var _cybersquatt2 = _interopRequireDefault(_cybersquatt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @private
 * @description
 * @param  {[type]} names [description]
 * @return {Array<Promise>}       [description]
 */
var buildCheckers = function buildCheckers(names) {
  return names.map(function (name) {
    return (0, _cybersquatt2.default)(name).then(generateReportLine(name));
  });
};

/**
 * @private
 * @description
 * @param  {[type]} name [description]
 * @return {String<Promise>}      [description]
 */
var generateReportLine = function generateReportLine(name) {
  return function (status) {
    return new Promise(function (resolve, reject) {
      var av = '<td class="table-success">Avialable!</td>';
      var tn = '<td class="table-danger">TAKEN</td>';
      resolve('<tr><td>' + name + '</td>' + (status.domains.com == true ? av : tn) + (status.domains.org == true ? av : tn) + (status.domains.net == true ? av : tn) + (status.domains.info == true ? av : tn) + (status.socials.facebook == true ? av : tn) + (status.socials.twitter == true ? av : tn) + (status.socials.github == true ? av : tn) + '</tr>\n');
    });
  };
};

/**
 * @private
 * @description
 * @param  {[type]} line [description]
 * @return {[type]}      [description]
 */
var writeReport = function writeReport(lines) {
  if (_fsExtra2.default.existsSync(process.cwd() + '/report.html') === false) {
    _fsExtra2.default.copySync(__dirname + '/../assets/template.html', process.cwd() + '/report.html');
  }
  var file = _fsExtra2.default.readFileSync(process.cwd() + '/report.html', 'utf8');
  var parts = file.split('<!-- #data -->');

  var output = [parts[0], lines.join('\n'), '<!-- #data -->', parts[1]];

  return _fsExtra2.default.writeFileSync(process.cwd() + '/report.html', output.join(''), 'utf8');
};

/**
 * @public
 * @description
 * @param  {Array<String>} names [description]
 * @return {[type]}       [description]
 */

exports.default = function (names) {
  Promise.all(buildCheckers(names)).then(writeReport).then(function (result) {
    return console.log('Written report for: ' + names.join(', '));
  }).catch(function (err) {
    console.log(err);
  });
};