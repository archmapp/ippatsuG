import React, { useState, useEffect, useRef, useCallback } from 'react'
import FlashcardList from './FlashcardList'
import './css/ripple.css'
import './App.css'

import $$ from './shortJS'
import { cats, imgs } from './imgs'

const MAX_IMGS = 8

// .log(imgs)

function App() {
	const [flashcards, setFlashcards] = useState(imgs)
	const [flashcardNO, setFlashcardNO] = useState(0)
	const [kiokuJikanID, setKiokuJikanID] = useState(10)
	const [seikai, setSeikai] = useState(0)
	// console.log('🚀 ~ file: App.js:45 ~ flashcardNO', flashcardNO)
	const [flipALL, setFlipALL] = useState(false)
	const [running, setRunning] = useState(false)
	const [conf, setConf] = useState(false)

	const categoryEl = useRef()
	let timeoutID = useRef()
	let startedID = useRef(null)

	const handleSelect = useCallback(() => {
		clearTimeout(timeoutID.current)
		timeoutID.current = null

		let imgSel = [...imgs]
		const cat = categoryEl.current.value

		if (cat === 'パレットのみ') {
			imgSel = imgs.filter((questionItem) => {
				return /^\.\/img\/Palette/.test(questionItem)
			})
		}
		// console.log('🚀 ~ file: App.js ~ line 45 ~ imgSel ~ imgSel', imgSel)
		imgSel.sort(() => Math.random() - 0.5) // シャッフル
		setFlashcards(imgSel.splice(0, MAX_IMGS)) // splice(0,8): 切り取った先頭8枚を返す
		console.log('🚀 ~ file: App.js ~ line 45 ~ imgSel ~ imgSel', imgSel) // 残り
		setFlashcardNO(Math.floor(Math.random() * MAX_IMGS))

		reset_0()
		// return handleSelect()
	}, [])

	useEffect(() => {
		$$.oe(
			document,
			(e) => {
				if (e.key === 'Escape') {
					// console.log(e.key)
					$$.qcL('.quickT')
				}
			},
			'keyup'
		)
		$$.qcLm('#quick', { selT: '.quickT' })
		// bulmaQuickview.attach()

		handleSelect()
	}, [handleSelect])

	function handleJikan(e) {
		setKiokuJikanID((curr) => (curr === 10 ? 5 : 10))

		e.target.blur()
	}

	function reset_0() {
		setSeikai(0)
		setFlipALL(false)
		setRunning(false)
		setConf(false)
	}

	function handleStart() {
		handleSelect()
		reset_0()
		setSeikai(11)
		timeoutID.current = setTimeout(() => start(), kiokuJikanID * 1000)
	}

	function start() {
		startedID.current = setTimeout(() => {
			startedID.current = null
		}, 3000)
		setSeikai(0)
		setFlipALL(true)
		setRunning(true)
		setConf(false)
	}

	return (
		<>
			<form className="header is-size-7-mobile px-2 mb-0">
				<div className="form-group">
					<label htmlFor="category" className="">
						画像選択
					</label>
					<select id="category" ref={categoryEl} onChange={handleSelect}>
						{cats.map((category) => {
							return (
								<option value={category.id} key={category.id}>
									{category.name}
								</option>
							)
						})}
					</select>
				</div>

				<div className="is-flex is-align-items-center">
					{seikai === 1 && (
						<span style={{ color: 'red', fontWeight: 'bold' }}>最高</span>
					)}
					{seikai === 2 && <span style={{ color: 'red' }}>正解</span>}
					{seikai === -1 && <span style={{ color: '#777' }}>残念</span>}
					{seikai === 0 && <span> </span>}
					{seikai === 11 && (
						<span>
							<progress
								className="progress is-danger"
								// style={{ width: '7rem' }}
								// style={{ width: '3rem' }}
								// value="100"
								max="100"
							>
								100%
							</progress>
						</span>
					)}
					<span className="form-group ml-3">
						<button
							className="btn is-size-7-mobile"
							type="button"
							onClick={() => handleStart()}
						>
							スタート
						</button>
					</span>
				</div>
				{/* button 要素の type属性の初期値は submit なので、フォーム内で送信ボタンとする場合は type属性を省略できます。

				※ 但し、逆に言うとフォーム内で type属性を指定していない場合や type属性が空であったり不正な値であったりした場合は送信ボタンとなります。 
				*/}
			</form>

			{/* <div className="containerOut"> */}
			<div
				className="containerKyle mb-0"
				style={{ display: 'flex', flexDirection: 'column' }}
			>
				<div className="title px-4 py-2 my-0" id="order">
					<h3 className="is-size-4">一発勝負❣</h3>
					<h4
						className="is-size-7-mobile is-size-6-tablet has-tooltip-bottom my-1"
						data-tooltip="記憶力強化"
					>
						トランプゲーム
					</h4>
					<ul className="mt-2">
						<li>
							<span className="is-flex is-align-items-center">
								<span>
									[<span>スタート</span>]
								</span>
								ボタンを押して、
								<span
									className="jikan has-tooltip-bottom has-tooltip-danger"
									data-tooltip="記憶時間: 10秒／5秒"
								>
									<button
										id="jikan"
										className={`button is-danger py-3 ${
											kiokuJikanID === 5 ? 'px-2' : 'px-1'
										}`}
										style={{ height: '0.97rem' }}
										onClick={(e) => handleJikan(e)}
									>
										{kiokuJikanID}秒間
									</button>
								</span>
								で記憶し
							</span>
						</li>
						<li className="mt-1">
							<span>その後、表示された図柄を見つけてください</span>
						</li>
					</ul>
				</div>

				<div>
					<FlashcardList
						flashcards={flashcards}
						flashcardNO={flashcardNO}
						flipALL={flipALL}
						setFlipALL={setFlipALL}
						running={running}
						startedID={startedID}
						setRunning={setRunning}
						setSeikai={setSeikai}
						seikai={seikai}
						conf={conf}
						setConf={setConf}
					/>
				</div>
			</div>

			<nav id="orderB">
				<div className="is-flex is-justify-content-center is-align-items-center mt-0 py-2 ">
					{/* <div className="is-flex is-justify-content-center is-align-items-center has-background-grey py-2 "> */}
					<button
						className="button is-primary has-tooltip-top has-tooltip-warning"
						data-tooltip="トグル: [Escape]キーも可"
						id="quick"
					>
						ゲーム一覧
					</button>
					<span className="has-text-white ml-5">そのほかの ゲームアプリ</span>
				</div>
			</nav>

			<article>
				<div className="quickview quickT">
					<div className="box p-2" style={{ backgroundColor: '#375A7F' }}>
						<header className="quickview-header">
							<p className="is-size-4 has-text-white">ゲーム一覧</p>
							<span
								className="delete deleteQV"
								onClick={() => {
									$$.qcL('.quickT')
								}}
								// data-dismiss="quickview"
							></span>
						</header>

						<div className="quickview-body">
							<article className="message is-primary mb-0">
								<div className="message-header pb-1">
									<p>リンク先</p>
								</div>
								<div className="message-body is-size-6 py-2 px-0">
									<table className="table is-hoverable">
										<tbody>
											<tr>
												<th className="has-text-right is-flex-grow-5">
													<a href="https://affectionate-wozniak-de01a2.netlify.app/">
														初めての【 けいさん 】
													</a>
												</th>
												<td className="td_flex-direction is-size-7 is-flex-grow-4">
													だれでもできる
												</td>
											</tr>
											<tr>
												<th className="has-text-right is-flex-grow-5">
													<a href="https://jolly-lamport-67e201.netlify.app">
														しんけいすいじゃく
													</a>
												</th>
												<td className="td_width is-size-7 is-flex-grow-4">
													忍者トランプ
												</td>
											</tr>
											<tr>
												<th className="has-text-right is-flex-grow-5">
													<a href="https://flashcard2.netlify.app">
														一発勝負 <span style={{ color: 'red' }}>❣</span>
													</a>
												</th>
												<td className="td_boxes is-size-7 is-flex-grow-4">
													記憶ゲーム
												</td>
											</tr>
											<tr>
												<th className="has-text-right is-flex-grow-5">
													<a href="https://space-game2.netlify.app">
														いん石を狙え <span style={{ color: 'red' }}>❣</span>
													</a>
												</th>
												<td className="td_boxes is-size-7 is-flex-grow-4">
													宇宙の旅
												</td>
											</tr>
										</tbody>
									</table>
								</div>
							</article>
							<article className="message is-primary mt-3">
								<div className="message-header py-2 is-justify-content-center">
									<p className="is-size-7">
										<span>このビューの開閉について (トグル操作)</span>
									</p>
								</div>
								<div className="message-body py-1 ml-5">
									<ul>
										<li>
											画面下の［
											<span className="has-background-primary has-text-white">
												ゲーム一覧
											</span>
											］ボタンをクリックして開く
										</li>
										<li>
											[
											<span className="has-background-primary has-text-white">
												ESC
											</span>
											］キーを押して開閉することも出来ます
										</li>
									</ul>
								</div>
							</article>
						</div>

						<footer className="quickview-footer has-background-primary mt-4 mt-2 pb-3">
							<div
								className="mt-3"
								style={{ textAlign: 'center', width: '500px' }}
							>
								<div className="is-half-mobile is-one-quarter-desktop">
									<h6 className="title arch is-size-5 pb-1 pt-1 mb-4">
										提供:{' '}
										<span className="is-size-5 my-1">アーキエムアップ</span>
									</h6>
									<p>
										<a href="http://www.archmapp.tech/">
											<strong className="is-success">
												第二版・Bulmaと共に！
											</strong>
										</a>
									</p>
									<address>
										<strong
											className="is-size-5 px-2 mb-3"
											style={{ background: '#e3c800' }}
										>
											Bulma Project
										</strong>
										<p className="mt-3 is-size-7">北九州</p>

										<i className="fas fa-fw fa-envelope lightcoral"></i>
										<span className="mb-5">
											<a href="mailto:archmapp@i.softbank.jp">
												archmapp@i.softbank.jp
											</a>
										</span>
									</address>
								</div>
							</div>
						</footer>
					</div>
				</div>
			</article>
		</>
	)
}

export default App
