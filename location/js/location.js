const container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
const options = {
	//지도를 생성할 때 필요한 기본 옵션
	center: new kakao.maps.LatLng(37.46487623315252, 126.69338834686393), //지도의 중심좌표.
	level: 3, //지도의 레벨(확대, 축소 정도)
};

const t_on = document.querySelectorAll('.traffic li')[0];
const t_off = document.querySelectorAll('.traffic li')[1];
const branchs = document.querySelectorAll('.branch li');
console.log(t_off);
// 이동 이동 가능
const drag = true;
// 지도 확대/축소 기능
const zoom = true;

const map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

// 마커를 표시할 위치와 title 객체 배열입니다
var markerOptions = [
	{
		title: '인천 간석점',
		latlng: new kakao.maps.LatLng(37.46487623315252, 126.69338834686393),
		imgSrc: 'img/marker_1.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99) },
		button: branchs[0],
	},
	{
		title: '인천 부평점',
		latlng: new kakao.maps.LatLng(37.48949503936427, 126.72396456164238),
		imgSrc: 'img/marker_2.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99) },
		button: branchs[1],
	},
	{
		title: '인천 주안점',
		latlng: new kakao.maps.LatLng(37.46505622382126, 126.67972149625555),
		imgSrc: 'img/marker_3.png',
		imgSize: new kakao.maps.Size(232, 99),
		imgPos: { offset: new kakao.maps.Point(116, 99) },
		button: branchs[2],
	},
];

//반복을 돌면서 마커를 특정 이미지로 특정위치에 배치
for (let i = 0; i < markerOptions.length; i++) {
	new kakao.maps.Marker({
		map: map,
		position: markerOptions[i].latlng,
		title: markerOptions[i].title,
		image: new kakao.maps.MarkerImage(
			markerOptions[i].imgSrc,
			markerOptions[i].imgSize,
			markerOptions[i].imgPos
		),
	});

	//branch 버튼 클릭 이벤트 연결
	markerOptions[i].button.addEventListener('click', (e) => {
		e.preventDefault();
		for (const btn of branchs) {
			btn.classList.remove('on');
		}
		branchs[i].classList.add('on');
		moveTo(markerOptions[i].latlng);
	});
}

window.addEventListener('resize', () => {
	let active_btn = document.querySelector('.branch li.on');
	let active_index = active_btn.getAttribute('data-index');
	console.log(active_index);
	map.setCenter(markerOptions[1].latlng);
});

//컨트롤 보이기
const mapTypeControl = new kakao.maps.MapTypeControl();
map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPLEFT);

//교통정보 보기/끄기 버튼 이벤트
t_on.addEventListener('click', (e) => {
	e.preventDefault();
	// 지도에 교통정보를 표시하도록 지도타입을 추가합니다
	if (t_on.classList.contains('on')) return;
	map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	t_on.classList.add('on');
	t_off.classList.remove('on');
});

t_off.addEventListener('click', (e) => {
	e.preventDefault();
	// 아래 코드는 위에서 추가한 교통정보 지도타입을 제거합니다
	map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
	if (t_off.classList.contains('on')) return;
	t_off.classList.add('on');
	t_on.classList.remove('on');
});

setDraggable(drag);
//지도이동 함수 정의
function setDraggable(draggable) {
	// 마우스 드래그로 지도 이동 가능여부를 설정합니다
	map.setDraggable(draggable);
}

setZoomable(zoom);

// 버튼 클릭에 따라 지도 확대, 축소 기능을 막거나 풀고 싶은 경우에는 map.setZoomable 함수를 사용합니다
function setZoomable(zoomable) {
	// 마우스 휠로 지도 확대,축소 가능여부를 설정합니다
	map.setZoomable(zoomable);
}

function moveTo(target) {
	const moveLatLon = target;
	map.setCenter(moveLatLon);
}
