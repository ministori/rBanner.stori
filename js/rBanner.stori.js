/* ==================================================================================
 * Class
 ================================================================================== */

/**
 * rBanner Class
 * @namespace rBanner Class
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
		
		initClass : function($rBannerItem){
			$rBannerItem.parent().parent().addClass('rbs-stage');
			$rBannerItem.parent().addClass('rbs-container');
			$rBannerItem.addClass('rbs-contents');
		},
		
		initSequence : function($rBannerItem){
			$rBannerItem.each(function(i){
				$rBannerItem.eq(i).attr('data-seq', i);	
			});
		},
		
		initPlacement : function($rBannerItem){
			var bannerWidth = this.bannerWidth = $rBannerItem.width();
			$rBannerItem.each(function(i){
				var seq = $(this).attr('data-seq');
				$rBannerItem.eq(i).css({left: bannerWidth*seq});	
			});
		},
		
		init : function($rBannerItem){
			this.initClass($rBannerItem);
			this.initSequence($rBannerItem);
			this.initPlacement($rBannerItem);
		},
		
		initDirection : function($rBannerItem){
			var $stage = $rBannerItem.parents('.rbs-stage');
			var $direction = '<div class="rbs-direction">';
			$direction 	 += '  <div class="prev">prev</div>';
			$direction 	 += '  <div class="next">next</div>';
			$direction 	 += '</div>';
			$stage.append($direction);
			return true;
		},
		
		initPlayStop : function($rBannerItem, type){
			var $stage = $rBannerItem.parents('.rbs-stage');
			var $wrap = '<div class="rbs-play-stop"></div>';
			var $play = '<div class="play">play</div>';
			var $stop = '<div class="stop">stop</div>';
			switch(type){
				case 'both': {
					$stage.append($wrap);
					$('.rbs-play-stop').append($play).append($stop);
					break;
				}
				case 'toggle': {
					$stage.append($wrap);
					$('.rbs-play-stop').append($stop);
					break;
				}
			}
			
		},
		
		initPage : function($rBannerItem){
			var $stage = $rBannerItem.parents('.rbs-stage');
			var bannerSize = this.bannerSize;
			var $pageContainer = '<div class="rbs-page-container"></div>';
			$stage.append($pageContainer);
			for(var i=0;i<bannerSize;i++){
				var $pager = '<div class="pager">' + i + '</div>';
				$('.rbs-page-container').append($pager);
			}
			$('.pager').eq(0).addClass('current');
			return true;
		},
		
		initTimer : function($rBannerItem){
			var $stage = $rBannerItem.parents('.rbs-stage');
			var $timerBar = '<div class="rbs-timer-bar">timer bar</div>';
			$stage.append($timerBar);
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
	
	// default option
	var option = {
		direction : false, // prev, next
		playStop : false, // play, stop
		page : false, // page
		timer : false // timer bar
	};
	
	// option merge - options 매개변수로 넘어오는 값을 option에 덮어씀
	$.extend(option, options);
	
	$(window).on('load', function(){
		
		$rBannerItem = $target.children(':first-child').children();
		rB = new rBannerStori($rBannerItem);
		
		//초기화
		rB.init($rBannerItem);
		
		// 각 옵션값에 따른 초기화
		var isDirection = option.direction ? rB.initDirection($rBannerItem) : false;
		
		var isPlayStop = option.playStop ? rB.initPlayStop($rBannerItem, option.playStop) : false;
		
		var isPage = option.page ? rB.initPage($rBannerItem) : false;
		
		var isTimer = option.timer ? rB.initTimer($rBannerItem) : false;
		
		
	});
	
	$(window).on('resize', function(){
		rB.initPlacement($rBannerItem);
	});
	
};



