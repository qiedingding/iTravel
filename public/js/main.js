$(document).ready(function(){
    let userInformation = $("#userInformation");
    let requestConfig = {
        method: "GET",
        url: "/user/isLoggedIn",
    };
    $.ajax(requestConfig).then(function (responseMessage) {
        if(responseMessage.user){
            userInformation.html("<span style='color: #c7254e'>welcome </span><b style='color: white;'>"+responseMessage.user.username +"</b> " );
        }
    })
});



