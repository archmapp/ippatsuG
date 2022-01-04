// https://qiita.com/akifumiyoshimu/items/d22c8f86af338bf39746

const fs = require('fs')

const testObj = {
	test: 'dammy',
}

const createFile = (pathName, source) => {
	const toJSON = JSON.stringify(source)

	fs.writeFile(pathName, toJSON, (err) => {
		if (err) console.log(err)
		if (!err) {
			console.log('JSONファイルを生成しました')
		}
	})
}

createFile('newObj.json', testObj)