#!/usr/bin/env node

const argv = require('yargs').argv;
const chalk = require('chalk');

const Recognize = require('./recognize');

if (!argv.url) {
  console.log(`
    ${chalk.red('缺少 url 参数')}

    用法：${chalk.green('reg --url=https://qiniu.chenng.cn/2018-12-09-15-21-29.png')}
  `);
  return;
}

const url = argv.url;
new Recognize(url);