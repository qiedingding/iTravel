(function ($) {
	var commentForm = $("#comment-Form");
	var formAlert = $("#form-alert");
	var siteCommentContent = $("#siteComment");
	var idHidden = $("#idHidden");
	var currentTime = new Date().toLocaleDateString();

	idHidden.hide();  

	commentForm.submit(function (event) {
		event.preventDefault();

		var newCommentContent = siteCommentContent.val();
		var currentSiteId = idHidden.text().trim();
		
		formAlert.addClass('hidden');
    	formAlert.text('');

		var requestConfig = {
			method: "POST",
			url: "/comment/", 
			contentType: 'application/json',
			data: JSON.stringify({
				content: newCommentContent,
				createTime: currentTime,
				userId: null,
				stars: null,
				target: null,
				blogId: null,
				siteId: currentSiteId,
				cityId: null
			})
		};

		$.ajax(requestConfig).then((responseMessege) => {
			let newSiteComment = responseMessege.message;

			if (responseMessege.success == true) {
				
				$("#commentContainer div:last").append(
						"<div class='media-left response-text-left'>" +
                        	"<img class='media-object' src='../../public/images/user.png' alt='Figure' style='width:50px; height:50px;'>" +
                        	"<h5>" + newSiteComment.userId + "</h5>" +
                    	"</div>" +

                    	"<div class='media-body response-text-right'>" +
                        	"<p class='well'>" + newSiteComment.content + "</p>" +
                        	"<ul>" +
                            	"<li>" + newSiteComment.createTime + "</li>" +
                        	"</ul>" +
                    	"</div>" +
                    	"<div class='clearfix'> </div>");
				siteCommentContent.val("Message");
			}else {
				location.href="/user/login";
			}
		});
	});
})(window.jQuery);