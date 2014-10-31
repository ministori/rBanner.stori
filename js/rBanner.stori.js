/* ==================================================================================
 * Class
 ================================================================================== */

/**
 * rBannerStori Class
 * @namespace rBannerStori Class
 * 
 */
(function(){
	
	rBannerStori = function($rBannerItem){
		
		this.$currentBanner; //current Banner
		this.$nextBanner; // next Banner
		this.currentIndex = 0; // current Banner Index
		this.nextIndex; // next Banner Index
		this.bannerSize = $rBannerItem.size(); // banner count
		this.bannerWidth = $rBannerItem.width(); // banner width
		
		// variable for mobile
		this.prevTouchedIndex; // 터치한 배너의 이전(왼쪽) 인덱스
		this.nextTouchedIndex; // 터치한 배너의 다음(오른쪽) 인덱스
		
	};
	
	rBannerStori.prototype = {
		
		// contructor 명시
		constructor : rBannerStori,
		
		initDOM : function($target, $container, $rBannerItem, option){
			$target.addClass('rbs-stage').css({height:option.height + option.hUnit});
			$container.addClass('rbs-container');
			$rBannerItem.addClass('rbs-contents');
			$target.wrap('<div class="rbs-wrap"></div>');
			
		},
		
		initSequence : function($rBannerItem){
			$rBannerItem.each(function(i){
				$rBannerItem.eq(i).attr('data-seq', i);	
			});
		},
		
		initPlacement : function($container, $rBannerItem){
			var bannerWidth = this.bannerWidth = $rBannerItem.width();
			$container.css({left: -bannerWidth * 2});
			$rBannerItem.each(function(i){
				$rBannerItem.eq(i).css({ left: bannerWidth * $(this).attr('data-seq') });	
			});
		},
		
		initDirection : function($target){
			var $direction = '<div class="rbs-direction">';
			$direction 	 += '  <div class="prev">prev</div>';
			$direction 	 += '  <div class="next">next</div>';
			$direction 	 += '</div>';
			$target.append($direction);
			return true;
		},
		
		initPlayStop : function($target, type){
			var $wrap = '<div class="rbs-play-stop"></div>';
			var $play = '<div class="play">play</div>';
			var $stop = '<div class="stop">stop</div>';
			switch(type){
				case 'both': {
					$target.append($wrap);
					$('.rbs-play-stop').append($play).append($stop);
					break;
				}
				case 'toggle': {
					$target.append($wrap);
					$('.rbs-play-stop').append($stop);
					break;
				}
			}
			return true;
		},
		
		initPage : function($target){
			var bannerSize = this.bannerSize;
			var $pageContainer = '<div class="rbs-page-container"></div>';
			$target.append($pageContainer);
			for(var i=0;i<bannerSize;i++){
				var $pager = '<div class="pager">' + i + '</div>';
				$('.rbs-page-container').append($pager);
			}
			$('.pager').eq(0).addClass('current');
			return true;
		},
		
		initTimer : function($target){
			var $timerBar = '<div class="rbs-timer-bar">timer bar</div>';
			$target.append($timerBar);
			return true;
		}
		
	};
	
})();


// execute & event
/*
$(function(){
	
	var rB;
	
	$(window).on('load', function(){
		
		$rBannerItem = $('.rBanner_stage>.container>div');
		
		rB = new rBannerStori($rBannerItem);
		
		rB.init($rBannerItem);
		
		rB.initDirection($rBannerItem);
		
		rB.initPage($rBannerItem);
		
		rB.initTimer($rBannerItem);
		
	});
	
	$(window).on('resize', function(){
		rB.initPlacement($rBannerItem);
	});
	
});
*/


// plugin
$.fn.rBannerStori = function(options){
	
	// class object
	var rB;
	
	// this object
	var $target = $(this);
	var $container = $target.children();
	var $rBannerItem = $target.children().children();
	
	// default option
	var option = {
		// show controls
		direction : false, // prev, next
		playStop : false, // play, stop
		page : false, // page
		timer : false, // timer bar
		
		// set width, height
		wUnit : '%', // width unit
		hUnit : 'px', // height unit
		width : 100, // width value
		height : 500 // height value
	};
	
	// option merge - options 매개변수로 넘어오는 값을 option에 덮어씀
	$.extend(option, options);
	
	$(window).on('load', function(){
		
		rB = new rBannerStori($rBannerItem);
		
		//초기화
		rB.initSequence($rBannerItem);
		rB.initPlacement($container, $rBannerItem);
		rB.initDOM($target, $container, $rBannerItem, option);
		
		// 각 옵션값에 따른 초기화
		var isDirection = option.direction ? rB.initDirection($target) : false;
		var isPlayStop = option.playStop ? rB.initPlayStop($target, option.playStop) : false;
		var isPage = option.page ? rB.initPage($target) : false;
		var isTimer = option.timer ? rB.initTimer($target) : false;
		
	}).on('resize', function(){
		rB.initPlacement($container, $rBannerItem);
	});
	
	
	
};



