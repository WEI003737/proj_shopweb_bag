(function () {
 
    // header fixed
    var header = document.getElementsByClassName("header")[0];
    var headerOffset = header.offsetop;
    
    //輪播  
    // index=0 是最後一張圖片
    var mainPicNowIndex = 1;
    // ul 裡的 li 單元
    var mainLiList = document.querySelectorAll(".main .pics li");
    var mainUl = document.getElementById("main_ul_list");
    // 圖片 li 寬，每次撥放移動距離
    var mainPicsPerWidth = parseFloat(window.getComputedStyle(mainLiList[0],null).width) || parseFloat(mainLiList[0].currentStyle("width"));

    // slide box (news)
    var newsPicNowIndex = 0;
    var newsSlidePointIndex = 0;    
    var newsSlidePoint = document.querySelectorAll(".news .slide_bar li");

    var newsArrowPre = document.getElementById("news_btn_pre");
    var newsArrowNext = document.getElementById("news_btn_next");

    var newsUl = document.getElementById("news_slide");
    var newsLiList = document.querySelectorAll("#news_slide>div");
    var newsPerWidth = parseFloat(window.getComputedStyle(newsLiList[0],null).width) || parseFloat(newsLiList[0].currentStyle("width"));
    // 預設顯示 4 張圖
    var newsPicsMoveCount = document.querySelectorAll("#news_slide>div").length - 4;
    
    // slide box (new arrivals)
    var newArrivalsPicNowIndex = 0;
    var newArrivalsSlidePointIndex = 0;      

    var newArrivalsSlidePoint = document.querySelectorAll(".new_arrivals .slide_bar li");

    var newArrivalsArrowPre = document.getElementById("new_arrivals_btn_pre");
    var newArrivalsArrowNext = document.getElementById("new_arrivals_btn_next");
    
    var newArrivalsUl = document.getElementById("new_arrivals_slide");
    var newArrivalsLiList = document.querySelectorAll("#new_arrivals_slide>li");
    var newArrivalsPerWidth = parseFloat(window.getComputedStyle(newArrivalsLiList[0],null).width) || parseFloat(newArrivalsLiList[0].currentStyle("width"));
    // 預設顯示 4 張圖
    var newArrivalsPicsMoveCount = document.querySelectorAll("#new_arrivals_slide>li").length - 4;

    // wish list
    var wsihListEmpty = document.querySelectorAll(".new_arrivals .wish_list .far");
    var wsihListFill = document.querySelectorAll(".new_arrivals .wish_list .fas");
    var wsihList = document.querySelectorAll(".new_arrivals .wish_list");

    // menu
    var menuBtn = document.getElementById("menu");
    var sidebar = document.getElementById("sidebar");

    function changeClass (el, myclass, status) {

        if (!el) { return; };

        if (typeof(el) === "string") {
            el = document.querySelectorAll(el);
        } else if (el.tagname) { el = [el]; };

      // 判斷是 add 還是 remove class
        switch (status) {

            case "add":
                for (var i=0; i<el.length; i++) {
                    el[i].classList.add(myclass);
                };
                break;
            case "remove":
                for (var i=0; i<el.length; i++) {
                    el[i].classList.remove(myclass);
                };
                break;
        };     

    };

    function getStyle (el, attr) {
        //參數：需要獲取的元素對象 / 需要獲取的樣式屬性
        //兼容寫法
        if (window.getComputedStyle) {
            sAttr = window.getComputedStyle(el, null)[attr];
        } else {
            sAttr = el.currentStyle(sAttr);
        }
        return sAttr;
    }

    function fnMove (el, cssKeyAndValueObj, callback) {
        //參數一:需要動態變化樣式的元素
        //參數二:目標 {css屬性名:css屬性目標值}。例{fontSize:500,height:140,opacity:50}

        clearInterval(el.timer);

        el.timer = setInterval(function () {

            var finish = false;

            for (var attr in cssKeyAndValueObj) { 

            if (attr == "left") {
                var changeCss = parseFloat(getStyle(el, attr));
            };

            // 設定速度，直到達到目標值停止計時器
            var speed = (cssKeyAndValueObj[attr] - changeCss)/10;
            speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed);

            if (speed > 0){
                finish = true;
            };
            
            //動態改變css屬性值
            if (attr == "opacity"){

                el.style[attr] = parseFloat((changeCss + speed)/100);
                //透明度兼容寫法 老版本瀏覽器透明度為0-100
                el.style.filter = "alpha(opacity:"+(changeCss + speed)+ ")";

            } else {
                el.style[attr] = changeCss + speed + "px"
            }
        }
        //所有動畫完成，調用回調函數（可選）
        if (finish) {

            clearInterval(el.timer);
            if(callback){
                callback();
            }

        }

      }, 30)

    };

    function showNext() {

        mainPicNowIndex++;
        
        if (mainPicNowIndex >= mainLiList.length) { //接著展示第二張

            mainUl.style.left =  -mainPicsPerWidth + "px";
            //改變index值 動畫效果的讓第一張移動到第二張
            mainPicNowIndex = 2;

        };

        fnMove(mainUl, {left: -mainPicsPerWidth * mainPicNowIndex});

    };
    
    function sliderBox (index, width, slideBox) {

        perMove = 0 - (parseFloat(width)*index) + "px";
        slideBox.style.left =  perMove;

    };

    function slidePointMove(el, index) {

        for(let i=0; i<el.length; i++) {
            el[i].classList.remove("active");
        }
        el[index].classList.add("active");

    };

    function toggleStyle (el, styleName, value) {

        if (!el) { return; };

        if (el.style[styleName] !== value) {
        el.style[styleName] = value;
        } else if (el.style[styleName] == value) {
        el.style[styleName] = "";
        }; 
    };

    // header fixed ---------------------------------

    window.onscroll = function(){

      let scrollTop = window.scrollY;
      let mainHeight = document.getElementById("main").offsetHeight; //重抓高度
      // console.log(mainHeight);

      if (scrollTop > mainHeight - 80) {

        changeClass(".header", "active", "add");
        changeClass(".header .menu .bar", "active", "add");
        changeClass(".main .sub_nav", "position-absolute", "remove");
        changeClass(".main .sub_nav", "position-fixed", "add");
        changeClass(".main .sub_nav", "active", "add");

        document.querySelector(".header .logo").src="./images/icons/logo_b.svg";

      } else {

        changeClass(".header", "active", "remove");
        changeClass(".header .menu .bar", "active", "remove");
        changeClass(".main .sub_nav", "position-fixed", "remove");
        changeClass(".main .sub_nav", "active", "remove");
        changeClass(".main .sub_nav", "position-absolute", "add");

        document.querySelector(".header .logo").src="./images/icons/logo_w.svg";

      }

    }

    // 自動輪播 ---------------------------------

    main_slide_box.timer = setInterval(showNext, 5000);
     
    // slideBox ---------------------------------
    // news
    newsArrowNext.addEventListener("click", function() {

        newsPicNowIndex = newsPicNowIndex >= newsPicsMoveCount ? newsPicsMoveCount : newsPicNowIndex+1;
        newsSlidePointIndex = newsSlidePointIndex >= newsSlidePoint.length-1 ? newsSlidePoint.length-1 : newsSlidePointIndex+1;

        sliderBox(newsPicNowIndex, (newsPerWidth + 10), newsUl);
        slidePointMove(newsSlidePoint, newsSlidePointIndex);

        if (newsPicNowIndex >= newsPicsMoveCount) {
            newsArrowNext.style.opacity =  "0";
        } else {
            newsArrowPre.style.opacity =  "1";
        }

        // console.log(newsPicNowIndex, newsSlidePointIndex);

    }, false);

    newsArrowPre.addEventListener("click", function() {

        newsPicNowIndex = newsPicNowIndex <= 0 ? 0 : newsPicNowIndex-1;
        newsSlidePointIndex = newsSlidePointIndex <= 0 ? 0 : newsSlidePointIndex-1;

        sliderBox(newsPicNowIndex, (newsPerWidth + 10), newsUl);
        slidePointMove(newsSlidePoint, newsSlidePointIndex);

        if (newsPicNowIndex <= 0) {
            newsArrowPre.style.opacity =  "0";
        } else {
            newsArrowNext.style.opacity =  "1";
        }

        // console.log(newsPicNowIndex, newsSlidePointIndex);

    }, false);

    for (let i=0; i<newsSlidePoint.length; i++) {

        newsSlidePoint[i].addEventListener("mouseenter", function () {

            newsPicNowIndex = i;
            newsSlidePointIndex = i;

            sliderBox(newsPicNowIndex, (newsPerWidth + 10), newsUl);
            slidePointMove(newsSlidePoint, newsSlidePointIndex);
            // console.log(newsPicNowIndex, newsSlidePointIndex);

            if(newsSlidePointIndex <= 0){

                newsArrowPre.style.opacity =  "0";
                newsArrowNext.style.opacity =  "1";
                return;

            } else if (newsSlidePointIndex >= newsSlidePoint.length-1) {

                newsArrowPre.style.opacity =  "1";
                newsArrowNext.style.opacity =  "0";
                return;

            }

            newsArrowPre.style.opacity =  "1";
            newsArrowNext.style.opacity =  "1";
        
        }, false);
    };

    // new arrivals
    newArrivalsArrowNext.addEventListener("click", function () {

        newArrivalsPicNowIndex = newArrivalsPicNowIndex >= newArrivalsPicsMoveCount ? newArrivalsPicsMoveCount : newArrivalsPicNowIndex + 1;
        newArrivalsSlidePointIndex = newArrivalsSlidePointIndex >= newArrivalsSlidePoint.length - 1 ? newArrivalsSlidePoint.length - 1 : newArrivalsSlidePointIndex + 1;

        sliderBox(newArrivalsPicNowIndex, (newArrivalsPerWidth + 10), newArrivalsUl);
        slidePointMove(newArrivalsSlidePoint,newArrivalsSlidePointIndex);

        if (newArrivalsPicNowIndex >= newArrivalsPicsMoveCount) {
            newArrivalsArrowNext.style.opacity =  "0";
        } else {
            newArrivalsArrowPre.style.opacity =  "1";
        };

        // console.log(newArrivalsPicNowIndex, newArrivalsSlidePointIndex);

    }, false);

    newArrivalsArrowPre.addEventListener("click", function () {

        newArrivalsPicNowIndex = newArrivalsPicNowIndex <= 0 ? 0 : newArrivalsPicNowIndex-1;
        newArrivalsSlidePointIndex = newArrivalsSlidePointIndex <= 0 ? 0 : newArrivalsSlidePointIndex-1;

        sliderBox(newArrivalsPicNowIndex, (newArrivalsPerWidth + 10), newArrivalsUl);
        slidePointMove(newArrivalsSlidePoint,newArrivalsSlidePointIndex);

        if (newArrivalsPicNowIndex <= 0) {
            newArrivalsArrowPre.style.opacity =  "0";
        } else {
            newArrivalsArrowNext.style.opacity =  "1";
        };

        // console.log(newArrivalsPicNowIndex, newArrivalsSlidePointIndex);

    }, false);

    for (let i=0; i<newArrivalsSlidePoint.length; i++) {

        newArrivalsSlidePoint[i].addEventListener("mouseenter", function () {

            newArrivalsPicNowIndex = i;
            newArrivalsSlidePointIndex = i;

            sliderBox(newArrivalsPicNowIndex, (newArrivalsPerWidth + 10), newArrivalsUl);
            slidePointMove(newArrivalsSlidePoint, newArrivalsSlidePointIndex);
            console.log(newArrivalsPicNowIndex, newArrivalsSlidePointIndex);

            if (newArrivalsSlidePointIndex <= 0) {

            newArrivalsArrowPre.style.opacity =  "0";
            newArrivalsArrowNext.style.opacity =  "1";
            return;

            } else if (newArrivalsSlidePointIndex >= newArrivalsSlidePoint.length-1) {

            newArrivalsArrowPre.style.opacity =  "1";
            newArrivalsArrowNext.style.opacity =  "0";
            return;

            }

            newArrivalsArrowPre.style.opacity =  "1";
            newArrivalsArrowNext.style.opacity =  "1";
        
        }, false);
    };

    /*--------------------- new arrivals: wish list ---------------------*/
    
    for (let i=0; i<wsihList.length; i++) {

        wsihList[i].addEventListener("click", function () {

            wsihListFill[i].classList.toggle("active");

        }, false);

    };

    /*--------------------- menu ---------------------*/
    
    menuBtn.addEventListener("click", function() {

        toggleStyle(sidebar, "left", "0px");
        menuBtn.classList.toggle("active_b");

    }, false);

})();