$(document).ready(function(){
    let userInformation = $("#userInformation");
    let requestConfig = {
        method: "GET",
        url: "/user/isLoggedIn",
    };
    $.ajax(requestConfig).then(function (responseMessage) {
        if(responseMessage.user){
            userInformation.html(
                " <div class='top-header-right-info' ><ul><li><span style='color:white; '>" +
            "welcome </span><b style='color: #c7254e;'>" +
            responseMessage.user.username +"</b></li><li><a href='/user/logout'>Logout</a></li> </ul> </div>"
            );
        }
    })
});



