$(function() {
    //监听游戏规则的点击
    $('.rules').click(function() {
        $('.rule').stop().fadeIn(100)

    })

    //监听关闭按钮的点击
    $('.close').click(function() {
        $('.rule').stop().fadeOut(100)

    })

    //监听开始按钮的点击
    $('.begin').click(function() {
        $(this).stop().fadeOut(100)
        processHandler()
        wolfAnimation()
    })

    //监听重新开始点击
    $('.mask>button').click(function() {
        $('.mask').stop().fadeOut(100)
        processHandler()
        wolfAnimation()
    })

    //处理进度条
    function processHandler() {
        $('.progress').css({
            width: 180
        })
        var timer = setInterval(function() {
            var progressWidth = $('.progress').width()
            progressWidth -= 3
            $('.progress').css({
                    width: progressWidth
                })
                //监听进度条是否走完
            if (progressWidth <= 0) {
                clearInterval(timer)
                $('.mask').stop().fadeIn(100)
                $('.mask>.final').text($('.score').text())
                    //停止动画
                stopwolfAnimation()
            }
        }, 1000);
    }

    //灰太狼动画
    var wolftimer

    function wolfAnimation() {
        var wolffather = ['./images/h0.png', './images/h1.png', './images/h2.png', './images/h3.png', './images/h4.png', './images/h5.png', './images/h6.png', './images/h7.png', './images/h8.png', './images/h9.png']
        var wolfson = ['./images/x0.png', './images/x1.png', './images/x2.png', './images/x3.png', './images/x4.png', './images/x5.png', './images/x6.png', './images/x7.png', './images/x8.png', './images/x9.png']
        var pos = [
            { left: '100px', top: '115px' },
            { left: '20px', top: '160px' },
            { left: '190px', top: '142px' },
            { left: '105px', top: '193px' },
            { left: '19px', top: '221px' },
            { left: '202px', top: '212px' },
            { left: '120px', top: '275px' },
            { left: '30px', top: '295px' },
            { left: '209px', top: '297px' },

        ]

        var $wolfImage = $('<img src="" class="wolfimage">')
            //随机获取图片位置
        var posindex = Math.round(Math.random() * 8)
        $wolfImage.css({
                position: 'absolute',
                left: pos[posindex].left,
                top: pos[posindex].top
            })
            //随机获取数组类型
        var wolftype = Math.round(Math.random()) == 0 ? wolffather : wolfson
        window.wolfindex = 0
        window.wolfindexEnd = 5
        wolftimer = setInterval(function() {
            if (wolfindex > wolfindexEnd) {
                $wolfImage.remove()
                clearInterval(wolftimer)
                wolfAnimation()
            }
            $wolfImage.attr('src', wolftype[wolfindex])
            wolfindex++

        }, 200)

        $('.container').append($wolfImage)

        gameRules($wolfImage)
    }

    function stopwolfAnimation() {
        $('.wolfimage').remove()
        clearInterval(wolftimer)
        $('.score').text(0)
    }

    function gameRules($wolfImage) {

        $wolfImage.one('click', function() {
            window.wolfindex = 5
            window.wolfindexEnd = 9
            var $src = $(this).attr('src')
            var flag = $src.indexOf('h') >= 0
            if (flag) {
                $('.score').text(parseInt($('.score').text()) + 10)
            } else {
                $('.score').text(parseInt($('.score').text()) - 10)

            }
        })
    }


})