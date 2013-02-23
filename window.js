function update_with(defaults , replacements) {
    /* Iterate over the properties of "defaults",
     * and replace the property value with the respective 
     * "replacements" value if it exists. */
    replacements = (typeof replacements === 'undefined') ? {} : replacements;

    for (var setting in defaults) {
        defaults[setting] = (replacements.hasOwnProperty(setting)) ?
            replacements[setting] :
            defaults[setting];
    }
    for (setting in replacements) {
        if (!defaults.hasOwnProperty(setting)) {
            throw "jsWindow - Unknown setting: " + setting;
        }
    }
}

function generate_id(blacklist) {
    var found_new_id = false;
    while (!found_new_id) {
        var new_id = "id" + Math.floor((Math.random() * 10000));
        if (blacklist.indexOf(new_id) === -1) {
            found_new_id = true;
        }
    }
    return new_id;
}

var windowGroup = function (container, additionalGroupSettings) {
    var windows = [];
    var window_group = this;

    var default_keep_windows_on_page_settings = 
            {top: true, bottom: false, left: false, right: false};

    var groupSettings = {
        start_z_index: 100,
        keep_windows_on_page: {}
    };
    update_with(groupSettings, additionalGroupSettings);
    update_with(default_keep_windows_on_page_settings,
                groupSettings.keep_windows_on_page);
    groupSettings.keep_windows_on_page = 
        default_keep_windows_on_page_settings;

    this.appendWindow = function(userSettings) {
        userSettings = (typeof userSettings === 'undefined') ? {} : userSettings;
        userSettings.id = (!userSettings.id) ? generate_id(windows) : userSettings.id;

        var valid_id = /^[0-9a-zA-Z]+$/;
        if (!String(userSettings.id).match(valid_id)) {
            throw "jsWindow - INVALID ID: \"" + userSettings.id + 
                "\" . Must match this regular expression: " + String(valid_id);
        }

        var new_zindex =  windows.length + groupSettings.start_z_index;

        windows.push(userSettings.id);
        buildWindow(userSettings, new_zindex);
        return userSettings.id;
    };

    var place_on_top = function (win_id) {
        windows = windows.filter(
            function(elem) {
                return elem != win_id;
            });
        windows.push(win_id);

        for (var i = 0; i < (windows.length); i++) {
            $(".jswindow#"+windows[i]).css("z-index", groupSettings.start_z_index + i);
        }
    };

    var buildWindow = function (userSettings, zindex) {
        var settings = {
            title: "This is a title!",
            content: "This is... content",
            resizable: true,
            close_button: true,
            width: 250,
            height: 400,
            top: 0,
            left: 0,
            id: 1   /* <- dummy ID, shall never be used. 
                     * userSettings should always have it's own ID which will replace it.
                     * update_with assumes the first parameter contains *all* properties,
                     * if the second parameter contains unique propreties, an exception 
                     * will be thrown because that shouldn't happen. 
                     * That's why there's a dummy ID */
        };
        update_with(settings, userSettings);

        var ws = "<div class='jswindow' id='"+ userSettings.id +"' style='z-index:"+zindex+";'>";
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
        
        var win = $(".jswindow#"+ userSettings.id);
        var cont_cont = win.children(".window-content-container");
        var win_top = win.children(".window-top");
        
        win.css({ "top"   : settings.top,
                  "left"  : settings.left,
                  "width" : settings.width,
                  "height": settings.height });
        
        cont_cont.css("height",settings.height - win_top.outerHeight()-16);

        activate_bindings(userSettings.id);
    };

    var activate_bindings = function(win_id) {
        $(document).on(
            "mouseup.close-window","#" + win_id + " .close-window-button", 
            function(e) {
                var win = $(this).parent().parent();
                win.remove();
                windows.splice(windows.indexOf(win_id), 1);
            });
        $(document).on(
            "mousedown", ".jswindow#" + win_id + " > .window-top", 
            function(e) {
                var win = $(this).parent();

                var of = win.offset();
                var clickoffset = {'top': e.pageY - of.top,
                                   'left':e.pageX - of.left};

                // I create orig_document_height because if I use $(document).outerHeight()
                // in the callback function, it'll be buggy and won't really work for whatever
                // reason.
                var orig_document_height = $(document).outerHeight();
                $(document).on(
                    'mousemove.move',
                    function(e) {
                        var position = {"top" : e.pageY - clickoffset.top,
                                        "left": e.pageX - clickoffset.left};

                        // Down below is the logic that keeps windows from leaving the website
                        if (position.top < 0 && groupSettings.keep_windows_on_page.top) {  // TOP
                            position.top = 0; }
                        if (position.left < 0 && groupSettings.keep_windows_on_page.left) { // LEFT
                            position.left = 0; }

                        if (position.left > $(document).outerWidth()-win.outerWidth() && // RIGHT
                            groupSettings.keep_windows_on_page.right) { 
                            position.left = $(document).outerWidth()-win.outerWidth();
                        }

                        if (position.top > orig_document_height - win.outerHeight() && // BOTTOM
                            groupSettings.keep_windows_on_page.bottom) { 
                            position.top = orig_document_height - win.outerHeight();
                        }
                        win.css(position);
                    });

                $(document).on( 
                    'mouseup.stop-windowmove', 
                    function(e) {
                        $(this).off('mousemove.move');
                        $(this).off('mouseup.stop-windowmove');
                    });
            });
        $(document).on(
            "mousedown", ".jswindow#" + win_id, 
            function (e) {
                place_on_top(win_id);
            });

        $(document).on(
            "mousedown", ".jswindow#" + win_id + " .resize-window", 
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

        var wg = new windowGroup($("#windows"), {
            keep_windows_on_page: {bottom:true, right:true, left:true}
        });
        wg.appendWindow({title: "OH LOLOLALLLLLL"});
        wg.appendWindow({title: "3",top: 300, left: 100, width: 400, height: 200});
        wg.appendWindow(
            { id: "idDEDINEFddDedd",
              content: wikipedia_iframe,
              height: 300,
              width: 800,
              title: "<span class='red' style='font-weight:bold'>1</span>",
              left: 400,
              close_button: false });
    });
