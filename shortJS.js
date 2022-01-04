// shortJS.js
// export default {Id, qcL}

// ss: String, not selector
export const Id0 = (id) => {
	return document.getElementById(id)
}
export const Id = (id) => {
	id = id.substring(0, 1) === '#' ? id.substring(1) : id
	return document.getElementById(id)
}

// selector
export const q = (sel) => document.querySelector(sel)
export const qAll = (sel) => document.querySelectorAll(sel)
export const oq = (o, sel) => o.querySelector(sel)
export const oqAll = (o, sel) => o.querySelectorAll(sel)

export const de = (f) => {
	document.addEventListener('DOMContentLoaded', f)
}

export const oe = (o, f, evNa = 'click') => {
	o.addEventListener(evNa, f)
}

export const dqoe = (sel, f) => {
	de(() => qe(sel, f))
}

export const qecL = (sel, selT, cN = 'is-active', mN = 'toggle') => {
	qe(sel, (e) => {
		e.stopPropagation()
		qcL(sel, cN, mN)
		qcL(selT, cN, mN)
	})
}

export const qe = (sel, f, evNa = 'click') => {
	oe(q(sel), f, evNa)
}

export const doe = (o, f) => {
	de(() => oe(o, f))
}

export const qAe = (sel, f, evNa = 'click') => {
	qAll(sel).forEach((o) => oe(o, (e) => f(e), evNa))
	// qAll(sel).forEach((o) => oe(o, (e) => f(e), evNa))
}

export const qAe_ocL = (sel, selTrgt, evNa = 'click') => {
	qAll(sel).forEach((o) => {
		oe(o, () => ocL(q(selTrgt)), evNa)
	})
}

export const qAe_ocL_T = (sel, selTrgt, evNa = 'click') => {
	qAll(sel).forEach((o) => {
		oe(
			o,
			() => {
				ocL(q(selTrgt))
				setTimeout(() => ocL(q(selTrgt)), 500)
			},
			evNa
		)
	})
}

export const qcL = (sel, cN = 'is-active', mN = 'toggle') =>
	q(sel).classList[mN](cN)

/* bulma-pageloader/ in bulma-extensions.min.css */
export const qcL_T = (sel, t = 1000, cN = 'is-active', mN = 'toggle') => {
	q(sel).classList[mN](cN)
	setTimeout(() => q(sel).classList[mN](cN), t)
}

export const ocL = (o, cN = 'is-active', mN = 'toggle') => o.classList[mN](cN)

export const qcLm = (
	sel,
	{ selT, cN = 'is-active' },
	mN = 'toggle',
	stopP = true
) => {
	ocLm(q(sel), { trgt: q(selT), cN }, mN, stopP)
}

export const ocLm = (
	o,
	{ trgt, cN = 'is-active' },
	mN = 'toggle',
	stopP = true
) => {
	oe(o, (e) => {
		if (stopP) e.stopPropagation()
		trgt.classList[mN](cN)
	})
}

export const oAcLm = (
	o,
	{ trgts, cN = 'is-active' }, // trgts: array
	mN = 'toggle',
	stopP = true
) => {
	oe(o, (e) => {
		if (stopP) e.stopPropagation()
		trgts.forEach((t) => t.classList[mN](cN))
	})
}

export const ogA = (o, ss) => o.getAttribute('data-' + ss)
export const ogD = (o, ss) => o.dataset[ss]
export const qogA = (sel, ss) => q(sel).getAttribute('data-' + ss)
export const qogD = (sel, ss) => q(sel).dataset[ss]

export const na = (ss) => document.getElementsByName(ss) // form radio

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
export const bulmaMenu = (ss, ssT) => {
	// $$de( () => {... この中で使う } )
	qecL(ss, ssT)
	qe('body', (e) => {
		// bodyをクリックしてメニューを消す
		e.stopPropagation()
		if (q(ss).classList.contains('is-active')) {
			qcL(ss)
			qcL(ssT)
		}
	})
}

export const bulmaTabs = (ssTabs, ssContent) => {
	const tabs = qAll(ssTabs)
	const boxes = qAll(ssContent)

	tabs.forEach((tab) => {
		const target = Id(tab.dataset.target)

		oe(tab, () => {
			bulmaTab(tabs, tab)
			bulmaTabR(boxes, target, 'is-hidden')
		})
	})
}

// bulmaTabs('.tabs li', '#tab-content > div');

export const bulmaTab = (items, target, cN = 'is-active') => {
	items.forEach((item) => {
		if (item === target) {
			ocL(item, cN, 'add')
		} else {
			ocL(item, cN, 'remove')
		}
	})
}

export const bulmaTabR = (items, target, cN = 'is-active') => {
	items.forEach((item) => {
		if (item === target) {
			ocL(item, cN, 'remove')
		} else {
			ocL(item, cN, 'add')
		}
	})
}

export const bulmaModal = (sel, selB, selM) => {
	qcLm(sel, { selT: selM })
	qcLm(selB, { selT: selM })
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
// Bulmaとは直接関係ありません。
export const codeS = (id) => {
	const pre1 = Id(id)
	if (!pre1) return

	oe(pre1, () => {
		document
			.getSelection()
			.setBaseAndExtent(pre1, 0, pre1, pre1.childNodes.length)
		// console.log('pre1.childNodes.length', pre1.childNodes.length);
	})
}

export const codeSA = (sel) => {
	qAll(sel).forEach((pre1) => {
		oe(pre1, () => {
			document
				.getSelection()
				.setBaseAndExtent(pre1, 0, pre1, pre1.childNodes.length)
		})
	})
}

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

  export const scrTT = (sel) =>
		$$.q(sel).scrollIntoView({
			behavior: 'smooth',
			block: 'start',
		})

  export const escape_html = (string) =>{
		if (typeof string !== 'string') {
			return string
		}
		return string.replace(/[&'`"<>]/g, function (match) {
			return {
				'&': '&amp;',
				"'": '&#x27;',
				'`': '&#x60;',
				'"': '&quot;',
				'<': '&lt;',
				'>': '&gt;',
			}[match]
		})
	}


		// function escape_html(string) {
		// 	if (typeof string !== 'string') {
		// 		return string
		// 	}
		// 	return string.replace(/[&'`"<>]/g, function (match) {
		// 		return {
		// 			'&': '&amp;',
		// 			"'": '&#x27;',
		// 			'`': '&#x60;',
		// 			'"': '&quot;',
		// 			'<': '&lt;',
		// 			'>': '&gt;',
		// 		}[match]
		// 	})
		// }

	// 未入力有り
	// const lengthE = (fs) => {
	// 	return fs.map((f) => f.trim() === '').includes(true)
	// }

	// const lengthR2 = fs => {
	// 	let b = fs.reduce((state, input) => {return (state |= input.trim()==='')}, false)
	// 	return b ? false : true

	// const lengthR = (fs) => {
	// 	let ss = fs
	// 		.map((f) => f.trim())
	// 		.reduce((state, input) => (state += input), '')
	// 	return ss === '' ? false : true
	// }

	// const length = (fs) => {
	// 	let ss = ''
	// 	fs.forEach((f) => (ss += f.trim()))
	// 	return ss === '' ? false : true
	// }


export default { Id, qcL }
