/* 
form_ validation 유효성 검사 
만약 input에 값을 입력하지 않거나,또는 조건을 만족하지 않는다면 
id,password, select, radio, checkobx, email,textarea
submit 버튼을 클릭했을때 e.preventDefault로 페이지 이동 방지
*/

const form = document.querySelector('#member');
const btnSubmit = form.querySelector('input[type=submit]');
//제출 버튼을 클릭했을때
btnSubmit.addEventListener('click', (e) => {
	//함수의 결과값이 false라면 페이지 이동 금지
	if (!isTxt('userid', 5)) e.preventDefault();
	if (!isTxt('comments', 20)) e.preventDefault();
	if (!isEmail('email', 5)) e.preventDefault();
	if (!isCheck('hobby')) e.preventDefault();
	if (!isCheck('gender')) e.preventDefault();
	if (!isSelect('edu')) e.preventDefault();
});

function isTxt(name, len) {
	//인풋요소를 변수로 담아서
	const input = form.querySelector(`[name=${name}]`);
	//인풋요소에 사용자가 입력한 value값을 변수로 저장
	const txt = input.value.trim(); //공백을 제외한 value값을 저장

	//사용자가 입력한 value값의 길이가 len개 이상이라면
	if (txt.length > len) {
		//에러메시지가 남아있는 게 있다면 제거
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		return true;

		//조건을 만족하지 않는다면
	} else {
		//기존에 있는 에러메시지를 찾아서 있다면 제거하고
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		//에러메시지를 새로 생성해서 삽입
		const errMsg = document.createElement('p');
		errMsg.append(`텍스트를 ${len}글자 이상 입력하세요`);
		input.closest('td').append(errMsg);

		return false;
	}
}

function isEmail(name, len) {
	const input = form.querySelector(`[name=${name}]`);
	const txt = input.value;

	if (txt.length > len && /@/.test(txt)) {
		return true;
	} else {
		const errMsgs = input.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) input.closest('td').querySelector('p').remove();

		const errMsg = document.createElement('p');
		errMsg.append(`@를 포함한 전체 이메일 주소를 ${len}글자이상 입력하세요.`);
		input.closest('td').append(errMsg);
		return false;
	}
}

function isCheck(name) {
	const inputs = form.querySelectorAll(`[name=${name}]`);
	let isChecked = false;

	//input의 갯수만큼 반복을 돌면서 체크가 하나라도 되어있다면 isChecked를 true로 바꿈
	for (let input of inputs) {
		if (input.checked) isChecked = true;
	}

	if (isChecked) {
		const errMsgs = inputs[0].closest('td').querySelectorAll('p');
		if (errMsgs.length > 0)
			inputs[0].closest('td').querySelector('p').remove();

		return true;
	} else {
		const errMsgs = inputs[0].closest('td').querySelectorAll('p');
		if (errMsgs.length > 0)
			inputs[0].closest('td').querySelector('p').remove();

		const errMsg = document.createElement('p');
		errMsg.append('필수입력항목을 하나 이상 체크해주세요');
		inputs[0].closest('td').append(errMsg);
		//요소.closest(부모요소)
		return false;
	}
}

function isSelect(name) {
	const sel = form.querySelector(`[name=${name}]`);
	const sel_index = sel.options.selectedIndex; //selectedIndex 선택한 option의 순서값
	const val = sel.options[sel_index].value; // 선택한 option의 value 값 저장
	if (val !== '') {
		const errMsgs = sel.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) sel.closest('td').querySelector('p').remove();
		return true;
	} else {
		const errMsgs = sel.closest('td').querySelectorAll('p');
		if (errMsgs.length > 0) sel.closest('td').querySelector('p').remove();
		const errMsg = document.createElement('p');
		errMsg.append('항목을 선택해주세요.');
		sel.closest('td').append(errMsg);
		return false;
	}
}
