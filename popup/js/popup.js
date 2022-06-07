const btnView = document.querySelector('.view');
const btnDel = document.querySelector('.del');
const popup = document.querySelector('#popup');
const btnClose = popup.querySelector('.close');
const isCookie = document.cookie.indexOf('today=done');
let isOn;

isCookie === -1 ? (isOn = 'block') : (isOn = 'none');
popup.style.display = isOn;

//쿠키 삭제 버튼
btnDel.addEventListener('click', (e) => {
	e.preventDefault();
	setCookie('today', 'done', 0);
	alert('쿠키를 삭제했습니다.');
});

//쿠키 생성 버튼
btnView.addEventListener('click', (e) => {
	e.preventDefault();
	console.log(document.cookie);
});

//팝업 닫기 버튼 클릭 이벤트
btnClose.addEventListener('click', (e) => {
	e.preventDefault();

	let isChecked = popup.querySelector('input[type=checkbox]').checked;
	if (isChecked) setCookie('today', 'done', 1);
	popup.style.display = 'none';
});

function setCookie(name, val, due) {
	const today = new Date();
	const day = today.getDate();
	today.setDate(day + due);
	const duedate = today.toGMTString();

	document.cookie = `${name}=${val}; path=/; expires=${duedate}`;
}
