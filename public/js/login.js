(function($) {
    let loginForm = $("#loginForm");
    let username = $("#username").val();
    let password = $("#password").val();
    let formAlert = $("#form-alert");

    loginForm.submit(function(event){

        if (!username||username===undefined) {
            event.preventDefault();
            formAlert.html('<strong>Oh snap! Need a username</strong>').show().fadeOut( 2000 );
            formAlert.removeClass('hidden');
            return;
        }
        if (!username||password===undefined) {
            event.preventDefault();
            formAlert.html('<strong>Oh snap! Need a password</strong>').show().fadeOut( 2000 );
            formAlert.removeClass('hidden');
            return;
        }
        $( "#loginForm" ).submit();
    })      

})(window.jQuery);



