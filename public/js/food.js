(function ($) {
	var commentForm = $("#comment-Form");
	var formAlert = $("#form-alert");
	var foodCommentContent = $("#foodComment");
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

		var newCommentContent = foodCommentContent.val();

		if (checkCommentContent(newCommentContent)) {
			var currentFoodId = idHidden.text().trim();
			
			formAlert.addClass('hidden');
	    	formAlert.text('');

			var requestConfig = {
				method: "POST",
				url: "/comment/", 
				contentType: 'application/json',
				data: JSON.stringify({
					content: newCommentContent,
					createTime: currentTime,
					stars: "5",
					userId: null,
					belongToId: currentFoodId
				})
			};

			$.ajax(requestConfig).then((responseMessege) => {
				let newFoodComment = responseMessege.message;

				if (responseMessege.success == true) {
					$("#commentContainer div:last").append(
							"<div class='media-left response-text-left'>" +
	                        	"<img class='media-object' src='../../public/images/user.png' alt='Figure' style='width:50px; height:50px;'>" +
	                        	"<h5>" + newFoodComment.userId + "</h5>" +
	                    	"</div>" +

	                    	"<div class='media-body response-text-right'>" +
	                        	"<p class='well'>" + newFoodComment.content + "</p>" +
	                        	"<ul>" +
	                            	"<li>" + newFoodComment.createTime + "</li>" +
	                        	"</ul>" +
	                    	"</div>" +
	                    	"<div class='clearfix'> </div>");
					foodCommentContent.val("");
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