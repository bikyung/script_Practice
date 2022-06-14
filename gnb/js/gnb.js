const gnb_lis = document.querySelectorAll('#gnb>li');
console.log(gnb_lis);

gnb_lis.forEach((li, idx) => {
	//li에 마우스엔터했을때
	li.addEventListener('mouseenter', (e) => {
		e.preventDefault();
		//현재 li의 자식인 .sub를 찾아서 block 처리
		const sub = e.currentTarget.querySelector('.sub');
		sub.style.display = 'block';

		//현재 li의 1depth를 찾아서 활성화
		const depth1 = e.currentTarget.children[0];
		console.log(depth1);
		depth1.classList.add('on');
	});
	//li에 마우스리브했을때
	li.addEventListener('mouseleave', (e) => {
		e.preventDefault();
		//현재 li의 자식인 sub를 찾아서 안보이게 처리
		const sub = e.currentTarget.querySelector('.sub');
		sub.style.display = 'none';

		//현재 li의 1depth를 찾아서 비활성화
		const depth1 = e.currentTarget.children[0];
		depth1.classList.remove('on');
	});

	//1depth에 포커스인 되었을때
	li.addEventListener('focusin', (e) => {
		e.preventDefault();
		//현재 li의 자식인 sub를 찾아서 block처리
		const sub = e.currentTarget.querySelector('.sub');
		sub.style.display = 'block';

		//현재 1depth a는 활성화
		const depth1 = e.currentTarget.children[0];
		depth1.classList.add('on');
	});
	// sub ul 안의 마지막 li를 찾아서
	const sub = li.querySelector('.sub ul');
	const lastEl = sub.lastElementChild;

	//마지막 li에서 포커스 아웃 되었을 떄
	lastEl.addEventListener('focusout', (e) => {
		const sub = e.currentTarget.closest('.sub');
		sub.style.display = 'none';

		// 1depth a를 찾아서 비 활성화
		const depth1 = sub.closest('li').children[0];
		depth1.classList.remove('on');
	});
});
