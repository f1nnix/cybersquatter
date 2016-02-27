import fs from 'fs-extra'
import cybersquatt from 'cybersquatt'

/**
 * @private
 * @description
 * @param  {[type]} names [description]
 * @return {Array<Promise>}       [description]
 */
const buildCheckers = (names) =>
  names.map((name) => cybersquatt(name).then(generateReportLine(name)))

/**
 * @private
 * @description
 * @param  {[type]} name [description]
 * @return {String<Promise>}      [description]
 */
const generateReportLine = (name) => {
  return (status) => {
    return new Promise(function(resolve, reject) {
      let av = '<td class="table-success">Avialable!</td>'
      let tn = '<td class="table-danger">TAKEN</td>'
      resolve(`<tr><td>${name}</td>${status.domains.com==true?av:tn}${status.domains.org==true?av:tn}${status.domains.net==true?av:tn}${status.domains.info==true?av:tn}${status.socials.facebook==true?av:tn}${status.socials.twitter==true?av:tn}${status.socials.github==true?av:tn}</tr>\n`)
    })
  }
}


/**
 * @private
 * @description
 * @param  {[type]} line [description]
 * @return {[type]}      [description]
 */
const writeReport = (lines) => {
  if (fs.existsSync(`${process.cwd()}/report.html`) === false) {
    fs.copySync(
      `${__dirname}/../assets/template.html`,
      `${process.cwd()}/report.html`
    )
  }
  let file = fs.readFileSync(`${process.cwd()}/report.html`, 'utf8')
  let parts = file.split('<!-- #data -->')

  let output = [
    parts[0],
    lines.join('\n'),
    '<!-- #data -->',
    parts[1]
  ]

  return fs.writeFileSync(`${process.cwd()}/report.html`, output.join(''), 'utf8')
}


/**
 * @public
 * @description
 * @param  {Array<String>} names [description]
 * @return {[type]}       [description]
 */
export default (names) => {
  Promise
    .all(buildCheckers(names))
    .then(writeReport)
    .then((result)=> console.log(`Written report for: ${names.join(', ')}`))
    .catch((err) => {
      console.log(err)
    })
}
