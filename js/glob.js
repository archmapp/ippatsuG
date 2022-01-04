// https://note.affi-sapo-sv.com/nodejs-glob-wildcard.php

// npm install glob

// import glob from 'glob'
const glob = require('glob')

// 受け取るファイル名の形式は、指定したパスの形式に合わせられます。
glob('./src/img/*.png', function (err, files) {
	if (err) {
		console.log(err)
		return
	}
	console.log(files)
})

// ディレクトリのみ取得
glob('./src/img/*/', function (err, files) {
	if (err) {
		console.log(err)
		return
	}
	console.log(files)
})

// ファイルのみ取得
glob('./src/img/*', { nodir: true }, function (err, files) {
	if (err) {
		console.log(err)
		return
	}
		console.log(' ファイルのみ取得  { nodir: true }')
		console.log(files)
})

// 特定のファイルやディレクトリを除外する
// 特定のファイルやディレクトリを除外するには、ignoreオプションを指定します。

// ignoreオプションは文字列の配列で、各要素はパターン指定できます。
// ただし、ファイルやディレクトリの名称と一致する必要があります。

// 例: "abc.jpg" ⇒ abc.jpgは除外されるが、xxabc.jpgは除外されない

//  特定のファイルやディレクトリを除外する
glob(
	'./src/img/*',
	{ ignore: ['*.webp', 'x-*.png'] },
	function (err, files) {
		if (err) {
			console.log(err)
			return
		}
		console.log(' 特定のファイルやディレクトリを除外する')
		console.log(files)
	}
)