import React from 'react'
import Flashcard from './Flashcard'

export default function FlashcardList({
	flashcards,
	flashcardNO,
	flipALL,
	setFlipALL,
	running,
	startedID,
	setRunning,
	setSeikai,
	seikai,
	conf,
	setConf,
}) {
	const card100 = {
		height: '100px',
		borderRadius: '.25rem',
		boxShadow: '0 0 5px 5px rgba(0, 136, 204, .3)',
		backgroundColor: 'rgb(0, 136, 204)',
		position: 'absolute',
		top: '50%',
		left: '50%',
		marginRight: '-50%',
		transform: 'translate(-50%, -50%)',
	}

	return (
		<div className="card-grid py-2">
			{Object.entries(flashcards).map(([id, flashcard]) => {
				return (
					<Flashcard
						id={id}
						flashcard={flashcard}
						flashcardNO={flashcardNO}
						flipALL={flipALL}
						setFlipALL={setFlipALL}
						running={running}
						startedID={startedID}
						setRunning={setRunning}
						setSeikai={setSeikai}
						seikai={seikai}
						setConf={setConf}
						key={id}
					/>
				)
			})}
			{((running && flipALL) || conf) && (
				<div id="100" className="id100" style={card100}>
					<img
						src={flashcards[flashcardNO]}
						alt={flashcards[flashcardNO]}
						className="cover"
					/>
				</div>
			)}
		</div>
	)
}
