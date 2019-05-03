const Tesseract = require('tesseract.js');
const images = require('@chenng/images');
const requset = require('request');
const fs = require('fs');
const { promisify } = require('util');
const chalk = require('chalk');

const writeFile = promisify(fs.writeFile);
const rp = promisify(requset);

class Recognize {
  constructor(url) {
    Recognize.downloadDir = `${__dirname}/dist/`;
    Recognize.downloadFile = `${__dirname}/dist/temp.png`;
    this.url = url;
    this.start();
  }

  async start() {
    const data = await this.downloadImg();
    await writeFile(Recognize.downloadFile, data);
    this.recognize();
    const result = await Tesseract.recognize(Recognize.downloadFile, {
      lang: 'eng',
      tessedit_char_blacklist: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    });

    console.log(`

      识别成功!
      识别结果为：${chalk.green(result.text)}
    `);
  }

  async downloadImg() {
    if (!fs.existsSync(Recognize.downloadDir)) {
      fs.mkdirSync(Recognize.downloadDir);
      console.log(`创建了 ${Recognize.downloadDir} 文件夹`);
    }
    
    const res = await rp({
      url: this.url,
      method: 'GET',
      encoding: null,
    });
    return res.body;
  }

  recognize() {
    // 放大图片，并覆盖源文件
    images(Recognize.downloadFile)
      .size(400)
      .save(Recognize.downloadFile);
  }
  
}

module.exports = Recognize;
