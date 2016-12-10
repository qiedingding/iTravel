(function($) {
    let loginForm = $("#loginForm");
    let formAlert = $("#form-alert");
    let submitBtn = $("#submitBtn");
    submitBtn.click(function(e) {
        btnClick(e);
    });
    function btnClick(e) {
        let username = $("#username").val();
        let password = $("#password").val();
        if (!username||username===undefined) {
            formAlert.html('<strong>Oh snap! Need a username</strong>').show().fadeOut( 2000 );
            formAlert.removeClass('hidden');
            e.preventDefault();
            return false;
        }
        if (!username||password===undefined) {
            formAlert.html('<strong>Oh snap! Need a password</strong>').show().fadeOut( 2000 );
            formAlert.removeClass('hidden');
            e.preventDefault();
            return false;
        }
        loginForm.submit();
    }

})(window.jQuery);



