$(document).ready(function() {
	var NS = {};

	var put_text = function(bot_say) {
		/*html_data = '<div class="alert alert-success fade in">\
				<a href="#" class="close" data-dismiss="alert">&times;</a>';
		$.each(bot_say["responseJSON"], function (index, data) {
			html_data = html_data + index +" : "+data+"<br>";
    	})	*/	
    	console.log(bot_say)
		html_data = '<div class="alert alert-success fade in">\
				<a href="#" class="close" data-dismiss="alert">&times;</a>'+bot_say['responseText']+'</div>'
		$(".result_area").prepend(html_data);
	};

	var send_req = function() {
		var userQuery = $("#userQuery").val();
		$("#userQuery").val("");

		$.ajax({
			method: 'POST',
			url: '/ikyParseAndExecute',
			data: {
				userQuery: userQuery
			},
			beforeSend: function() {
				$('#wait').show();
			},
			complete: function(data) {
				$('#wait').hide();
				put_text(data);
			}
		});
		return true;
	};

	$('#userQuery').keydown(function(e) {
		if (e.keyCode == 13) {
			send_req();
		}
	})
	$("#mic").click(function() 
	{
		$("#userQuery").focus();
	    if (window.hasOwnProperty('webkitSpeechRecognition')) {
	 
	      var recognition = new webkitSpeechRecognition();
	 
	      recognition.continuous = false;
	      recognition.interimResults = false;
	 
	      recognition.lang = "en-IN";
	      recognition.start();
	 
	      recognition.onresult = function(e) {
	        recognition.stop();
	        $("#userQuery").val(e.results[0][0].transcript);
	        setTimeout(send_req, 1000);
	      };
	 
	      recognition.onerror = function(e) {
	        recognition.stop();
	      }
	 
	    }
	});
});