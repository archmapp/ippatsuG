// https://qiita.com/akifumiyoshimu/items/d22c8f86af338bf39746

const fs = require('fs')

const stuff = require('./sampleStuff') //外部データを引っ張っている
const daily = require('./sampleDaily') //外部データを引っ張っている

//新たに追加した関数
const createObj = () => {
	const objArray = [],
		directArr = ['id', 'Name'],
		divisionArr = ['Protein', 'Iron']

	stuff.map((stuffObj) => {
		const singleObj = {}
		directArr.map((keyName) => {
			singleObj[keyName] = stuffObj[keyName]
		})
		divisionArr.map((keyName) => {
			const dailyObj = daily.find((item) => keyName === item.name)
			const { volume: denomi } = dailyObj, //分割代入したvolumeの名前をdenomi(分母)にしている
				molecule = stuffObj[keyName], //molecleは分子
				ratio = Math.round((molecule / denomi) * 1000) / 1000
			singleObj[keyName] = ratio
		})
		objArray.push(singleObj)
	})

	return objArray
}

const createFile = (pathName) => {
	const isExist = dupliCheck(pathName)
	if (isExist) return console.log('既存のパスが見つかりました')
	const targetObj = createObj()
	const toJSON = JSON.stringify(targetObj, null, 4) //行数が多いのでオプション指定して改行しておく
	fs.writeFile(pathName, toJSON, (err) => {
		if (err) throw err
		if (!err) {
			console.log('JSONファイルを生成しました')
		}
	})
}

const dupliCheck = (pathName) => {
	try {
		fs.statSync(pathName)
		return true
	} catch (err) {
		if (err.code === 'ENOENT') return false
	}
}

createFile('dailyRatioSample.json')
