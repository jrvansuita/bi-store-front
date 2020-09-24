jQuery(document).ready(function(){
    // jQuery('.menu-button').click(function(){
    //     jQuery('.options').load('http://localhost:4000/links-insta').show()
    // })

    // jQuery('.newsletter').load('https://emkt.boutiqueinfantil.com.br/landing/marketing-20cf5')

    jQuery('.menu-button').click(() => {
        jQuery('.principal').hide()
        jQuery('.options').show()
    })

    jQuery('.close-button').click(() => {
        jQuery('.options').hide()
        jQuery('.principal').show()
    })
});