// target:".box>ul>li", 	 给谁绑定事件
// content:".content>ul>li", 要奔向的区域
// className:"current" 		 添加的样式名
// completeTime: 800		 动画完成的时间


function NavTool(config) {
	var $target = $(config.target);

	var $content = $(config.content);

	var style = config.className;

	var time = config.completeTime;
	
	if (config.moreContent){
		var moreContent = config.moreContent;
	}else{
		var moreContent = 0;
	}
	
	$target.click(function(targetIdx, targetItem) {
		
		$(window).off("scroll");
		
		var clickIndex = $(this).index();
		
		addClassName(clickIndex);
		
		for (var i = 0; i < $target.length; i++) {
			if (clickIndex == i) {
				$("html,body").stop().animate({
					"scrollTop": $content.eq(clickIndex).offset().top + moreContent
				}, time,function() {
					$(window).scroll(function() {
						check();
					});
				});
			}
		}
	});
	
	
	
	$(window).scroll(function() {
		check();
	});

	function check() {
		// 当前现在所在位置的scrollTop值
		var nowScrollTop = $(window).scrollTop();

		$content.each(function(index, item) {
			if (nowScrollTop >= $content.eq(index).offset().top + moreContent) {
				addClassName(index);
			}
		});
	}

	function addClassName(num) {
		
		$target.eq(num).addClass(style).siblings().removeClass(style);
	}
}
