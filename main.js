document.addEventListener('DOMContentLoaded', function () {
    var svgElement = document.getElementById('title');
    var forLogoElement = document.querySelector('.left-column');
    var onTopPageElement = document.querySelector('.on-top-page');
    var navElement = document.querySelector('nav');
    var hamburgerButton = document.querySelector('.open-btn4');
    var navigationPanel = document.getElementById('g-nav');
    var targetSections = ['#about','#skill', '#strength', '#profile', '#career', '#vision', '#personality', '#works', '#works-all', '#portfolio', '#portfolio-detail', '#aquarium', '#aquarium-detail'];
    var animationStartedFlags = {};

    var svgAnimationDuration = 4000; // SVGアニメーションの持続時間
    var timeBeforeEndToShowLogo = 1000; // ロゴを表示するまでの時間

    // nav要素とleft-columnに.activeクラスを追加
    function startNavAndLeftColumnAnimation() {
        if (navElement && !navElement.classList.contains('active')) {
            navElement.classList.add('active');
        }
        if (forLogoElement && !forLogoElement.classList.contains('active')) {
            forLogoElement.classList.add('active');
        }
    }

    function onForLogoAnimationEnd() {
        startNavAndLeftColumnAnimation();
        forLogoElement.removeEventListener('transitionend', onForLogoAnimationEnd);
    }

    function setupTitleAnimation() {
        if (svgElement) {
            svgElement.classList.add('active');
            setTimeout(function () {
                if (onTopPageElement) {
                    onTopPageElement.classList.add('active');
                }
                if (forLogoElement) {
                    forLogoElement.classList.add('active');
                    forLogoElement.addEventListener('transitionend', onForLogoAnimationEnd);
                }
            }, svgAnimationDuration - timeBeforeEndToShowLogo);
        }
    }

    function isInViewport(element) {
        var rect = element.getBoundingClientRect();
        var windowHeight = window.innerHeight || document.documentElement.clientHeight;
        return (rect.top <= windowHeight) && (rect.bottom >= 0);
    }

    function startContentAnimations(sectionId) {
        if (!animationStartedFlags[sectionId]) {
            var section = document.querySelector(sectionId);
            var watermarks = section.querySelectorAll('.watermark');
            var headings = section.querySelectorAll('.heading');
            var personalityPhoto = document.querySelector('.personality-photo');

            watermarks.forEach(function (watermark) {
                watermark.classList.add('animate-in');
            });

            if (sectionId === '#personality' && personalityPhoto && !personalityPhoto.classList.contains('active')) {
                personalityPhoto.classList.add('active');
            }

            headings.forEach(function (element, index) {
                setTimeout(function () {
                    element.classList.add('animate-in');
                }, 1000 + index * 500);
            });

            animationStartedFlags[sectionId] = true;
        }
    }

    function checkIfTargetIsInView() {
        targetSections.forEach(function (sectionId) {
            var section = document.querySelector(sectionId);
            if (section && isInViewport(section)) {
                startContentAnimations(sectionId);
            }
        });
    }

    // ページロード時にnav要素とleft-columnに.activeクラスを追加
    startNavAndLeftColumnAnimation();

    // ページロード時やリンククリック後にチェック
    setTimeout(checkIfTargetIsInView, 100);

    window.addEventListener('scroll', checkIfTargetIsInView);

    // ハンバーガーメニューの設定
    if (hamburgerButton) {
        hamburgerButton.addEventListener('click', function () {
            this.classList.toggle('active');
            navigationPanel.classList.toggle('panelactive');
        });

        navigationPanel.querySelectorAll('a').forEach(function (link) {
            link.addEventListener('click', function () {
                hamburgerButton.classList.remove('active');
                navigationPanel.classList.remove('panelactive');
            });
        });
    }

    // タイトルアニメーションの設定
    setupTitleAnimation();
});
