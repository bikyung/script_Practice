const btnCall = document.querySelector('.btnCall');

btnCall.addEventListener('click', (e) => {
	e.preventDefault();
	e.target.classList.toggle('on');
});
