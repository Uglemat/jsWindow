var no_user_select = {
    "-webkit-touch-callout": "none",
    "-webkit-user-select": "none",
    "-khtml-user-select": "none",
    "-moz-user-select": "none",
    "-ms-user-select": "none",
    "user-select": "none"}

var no_user_select_disable = {
    "-webkit-touch-callout": "",
    "-webkit-user-select": "",
    "-khtml-user-select": "",
    "-moz-user-select": "",
    "-ms-user-select": "",
    "user-select": ""}


$(document).ready( function() {
    $(".close-window-button").on('mousedown', function(e) {
	var window = $(this).parent().parent();
	window.css("display","none");
    });
    $(".jswindow > .window-top").on('mousedown', function(e) {
	var window = $(this).parent();
	var jswinID = window.attr("id");

	var of = window.offset()
	var clickoffset = {'top': e.pageY - of.top,
			   'left':e.pageX - of.left};
	$(document).on('mousemove.move', function(e) {
	    window.css({"top" : e.pageY - clickoffset.top,
					  "left": e.pageX - clickoffset.left});
	});
	$(document).on('mouseup', function(e) {
	    $(this).off('mousemove.move');
	    $(this).off('mouseup');
	});
    });
    $(".jswindow").on('mousedown', function (e) {
	$(this).css("z-index", 
		    String(parseInt($(this).css("z-index")) + 2));
    });
    $(".jswindow > .resize-window").on("mousedown", function(e) {
	var window = $(this).parent();
	var resisor = $(this);
	var of = window.offset();

	window.css(no_user_select);

	$(document).on('mousemove.resize', function(e) {
	    var clickoffset = {'top': e.pageY - of.top,
			       'left':e.pageX - of.left};
	    var top_height = window.children(".window-top").height();
	    var w = Math.max(150,clickoffset.left)
	    var h = Math.max(0, clickoffset.top - top_height - resisor.height())

	    window.css("width",w+5);
	    window.css("height",h);
	});

	$(document).on('mouseup', function(e) {
	    window.css(no_user_select_disable);
	    $(this).off('mousemove.resize');
	    $(this).off('mouseup');
	});

    });

    $(".resize-window").css(no_user_select);
    $(".window-title").css(no_user_select);
});