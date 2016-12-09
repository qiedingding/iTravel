(function($) {
    let signupForm = $("#signupForm");
    let formAlert = $("#form-alert");
    signupForm.submit(function(event){
        event.preventDefault();
        let username = $("#username").val();
        let email = $("#email").val();
        let password1 = $("#password1").val();
        let password2= $("#password2").val();
        if (!username||username===undefined) {
            $("#username").focus();
            formAlert.html('<strong>Oh snap! Need a username</strong>').show().fadeOut( 2000 );
            formAlert.removeClass('hidden');
            return;
        }
        if (!email||email===undefined) {
            $("#email").focus();
            formAlert.html('<strong>Oh snap! Need a email</strong>').show().fadeOut( 2000 );
            formAlert.removeClass('hidden');
            return;
        }
        if (!password1||password1===undefined) {
            $("#password1").focus();
            formAlert.html('<strong>Oh snap! Need a password</strong>').show().fadeOut( 2000 );
            formAlert.removeClass('hidden');
            return;
        }
        if (!password2||password2===undefined) {
            $("#password2").focus();
            formAlert.html('<strong>Oh snap! Need repeat password</strong>').show().fadeOut( 2000 );
            formAlert.removeClass('hidden');
            return;
        }
        if (password1!=password2) {
            formAlert.html('<strong>Oh snap! The repeat password is different</strong>');
            $("#password2").focus();
            formAlert.removeClass('hidden');
            return;
        }
        let requestConfig = {
            method: "POST",
            url: "/user/register",
            contentType: 'application/json',
            data: JSON.stringify({
                username: username,
                password: password1,
                email: email
            })
        };

        $.ajax(requestConfig).then(function (responseMessage) {
            if(responseMessage.status==="success"){
                window.location.href = '/user/profile';
            }else{
                formAlert.text(responseMessage);
                formAlert.removeClass('hidden');
            }
        })
    })      

})(window.jQuery);



