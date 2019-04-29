$(document).ready(function () {

	$('form[name=input-form]').submit(function () {
		$.ajax({

			url: "https://playlist-scraper.herokuapp.com/results?list=" + parseList($('textarea').val()),
			type: "GET",
			beforeSend: function () {
				$('#loading-message').show();
                $('#results-message').hide();
                $('#example-message').hide();

			},
			complete: function () {
                $('#loading-message').hide();
			},
			success: function (success) {
				$('#results-message').show();

				$('.list-group').empty();
				for (i in success) {
					escapedUrl = escapeHtml(success[i].url)
					escapedTitle = escapeHtml(success[i].title)
					var item = "<a href=" + escapedUrl + " target='_blank' class='list-group-item list-group-item-action'>" + escapedTitle + "</a>"
					$('.list-group').append($(item));
				}
			},
			error: function (error) {
				console.log(`Error ${error}`);
			}
		});
		return false;
	});

});

function parseList(str) {
	trimmed = str.replace(/\s*,\s*/g, ",");
	parsed = trimmed.replace(/ /g, '+');
	return parsed;
}

function escapeHtml(str) {
	var div = document.createElement('div');
	div.appendChild(document.createTextNode(str));
	return div.innerHTML;
}
