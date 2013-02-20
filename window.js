var buildWindow = function (container, id, userSettings) {
    userSettings = (typeof userSettings === 'undefined') ? {} : userSettings;

    defaultSettings = {
	title: "This is a title!",
	content: "This is... content",
	resizable: true,
	close_button: true,
	width: 250,
	height: 400,
	top: 0,
	left: 0
    }

    var settings = new Object();
    for (setting in defaultSettings) {
	settings[setting] = (userSettings.hasOwnProperty(setting)) ?
	    userSettings[setting] :
	    defaultSettings[setting];
    }

    var zindex = 1;
    var title = "This is the title";

    ws = "<div class='jswindow' id='"+ id +"' style='z-index:"+zindex+";'>";
    ws += "<div class='window-top'>";
    if (settings.close_button) {
	ws += "<div class='close-window-button'><b>X</b></div>";
    }
    ws += "<p class='window-title'>"+ settings.title +"</p>";
    ws += "</div>";
    ws += "<div class='window-content-container'>";
    ws += "<div class='window-content'>";
    ws += settings.content;
    ws += "</div></div>";
    if (settings.resizable) {
	ws += "<div class='resize-window'><i>/</i></div>";
    }
    ws += "</div>";

    container.html(
	container.html() + "\n\n" + ws
    );

    var win = $(".jswindow#"+ id)
    var cont_cont = win.children(".window-content-container");
    var win_top = win.children(".window-top");
    
    win.css({
	"top"   : settings.top,
	"left"  : settings.left,
	"width" : settings.width,
	"height": settings.height
    });
    
    cont_cont.css("height",settings.height - win_top.outerHeight()-16)
}

function activate_bindings() {
    $(document).on( "mouseup.close-window", ".close-window-button", function(e) {
	var win = $(this).parent().parent();
	win.css("display","none");
    });
    $(document).on( "mousedown", ".jswindow > .window-top", function(e) {
	var win = $(this).parent();
	var jswinID = win.attr("id");

	var of = win.offset()
	var clickoffset = {'top': e.pageY - of.top,
			   'left':e.pageX - of.left};
	$(document).on( 'mousemove.move', function(e) {
	    win.css({"top" : e.pageY - clickoffset.top,
		     "left": e.pageX - clickoffset.left});
	});
	$(document).on( 'mouseup.stop-windowmove', function(e) {
	    $(this).off('mousemove.move');
	    $(this).off('mouseup.stop-windowmove');
	});
    });

    $(document).on( "mousedown", ".jswindow" , function (e) {
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

    $(document).on( "mousedown", ".jswindow .resize-window", function(e) {
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

	$(document).on("mouseup.stop-resizing", function(e) {
	    $("*").removeClass("no-user-select")
	    $(this).off('mousemove.resize');
	    $(this).off('mouseup.stop-resizing');
	});
    });
}


$(document).ready( function () {
    activate_bindings();

    wikipedia_iframe = "\
<iframe src='https://en.wikipedia.org/wiki/Main_Page'\
width='100%' height='100%'>\
<p>Your browser does not support iframes.</p>\
</iframe>"

    windowsContainer = $("#windows")
    buildWindow(windowsContainer , 2);
    buildWindow(windowsContainer , 3);

    buildWindow(windowsContainer , 1, {
	content: wikipedia_iframe,
	resizable: false,
	height: 300,
	width: 800,
	title: "<span class='red' style='font-weight:bold'>Wikipedia</span>",
	left: 400,
	close_button: false
    });
});