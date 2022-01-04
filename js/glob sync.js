// https://note.affi-sapo-sv.com/nodejs-glob-wildcard.php

// npm install glob

// import glob from 'glob'
const glob = require('glob')

// syncさせる
// ファイルの検索終了を待ってから次のコードを実行させる場合、
// glob.syncを使用します。
// コールバックは指定せずに、結果は戻り値で受け取ります。

// glob.sync使用例
const files = glob.sync('../src/img/*')

console.log( files );


// filesOnly (但し、matchingするディレクトリは含まれる。)
const filesOnly = glob.sync('../src/img/*.*')

console.log(filesOnly)