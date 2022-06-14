const skipNavi = document.querySelectorAll('#skipNavi li a');

for (const el of skipNavi) {
	el.addEventListener('focusin', (e) => {
		e.preventDefault();
		el.classList.add('on');
	});
	el.addEventListener('focusout', (e) => {
		e.preventDefault();
		el.classList.remove('on');
	});
}
