(function($) {
    $("#signupForm").validate();
    let signupForm = $("#signupForm");
    let formAlert = $("#form-alert");
    signupForm.submit(function(event){
        event.preventDefault();
        $("#signupForm").validate({
            rules: {
                username: {
                    required: true,
                    minlength: 8
                },
                password1: {
                    required: true,
                    minlength: 8
                },
                password2: {
                    required: true,
                    minlength: 8,
                    equalTo: "#password1"
                },
                email: {
                    required: true,
                    email: true
                }
            },
            messages: {
                username: {
                    required: "Please enter a username",
                    minlength: "Your username must consist of at least 2 characters"
                },
                password1: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long"
                },
                password2: {
                    required: "Please provide a password",
                    minlength: "Your password must be at least 5 characters long",
                    equalTo: "Please enter the same password as above"
                },
                email: "Please enter a valid email address"
            }
        });
        let username = $("#username").val().trim();
        let email = $("#email").val().trim();
        let password1 = $("#password1").val().trim();
        let password2= $("#password2").val().trim();
        if (!username||username===undefined||username.length<8) {
            $("#username").focus();
            formAlert.html('<strong>Oh snap! Need a username</strong>').show().fadeOut( 2000 );
            formAlert.removeClass('hidden');
            return;
        }
        if (!email||email===undefined||email.length<8) {
            $("#email").focus();
            formAlert.html('<strong>Oh snap! Need a email</strong>').show().fadeOut( 2000 );
            formAlert.removeClass('hidden');
            return;
        }
        if (!password1||password1===undefined||password1.length<8) {
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
                username: $("#username").val(),
                password: $("#password1").val(),
                email:  $("#email").val()
            })
        };

        $.ajax(requestConfig).then(function (responseMessage) {
            if(responseMessage.status==="success"){
                window.location.href = '/user/login';
            }else{
                formAlert.text(responseMessage);
                formAlert.removeClass('hidden');
            }
        })
    })      

})(window.jQuery);



