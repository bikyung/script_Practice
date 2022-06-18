$(function () {
	$('h1').css({
		color: 'blue',
	});

	$('.typo .inner').css({
		color: 'red',
		fontSize: '50px',
	});

	// $('.typo').on('mouseover', function () {
	// 	$(this).css({
	// 		background: 'green',
	// 	});
	// });

	// $('.typo').on('mouseout', function () {
	// 	$(this).css({
	// 		background: 'blue',
	// 	});
	// });

	// 메서드 체인 및 on 메서드 줄여쓰기
	$('.typo, h1')
		.mouseover(function () {
			$(this).css({
				background: 'green',
			});
		})
		.mouseout(function () {
			$(this).css({
				background: 'hotpink',
			});
		});

	$('.typo .inner').click(function () {
		$(this).animate(
			{
				oparcity: '0',
				fontSize: '0px',
			},
			1500,
			'easeInOutElastic',
			function () {
				$(this).animate(
					{
						oparcity: 1,
						fontSize: '50px',
					},
					500
				);
			}
		);
	});

	$('.menu li').mouseover(function () {
		$(this).css({
			background: 'gray',
		});
	});
	$('.btn').click(function () {
		$('.menu').toggle();
	});

	$('.boxBtn').click(function () {
		$('.box')
			.stop()
			.animate(
				{
					height: '500px',
				},
				function () {
					$(this).animate({ height: '100px' }, 500);
				}
			);
	});

	$('.box')
		.mouseover(function () {
			$(this).stop().animate(
				{
					backgroundColor: 'blue',
				},
				500
			);
		})
		.mouseout(function () {
			$(this).animate(
				{
					backgroundColor: 'green',
				},
				500
			);
		});
});
