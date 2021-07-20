;(function($,window,document,undefined){

    var jason = {
        init: function(){
            var that = this;

            that.headerFn();
            that.section1Fn();
            that.section2Fn();
            that.section3Fn();
            that.section4Fn();
            that.section5Fn();
            that.footerFn();

        },

        headerFn: function(){
            var _header = $('#header');
            var _window = $(window);
            var _scroll = false;
            var t = false;
            var m = 0;  // 클릭 x
            var s = -1;  // 부호(sign) 기본값 : - (음수), 양수로 초기값 설정 시 nav 메뉴가 미리 내려와있기 때문에 초기값 음수로 설정해줘야 함
            var _menuBar = $('.menu-bar');
            var _mainBtn = $('.main-btn');
            var _nav = $('#nav');
            var _sub = $('.sub');
            var topPosition = 124;  // 기본 124px

            _header.on({
                mouseenter:function(){
                    $(this).removeClass('addHeader');
                },
                mouseleave:function(){
                    if ( _scroll === false && m == 0 ){
                        $(this).addClass('addHeader');
                    }
                }
            });

            _window.scroll(function(){
                if( $(this).scrollTop() >= 25 ){
                    _scroll = true;
                    _header.removeClass('addHeader');
                    if( t === false ){
                        t = true;
                        var headerH = $('#header').height();
                        $('html,body').stop().animate({scrollTop:$('#section2').offset().top-headerH },600);
                    }
                } else {
                    t = false;
                    _scroll = false;
                    if( m == 0 ){
                        _header.addClass('addHeader');
                    }
                }
            });

            // 1024px 초과일 때, $('#nav') top 값은 124px
            // 1024px 이하일 때, $('#nav') top 값은  84px
            //  780px 이하일 때, $('#nav') top 값은  64px

            _window.resize(function(){
                resizeFn();
            });

            // 화면 크기 변화에 따른 $('#nav') top 값 조절
            function resizeFn(){
                if( _window.innerWidth() > 1024 ){
                    topPosition = 124;
                    _nav.stop().show(0).animate({top:(s*topPosition)+'px'},600);    // 처음 로딩시에 nav 메뉴 올라가있는 상태 s = -1;
                } else if( _window.innerWidth() > 780 ){
                    topPosition = 84;
                    _nav.stop().show(0).animate({top:(s*topPosition)+'px'},600);
                } else {
                    topPosition = 0;
                    _sub.stop().slideDown(0);
                    _nav.stop().animate({top:0},0);
                    if( m == 1 ){
                        _nav.stop().show(0);
                        $('html').addClass('addScroll');
                    } else {
                        _nav.stop().hide(0);
                        $('html').removeClass('addScroll');
                    }
                }
            }
            _nav.hide(0);
            setTimeout (resizeFn, 100);

            // nav 네비게이션 이벤트
            // 햄버거 메뉴 클릭을 기억하는 변수 설정 필요

            _menuBar.on({
                click: function(e){
                    e.preventDefault();
                    if( m == 0 ){   // 처음 클릭
                        m = 1;  // 클릭 o
                        s = 1;  // 부호 + (양수)
                    } else {    // 두번째 (다시) 클릭
                        m = 0;  
                        s = -1; // 부호 - (음수)
                    }
                    resizeFn();
                    $(this).toggleClass('addBtn');
                }
            });

            // main-menu 버튼 이벤트
            _mainBtn.on({
                mouseenter: function(){
                    if( $(window).innerWidth() > 780 ){
                        _sub.stop().slideUp(100);
                        $(this).next('.sub').stop().slideDown(300);
                    }
                }
            });

            // sub-menu 가 nav를 벗어나면 slideUp 이벤트
            _nav.on({
                mouseleave: function(){
                    _sub.stop().slideUp(300);
                }
            });

        },

        section1Fn: function(){
            var cnt = 0;
            var n = $('#section1 .slide').length-2;
            var _nextBtn = $('#section1 .next-btn');
            var _prevBtn = $('#section1 .prev-btn');
            var _section1Slide = $('#section1 .slide');
            var _slideWrap = $('#section1 .slide-wrap');
            var _slideContainer = $('#section1 .slide-container');
            var _pageBtn = $('#section1 .page-btn');
            var _smoothBtn = $('#section1 .smooth-btn');
            var setId = null;
            var setId2 = null;
            var _second = 5;    // 5초
            var tCnt = 0;

        //////// ------- slide ////////////////////////////////

            function mainSlideFn(){
                _slideWrap.stop().animate({left:-(100*cnt)+'%'},1000, function(){
                    if( cnt > n-1 ){
                        cnt = 0;
                    }
                    if( cnt < 0 ){
                        cnt = n-1;
                    }
                    _slideWrap.stop().animate({left:-(100*cnt)+'%'},0);
                });
                // 페이지 버튼 함수 연결
                    pageBtnFn(cnt);
            }

            setTimeout(pageBtnFn(0),10);
            // 페이지 버튼 (인디게이터 버튼) 이벤트 함수
            function pageBtnFn(z){
                // console.log(z);
                z == n ? z = 0 : z;     // n(4)
                z == -1 ? z= n-1 : z;   // 3 = n(4)-1
                $('.page-btn').removeClass('addCurrent');
                $('.page-btn').eq(z).addClass('addCurrent');
            }

            function nextCountFn(){
                cnt++;
                mainSlideFn();
            }

            function prevCountFn(){
                cnt--;
                mainSlideFn();
            }

            // 자동 play
            function autoTimerFn(){
                setId = setInterval(nextCountFn,1000*_second);
                // setInterval(prevCountFn,4000);
            }

            // 버튼 이벤트 발생 시, 타이머 컨트롤
            function timerFn(){
                tCnt = 0;   // 초기화
                clearInterval(setId2);      // 초기화
                setId2 = setInterval(function(){
                    tCnt++;
                    if( tCnt > _second ){       // tCnt 가 4초를 경과하면
                        clearInterval(setId2);
                        nextCountFn()
                        autoTimerFn();      //  autoTimerFn 를 실행해라
                    }
                },1000);
            }

            // 페이지 버튼 이벤트
            _pageBtn.each(function(index){
                $(this).on({
                    click: function(e){
                        e.preventDefault();
                        clearInterval(setId);
                        timerFn();
                        cnt = index;
                        mainSlideFn();
                    }
                });
            });

            // next (다음) 슬라이드 버튼 이벤트
            _nextBtn.on({
                click: function(e){
                    e.preventDefault();
                    clearInterval(setId);
                    timerFn();
                    if( !_slideWrap.is(':animated') ){
                        nextCountFn();
                    }
                }
            });

            // prev (이전) 슬라이드 버튼 이벤트
            _prevBtn.on({
                click: function(e){
                    e.preventDefault();
                    clearInterval(setId);
                    timerFn();
                    if( !_slideWrap.is(':animated') ){
                        prevCountFn();
                    }
                }
            });

            // 터치 스와이프 이벤트
            _slideContainer.swipe({
                swipeLeft: function(e){  // 다음 슬라이드
                    e.preventDefault();
                    clearInterval(setId);
                    timerFn();
                    if( !_slideWrap.is(':animated') ){
                        nextCountFn();
                    }
                },
                swipeRight: function(e){     // 이전 슬라이드
                    e.preventDefault();
                    clearInterval(setId);
                    timerFn();
                    if( !_slideWrap.is(':animated') ){
                        prevCountFn();
                    }
                }
            });
            
            setTimeout(autoTimerFn,10);

        //////// -------- smooth button ////////////////////////////////

            _smoothBtn.on({
                click: function(e){
                    e.preventDefault();
                    var headerH = $('#header').height();
                    var url = $(this).attr('href');
                    $('html,body').stop().animate({scrollTop:$(url).offset().top-headerH }, 1000);
                }
            });

            //////// -------- resize ////////////////////////////////
            var winW = $(window).width();
            var winH = $(window).height();

            function resizeFn(){
                winW = $(window).width();   // 새로고침 없이 반응형 바로 진행
                winH = $(window).height();  // 새로고침 없이 반응형 바로 진행
                $('#section1').css({ height:winH });    // 새로고침 없이 반응형 바로 진행
                $('#section2').css({ marginTop:winH }); // 새로고침 없이 반응형 바로 진행
                _section1Slide.css({ width:winW });    // 새로고침 없이 반응형 바로 진행
            }
            setTimeout(resizeFn,10);

            $(window).resize(function(){
                resizeFn()
            });
        
        },

        section2Fn: function(){
            var _win = $(window);
            var galleryList = $('.gallery li');
            var galleryListW = $('.gallery li').width();
            var galleryListH = galleryListW * 0.730055;
            var galleryListH2 = galleryListW * (1-0.730055);

            function resizeFn(){
                galleryListW = $('.gallery li').width();
                galleryListH = galleryListW * 0.730055;
                galleryList.css({height:galleryListH});
            }

            setTimeout(resizeFn,10);

            _win.resize(function(){
                resizeFn();
            });

        },

        section3Fn: function(){
            // slide-view 박스 높이 설정, 너비가 1360 이하일 경우 높이 자동 설정
            var _win = $(window);
            var _winW = $(window).innerWidth();
            var slideView = $('#section3 .slide-view');
            var pageBtnW = $('#section3 .pageBtn').innerWidth();
            var pageWrap = $('#section3 .page-wrap');
            var slideBgImg = $('#section3 .slide-bg-image');
            var slideBgImgW = $('#section3 .slide-bg-image').innerWidth();


            function resizeFn(){
                _winW = $(window).innerWidth();
                pageBtnW = $('#section3 .pageBtn').innerWidth();
                slideBgImgW = $('#section3 .slide-bg-image').innerWidth();

                if( _winW <= 1360 ){
                    slideView.css({ height:_winW*0.419117647 });    // 570 = 1360*0.419117647
                    pageWrap.css({ height:pageBtnW });
                    slideBgImg.css({ height:slideBgImgW });
                } else {
                    slideView.css({ height:570 });
                }
            }
            
            setTimeout(resizeFn,10);

            _win.resize(function(){
                resizeFn();
            });

            // fadeInOut 반응형 슬라이드 웹개발
            var cnt = 0;
            var setId = null;
            var n = $('#section3 .slide').length-1;
            var _nextBtn = $('#section3 .nextBtn');
            var _prevBtn = $('#section3 .prevBtn');
            var _slide = $('#section3 .slide');
            var _pageBtn = $('#section3 .pageBtn');
            var a = [1,2];
            
            // 메인 다음 슬라이드
            function mainNextSlideFn(){
                _slide.css({zIndex:1})  // 모든 슬라이드 : 초기화
                _slide.eq(cnt==0 ? n : cnt-1).css({zIndex:2});   // 현재 슬라이드가 보일 때 이전 슬라이드와 겹쳐야 함
                _slide.eq(cnt).css({zIndex:3}).animate({opacity:0},0).animate({opacity:1},1000);    // 현재 보여지는 슬라이드
                pageBtnFn();
            }

            // 메인 이전 슬라이드
            function mainPrevSlideFn(){
                // _slide.css({zIndex:1,opacity:1});    모든 슬라이드 : 초기화
                _slide.css({zIndex:1}).animate({opacity:1},0);  // 모든 슬라이드 : 초기화
                _slide.eq(cnt).css({zIndex:2});
                _slide.eq(cnt==n ? 0 : cnt+1).css({zIndex:3})/* .animate({opacity:1},0) */.animate({opacity:0},1000);    // 현재 보여지는 슬라이드
                pageBtnFn();
            }

            // next 카운트 슬라이드
            function nextCountFn(){
                cnt++;
                if( cnt > n ){
                    cnt = 0;
                }
                mainNextSlideFn()
            }
            
            // prev 카운트 슬라이드
            function prevCountFn(){
                cnt--;
                if( cnt < 0 ){
                    cnt = n;
                }
                mainPrevSlideFn();
            }

            // 다음 슬라이드 클릭 이벤트
            _nextBtn.on({
                click: function(e){
                    e.preventDefault();
                    nextCountFn();
                }
            });

            // 이전 슬라이드 클릭 이벤트
            _prevBtn.on({
                click: function(e){
                    e.preventDefault();
                    prevCountFn();
                }
            });

            // 인디게이트(네비게이션) 버튼 이벤트 - 해당하는 이미지로 바뀌어야 함
                // case 0 첫 번째 슬라이드, 페이지 버튼 1 : 2번 이미지 [1]   slide01.jpg
                //                         페이지 버튼 2 : 3번 이미지 [2]   slide02.jpg
                // case 1 두 번째 슬라이드, 페이지 버튼 1 : 1번 이미지 [0]   slide00.jpg
                //                         페이지 버튼 2 : 3번 이미지 [2]   slide02.jpg
                // case 3 세 번째 슬라이드, 페이지 버튼 1 : 1번 이미지 [0]   slide00.jpg
                //                         페이지 버튼 2 : 2번 이미지 [1]   slide01.jpg

            // function pageBtnFn(){
            //     switch(cnt){
            //         case 0:
            //             _pageBtn.eq(0).css({backgroundImage:'url(./img/slide01.jpg'});
            //             _pageBtn.eq(1).css({backgroundImage:'url(./img/slide02.jpg'});
            //             break;
            //         case 1:
            //             _pageBtn.eq(0).css({backgroundImage:'url(./img/slide00.jpg'});
            //             _pageBtn.eq(1).css({backgroundImage:'url(./img/slide02.jpg'});
            //             break;
            //         case 2:
            //             _pageBtn.eq(0).css({backgroundImage:'url(./img/slide00.jpg'});
            //             _pageBtn.eq(1).css({backgroundImage:'url(./img/slide01.jpg'});
            //     }
            // }

            function pageBtnFn(){
                switch(cnt){
                    case 0:
                        a = [1,2];     // 파일 번호
                        break;
                    case 1:
                        a = [0,2];
                        break;
                    case 2:
                        a = [0,1];
                }
                // _pageBtn.eq(0).css({backgroundImage:'url(./img/slide0'+ a[0] +'.jpg'});
                // _pageBtn.eq(1).css({backgroundImage:'url(./img/slide0'+ a[1] +'.jpg'});

                for(let i = 0; i < a.length; i++ ){
                    _pageBtn.eq(i).css({backgroundImage:'url(./img/slide0'+ a[i] +'.jpg'});
                }
            }

            // 인디게이트(네비게이션) 버튼 클릭 이벤트
            _pageBtn.each(function(idx){
                $(this).on({
                    click: function(e){
                        e.preventDefault();
                        // console.log('현재 슬라이드 번호', cnt);
                        // console.log('클릭한 슬라이드 번호', a[idx]);

                        var imsi = cnt;
                            cnt = a[idx];

                            if( imsi < a[idx] ){
                                mainNextSlideFn();
                            } else if ( imsi > a[idx] ) {
                                mainPrevSlideFn();
                            }

                        // console.log('현재 슬라이드 번호', cnt);
                        // console.log('클릭한 슬라이드 번호', a);
                    }
                });
            });
        },

        section4Fn: function(){
            var slideN = 3;     // view 보여지는 슬라이드 갯수, 데스크탑 width:1024px 초과 3개, 태블릿 width:1024px 이하 2개, 모바일  width:680px 이하 1개
            var slideCon = $('#section4 .slide-container');
            var slideConW = slideCon.innerWidth()/slideN;
            var slideWrap = $('#section4 .slide-wrap');     /* 반응형 시 필수 입력 사항 */
            var _totN = $('#section4 .slide').length;       // slide 전체 갯수 : 10개
            var _slide = $('#section4 .slide');     /* 반응형 시 필수 입력 사항 */
            var _pageBtn = $('#section4 .pageBtn');     /* 반응형 시 필수 입력 사항 */
            var _win = $(window);
            var cnt = 0;
            var setId = null;
            var setId2 = null;

            // ---------- 반응형 구현 ----------
            
            // slide-container W에 따른 slide 3개의 W 구현
            // 1570px / 3 = slideW = 523.3333px
            // slide-container W 변화에 따른 slide 넓이 변화 구현 - 반응형

            setTimeout(resizeFn, 10);   /* 처음 로딩시(새로고침) 1회만 실행 */

            function resizeFn(){
                if( slideCon.innerWidth() > 1024 ){     // 창 넓이 기준 x, container 박스 넓이 기준으로 해야함
                    slideN = 3;
                } else if( slideCon.innerWidth() > 680  ){
                    slideN = 2;
                } else {
                    slideN = 1;
                }
                slideConW = slideCon.innerWidth()/slideN;
                slideWrap.css({ width:(slideConW*_totN), marginLeft:-(slideConW*3) });
                _slide.css({ width:slideConW, height:slideConW-40 });   /* margin 값 40 빼기 */
                slideWrap.stop().animate({left:-(slideConW*cnt)},0);    // 움직임 정적으로 설정
            }

            _win.resize(function(){
                resizeFn();
            });

            // ---------- slide 구현 ----------

            // 1. 메인슬라이드 함수
            function mainSlideFn(){
                slideWrap.stop().animate({left:-(slideConW*cnt)},600, function(){
                    if(cnt>3){cnt=0;}
                    if(cnt<0){cnt=3;}
                    slideWrap.stop().animate({left:-(slideConW*cnt)},0);
                });
                pageBtnEventFn();
            }

            // 2-1. next count 함수
            function nextCountFn(){
                cnt++;
                mainSlideFn();
            }

            // 2-2. prev count 함수
            function prevCountFn(){
                cnt--;
                mainSlideFn();
            }

            // 3. swipe next/prev touch 이벤트
            slideCon.swipe({
                swipeLeft: function(){
                    timerControlFn();
                    if( !slideWrap.is(':animated') ){
                        nextCountFn();
                    }
                },
                swipeRight: function(){
                    timerControlFn();
                    if( !slideWrap.is(':animated') ){
                        prevCountFn();
                    }
                }
            });

            // 4. pageBtn event 함수
            function pageBtnEventFn(){
                var z = cnt;
                if(z>3){z=0;}
                if(z<0){z=3;}
                _pageBtn.removeClass('addPage');
                _pageBtn.eq(z).addClass('addPage');
            }
            // 5. pageBtn click event 함수
            // 반드시 메인함수랑 직접 연결해야 함
                _pageBtn.each(function(idx){
                    $(this).on('click', function(e){
                        e.preventDefault();
                        timerControlFn();
                        cnt = idx;  // 직접 선택한 슬라이드 번호를 이용하여 mainSlideFn 호출
                        mainSlideFn();
                    // }).on('mouseenter', function(e){
                    //     e.preventDefault();
                    //     cnt = idx;
                    //     mainSlideFn();
                    // }).on('focusin', function(e){
                    //     e.preventDefault();
                    //     cnt = idx;
                    //     mainSlideFn();
                    });
                });

            // 6. 6초 간격으로 슬라이드 자동 실행 함수 설정
            function autoPlayFn(){
                setId = setInterval(nextCountFn, 6000);
            }

            autoPlayFn();

            // 7. 타이머 컨트롤 함수 (터치 이벤트 시, 타이머 재실행)
            function timerControlFn(){
                var tcnt = 0;
                clearInterval(setId);
                clearInterval(setId2);
                setId2 = setInterval(function(){
                    tcnt++;
                    if( tcnt >= 6 ){
                        clearInterval(setId2);
                        nextCountFn()   // 6초 후에 바로 실행
                        autoPlayFn();   // 자동으로 6초 실행
                    }
                },1000);
            }
        },

        section5Fn: function(){

        },

        footerFn: function(){

        }
    };

    jason.init();

})(jQuery,window,document);