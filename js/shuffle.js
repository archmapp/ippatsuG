// https://bitto.jp/posts/%E6%8A%80%E8%A1%93/JavaScript/js-shuffle-and-sort/

// シャッフルするにはランダムに正の値と負の値を返せばシャッフルできる。

// 配列にソートされていない数字を用意
const array = [3, 9, 1, 2, 4, 5, 6, 7, 8, 10]

// 並び替えルールを関数で提供
array.sort((a, b) => a - b)

// 結果: [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 ]
console.log('ソート:')
console.log(array)

// 配列にソートされている数字を用意
const array2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

// シャッフルするにはランダムに正の値と負の値を返す。
// ランダムに-0.5〜0.5の数値を返す
array2.sort(() => Math.random() - 0.5)

// console.log('')
console.log('\n', 'シャッフル:')
console.log(array2)
// 結果: [ 7, 3, 8, 2, 4, 6, 5, 1, 9, 10 ]


// おまけ: 配列に shuffle メソッドを追加実装
// 配列にshuffleメソッドを追加  
Array.prototype.shuffle = function () {  
  this.sort(() => Math.random() - 0.5);  
}  

// 配列にソートされている数字を用意  
const array3 = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];  
// const array3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];  

// shuffleメソッドをコール  
array3.shuffle();  

console.log("\n", '配列に shuffle メソッドを追加実装:')
console.log(array3);  
// 結果: [ 5, 2, 1, 7, 9, 3, 6, 8, 10, 4 ]  
