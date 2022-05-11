const btns = document.querySelectorAll('section ul li');
const boxs = document.querySelectorAll('.box article');

btns.forEach((btn, idx) => {
	btn.addEventListener('click', (e) => {
		e.preventDefault();

		let isOn = e.currentTarget.classList.contains('on');
		if (isOn) return;
		activation(idx, boxs);
		activation(idx, btns);
	});
});

function activation(idx, arr) {
	for (const el of arr) {
		el.classList.remove('on');
	}
	arr[idx].classList.add('on');
}
