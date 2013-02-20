var windowGroup = function (container) {
    var start_z_index = 200;
    var windows = [];

    this.appendWindow = function(id, userSettings) {
	var win_group = this;
	new_zindex =  windows.length + start_z_index ;
	windows.push(id);
	buildWindow(id, userSettings, new_zindex, win_group);
    };

    this.place_on_top = function (win_id) {	
	console.log("Omg...");
    };

    var get_largest_zindex = function() {
	return windows.reduce( 
	    function(prevVal, currentVal, index, array) {
		return (prevVal.zindex > currentVal.zindex) ? prevVal : currentVal; 
	    }, { zindex: start_z_index-1 }
	).zindex;
    };

    var buildWindow = function (win_id, userSettings, zindex, win_group) {
	userSettings = (typeof userSettings === 'undefined') ? {} : userSettings;

	var defaultSettings = {
	    title: "This is a title!",
	    content: "This is... content",
	    resizable: true,
	    close_button: true,
	    width: 250,
	    height: 400,
	    top: 0,
	    left: 0
	};

	var settings = new Object();
	for (setting in defaultSettings) {
	    settings[setting] = (userSettings.hasOwnProperty(setting)) ?
		userSettings[setting] :
		defaultSettings[setting];
	}

	var ws = "<div class='jswindow' id='"+ win_id +"' style='z-index:"+zindex+";'>";
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

	var win = $(".jswindow#"+ win_id);
	var cont_cont = win.children(".window-content-container");
	var win_top = win.children(".window-top");
	
	win.css({ "top"   : settings.top,
		  "left"  : settings.left,
		  "width" : settings.width,
		  "height": settings.height });
	
	cont_cont.css("height",settings.height - win_top.outerHeight()-16);

	win_group.activate_bindings(win_id, win_group);
    };

    this.activate_bindings = function(win_id, win_group) {
	$(document).on( 
	    "mouseup.close-window",
	    ".close-window-button", 
	    function(e) {
		var win = $(this).parent().parent();
		win.css("display","none");
	    });
	$(document).on(
	    "mousedown",
	    ".jswindow > .window-top", 
	    function(e) {
		var win = $(this).parent();
		var jswinID = win.attr("id");

		var of = win.offset();
		var clickoffset = {'top': e.pageY - of.top,
				   'left':e.pageX - of.left};
		$(document).on(
		    'mousemove.move', 
		    function(e) {
			win.css({"top" : e.pageY - clickoffset.top,
				 "left": e.pageX - clickoffset.left});
		    });

		$(document).on( 
		    'mouseup.stop-windowmove', 
		    function(e) {
			$(this).off('mousemove.move');
			$(this).off('mouseup.stop-windowmove');
		    });
	    });
	$(document).on(
	    "mousedown",
	    ".jswindow"+"#"+win_id, 
	    function (e) {
		win_group.place_on_top(win_id);
		//$(this).css("z-index", String(parseInt($(this).css("z-index")) + 1));
	    });

	$(document).on( 
	    "mousedown",
	    ".jswindow .resize-window", 
	    function(e) {
		$("*").addClass("no-user-select");
		var win = $(this).parent();
		var cont_cont = win.children(".window-content-container");
		var win_top = win.children(".window-top");
		var of = win.offset();
		
		var winwidth = win.outerWidth();
		var winheight = win.outerHeight();
		var lco = winwidth - (e.pageX - of.left);
		var tco = winheight - (e.pageY - of.top);

		$(document).on(
		    'mousemove.resize', 
                    function(e) {
			var h = Math.max(100, e.pageY - of.top + tco);
			var w = Math.max(150, e.pageX - of.left + lco);

			win.css("width",w);
			win.css("height",h);

			cont_cont.css("height",h-win_top.outerHeight()-16);
		    });

		$(document).on(
		    "mouseup.stop-resizing", 
		    function(e) {
			$("*").removeClass("no-user-select");
			$(this).off('mousemove.resize');
			$(this).off('mouseup.stop-resizing');
		    });
	    });
    };
};

$(document).ready( 
    function () {
	var wikipedia_iframe = "<p>Your browser does not support iframes.</p>";

	var wg = new windowGroup($("#windows"));
	wg.appendWindow(2,{title: "2"});
	wg.appendWindow(3, {title: "3",top: 100, left: 100});
	wg.appendWindow(1,
		       { content: wikipedia_iframe,
			 resizable: false,
			 height: 300,
			 width: 800,
			 title: "<span class='red' style='font-weight:bold'>1</span>",
			 left: 400,
			 close_button: false
		       });
    });
