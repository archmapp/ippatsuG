import React, { useState, useEffect, useRef } from 'react'

// import { qcL } from './shortJS.js'

export default function Flashcard({
	id,
	flashcard,
	flashcardNO,
	flipALL,
	setFlipALL,
	running,
	startedID,
	setRunning,
	setSeikai,
	seikai,
	setConf,
}) {
	const [flip, setFlip] = useState(false)

	const frontEl = useRef()
	const backEl = useRef()
	const clickFlag = useRef()

	useEffect(() => {
		setFlip(flipALL)
		if (!flipALL) setTimeout(() => (clickFlag.current = 0), 0)
	}, [flipALL])

	const clickHandler = (e) => {
		// console.log(e.target)
		// console.log(+e.currentTarget.id)
		// console.log(flashcardNO)
		console.log(+e.currentTarget.id === flashcardNO)
		if (running) {
			setFlip(!flip)
			let cF = +e.currentTarget.id === flashcardNO ? 1 : -1
			if(cF===1 && !startedID.current) {cF=2}
			setSeikai(cF)
			clickFlag.current = cF
			setRunning(false)
			setTimeout(() => {
				setFlipALL(false)
				setConf(true)
			}, 1000)
		}
	}

	return (
		<div
			id={`${id}`}
			className={`card ${flip ? 'flip' : ''}`}
			onClick={clickHandler}
		>
			<div className="front" ref={frontEl}>
				{clickFlag.current === 1 && (
					<div className="has-text-centered has-text-weight-semibold has-text-danger mb-1">
						〇
					</div>
				)}
				{clickFlag.current === -1 && (
					<div className="has-text-centered has-text-weight-semibold mb-1">
						X
					</div>
				)}
				<img src={flashcard} alt="flashcard" className="cover" />
			</div>

			<div className="back" ref={backEl}>
				クリック
			</div>
		</div>
	)
}
