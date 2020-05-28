// 参数说明:
// outBox,包裹所有内容最大的盒子
// insideBox, 包裹li的盒子
// li,就是li标签
// buttonLeft,左按钮
// buttonRight,右按钮
// [circle,circleStyleName], 最小面的小圆圈,可写可不写
// intervalTime,多少时间换一次
// finishTime:多长时间完成动画
var move = {
	chuantong: function(config) {

		var index = 0;

		// 获取外面大盒子
		var $outBox = $(config.outBox);
		$outBox.css("overflow", "hidden");
		// 获取里面盒子,也就是动的盒子
		var $insideBox = $(config.insideBox);

		// 获取li
		var $li = $(config.li);
		$li.css("float", "left");
		// 小圆圈
		if (config.circle && config.circleStyleName) {

			var $circle = $(config.circle);

			var circleStyleName = config.circleStyleName;

			// 第一个园
			var $circleFirst = $circle.eq(0);

			// 先给第一个加样式
			$circleFirst.toggleClass(circleStyleName);
		} else {
			$circle = false;
		}

		//小圆圈样式


		// 间隔时间

		var intervalTime = config.intervalTime;

		// 完成时间

		var finishTime = config.finishTime;



		// 第一个li
		var $first = $li.eq(0);

		var everyoneWidth = $first.width();
		// 克隆第一个
		$insideBox.append($first.clone(true, true));

		var flag = true;

		var timer = setInterval(rightMove, intervalTime);
		// 向右移动
		function rightMove() {
			// 目前序号加
			index++;
			// 移动
			$insideBox.stop().animate({
				left: index * -everyoneWidth
			}, finishTime, function() {
				// 回调函数,移动到克隆的之后,在瞬移回去
				if (index >= $li.length) {

					index = 0;

					$insideBox.css("left", "0px");

				}
			});
			if ($circle) {
				move.circleChange(index, $circle, circleStyleName);
			}
		}

		$outBox.mouseenter(function() {
			clearInterval(timer);
		});
		$outBox.mouseleave(function() {
			timer = setInterval(rightMove, intervalTime);
		});


		var $buttonLeft = $(config.buttonLeft);

		var $buttonRight = $(config.buttonRight);

		$buttonLeft.click(function() {
			if (flag) {
				clearInterval(timer);

				index--;

				if (index < 0) {
					// 减一目的:从克隆的位置移动到倒数第二种图片上
					index = $li.length - 1;

					$insideBox.css("left", $li.length * -everyoneWidth);

				}
				if ($circle) {
					move.circleChange(index, $circle, circleStyleName);
				}

				$insideBox.stop().animate({

					"left": index * -everyoneWidth

				}, finishTime);

				flag = false;

				setTimeout(function() {
					flag = true;
				}, finishTime + 400);
			}
		});

		$buttonRight.click(function() {
			if (flag) {
				clearInterval(timer);
				rightMove();
				flag = false;
				setTimeout(function() {
					flag = true;
				}, finishTime + 400);
			}
		});
		if ($circle) {
			$circle.each(function(idx, item) {
				$circle.eq(idx).click(function() {

					index = idx;

					move.circleChange(index, $circle, circleStyleName);

					$insideBox.stop().animate({

						"left": index * -everyoneWidth

					}, finishTime);
				});
			});
		}
	},
	jianbian: function(config) {

		var index = 0;

		// 获取外面大盒子
		var $outBox = $(config.outBox);
		$outBox.css({
			"overflow": "hidden",
			"position": "relative"
		});
		// 获取里面盒子,也就是动的盒子
		var $insideBox = $(config.insideBox);

		// 获取li
		var $li = $(config.li);
		$li.css({
			"position": "absolute",
			"left":"0px",
			"top":"0px",
			"opacity":"0"
		});
		// 小圆圈
		$li.eq(0).css("opacity","1");
		if (config.circle && config.circleStyleName) {

			//小圆圈样式
			var $circle = $(config.circle);

			var circleStyleName = config.circleStyleName;

			var $circleFirst = $circle.eq(0);
			// 先给第一个加样式
			$circleFirst.toggleClass(circleStyleName);
		} else {
			$circle = false;
		}



		// 间隔时间

		var intervalTime = config.intervalTime;

		// 完成时间

		var finishTime = config.finishTime;



		var timer = setInterval(rightMove, intervalTime);

		function rightMove() {

			$li.eq(index).stop().animate({
				"opacity": 0
			}, finishTime);

			if (index == $li.length - 1) {

				index = -1;
			}

			index++;

			$li.eq(index).stop().animate({
				"opacity": 1
			}, finishTime);

			if ($circle) {
				move.circleChange(index, $circle, circleStyleName);
			}

		}

		$outBox.mouseenter(function() {
			clearInterval(timer);
		});

		$outBox.mouseleave(function() {
			timer = setInterval(rightMove, intervalTime);
		});

		var flag = true; //节流

		var $buttonLeft = $(config.buttonLeft);

		var $buttonRight = $(config.buttonRight);

		$buttonLeft.click(function() {

			if (flag) {
				$li.eq(index).stop().animate({
					"opacity": 0
				}, finishTime);

				index--;

				if (index < 0) {
					index = $li.length - 1;
				}

				$li.eq(index).stop().animate({
					"opacity": 1
				}, finishTime);
				if ($circle) {
					move.circleChange(index, $circle, circleStyleName);
				}
				flag = false;

				setTimeout(function() {
					flag = true;
				}, finishTime + 400);
			}

		});

		$buttonRight.click(function() {
			if (flag) {
				rightMove();
				flag = false;
				setTimeout(function() {
					flag = true;
				}, finishTime + 400);
			}
		});

		if ($circle) {
			$circle.each(function(idx, item) {
				$circle.eq(idx).click(function() {

					$li.eq(index).animate({
						"opacity": 0
					}, finishTime);

					index = idx;

					$li.eq(index).animate({
						"opacity": 1
					}, finishTime);

					move.circleChange(index, $circle, circleStyleName);
				});
			});
		}
	},


	circleChange: function(index, $circle, circleStyleName) {

		var n = index >= $circle.length ? 0 : index;
		$circle.eq(n).addClass(circleStyleName).siblings().removeClass(circleStyleName);
	}
}
