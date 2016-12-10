(function ($) {
	var commentForm = $("#comment-Form");
	var formAlert = $("#form-alert");
	var siteCommentContent = $("#siteComment");
	var idHidden = $("#idHidden");
	var currentTime = new Date().toLocaleDateString();

	idHidden.hide();  

	function checkCommentContent(contents) {
		if (contents.length < 10) return false;
		if (contents.length > 100) return false;
		return true;
	}

	commentForm.submit(function (event) {
		event.preventDefault();

		var newCommentContent = siteCommentContent.val();

		if (checkCommentContent(newCommentContent)) {
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
					siteCommentContent.val("");
				} else {
					location.href="/user/login";
				}
			});
		} else {
			formAlert.text("Please provide the correct comment length between 10 and 100 characters!");
            formAlert.removeClass('hidden');
		}		
	});
})(window.jQuery);