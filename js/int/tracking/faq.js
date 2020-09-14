jQuery(document).ready(() => {
    jQuery('.click').click(function (){
        jQuery(this).toggleClass('clicked')
        jQuery(this).next().toggleClass('show')

        // something else like the way before
        // if(jQuery(this).attr('id') == jQuery(this).next().attr('id')){
        //     jQuery(this).next().is(":hidden") ? jQuery(this).next().css('display','block') : jQuery(this).next().hide()
        // }
    })

    jQuery('.topic').click(function () {
        jQuery(this).toggleClass('spotlight')
        jQuery(this).next().toggleClass('visible').css({
            'borderBottom': '1px solid #d2d2d2cf',
            'background': '#fff',
            'marginBottom': '20px'
        })
    })
})