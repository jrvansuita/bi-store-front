    jQuery('.click').click(function (){
        jQuery(this).toggleClass('clicked')
        jQuery(this).next().toggleClass('show')
    }) 

    jQuery('.topic').click(function () {
        jQuery(this).toggleClass('spotlight')
        jQuery(this).next().toggleClass('visible').css({
            'borderBottom': '1px solid #d2d2d2cf',
            'background': '#fff',
            'marginBottom': '20px'
        })
    })