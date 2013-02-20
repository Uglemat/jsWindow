$(document).ready( function () {
    var buildWindow = function () {
	win_str = "<div class='jswindow' id='1' style='z-index:1;'>"

    }


    $(".close-window-button").mouseup( function(e) {
	var win = $(this).parent().parent();
	win.css("display","none");
    });
    $(".jswindow > .window-top").mousedown( function(e) {
	var win = $(this).parent();
	var jswinID = win.attr("id");

	var of = win.offset()
	var clickoffset = {'top': e.pageY - of.top,
			   'left':e.pageX - of.left};
	$(document).on('mousemove.move', function(e) {
	    win.css({"top" : e.pageY - clickoffset.top,
		     "left": e.pageX - clickoffset.left});
	});
	$(document).on('mouseup', function(e) {
	    $(this).off('mousemove.move');
	    $(this).off('mouseup');
	});
    });

    $(".jswindow").mousedown( function (e) {
	$(this).css("z-index", String(parseInt($(this).css("z-index")) + 2));
	var win = $(this);

	$(document).on( "mousemove.debuginfo", function(e) {

	    var of = win.offset();
	    var s = "";
	    s += "<br>e.pageY : " + e.pageY;
	    s += "<br>e.pageX : " + e.pageX;
	    s += "<br><br>win.offset().top : " + of.top;
	    s += "<br>win.offset().left : " + of.left;

	    s += "<br><br>win.outerWidth() : " + win.outerWidth();
	    s += "<br>win.outerHeight() : " + win.outerHeight();
	    $("#dbinfo").html(s);
	});
    });

    $(".jswindow .resize-window").mousedown( function(e) {
	$("*").addClass("no-user-select")
	var win = $(this).parent();
	var cont_cont = win.children(".window-content-container");
	var win_top = win.children(".window-top");
	var of = win.offset();

	var winwidth = win.outerWidth()
	var winheight = win.outerHeight()
	var lco = winwidth - (e.pageX - of.left) 
	var tco = winheight - (e.pageY - of.top)

	$(document).on('mousemove.resize', function(e) {

	    var h = Math.max(100, e.pageY - of.top + tco)
	    var w = Math.max(150, e.pageX - of.left + lco)

	    win.css("width",w);
	    win.css("height",h);

	    cont_cont.css("height",h-win_top.outerHeight()-16)
	});

	$(document).mouseup( function(e) {
	    $("*").removeClass("no-user-select")
	    $(this).off('mousemove.resize');
	    $(this).off('mouseup');
	});
    });

});