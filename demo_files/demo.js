var wingroup = new jsWindow.windowGroup($('#windows_div'), {
    shadow: true,
    keep_windows_on_page: { top: true, bottom: true, left: true, right: true }
});

wingroup.appendWindow({
    title: 'Theme: <b>softblue</b>',
    theme: 'softblue', 
    shadow: false,
    top: 70, left: 15, 
    width: 265, height: 200
});

wingroup.appendWindow({
    title: 'Theme: <b>windows7</b>',
    theme: 'windows7',
    top: 15, left: 295, 
    height: 255, width: 250,
    content: "Every window can have shadows, if you set `shadow` option to true. This theme, and the gnome3 theme looks much better and realistic with shadows."
});

wingroup.appendWindow({
    title: 'Theme: <b>gnome3</b>',
    theme: 'gnome3', 
    top: 290, left: 15, 
    width: 530, height: 200,
    content: "You can fill this with raw html, <b>like</b> <em style='color:darkred'>this</em>, with the `content` setting. You can also put raw html into the title with the `title` option, but that is put inside a p tag, so be sure to only put things that are valid in p tags into the title (div's are not)."
});

wingroup.appendWindow({
    title: 'Theme: <b>plain</b> <em>(default)</em>', shadow: false,
    resizable: false,
    top: 15, left: 560, 
    height: 255, width: 250,
    content: "I don't have a resize thing in the bottom-right corner, because the `resizable` option is set to false"
});

var window_ID = wingroup.appendWindow({
    title: '<b style="color: darkred">No close button</b>',
    theme: 'softblue', 
    shadow: false, 
    close_button: false,
    top: 285, left: 560, 
    width: 250, height: 200,
    content: "This window doesn't have a close button. Or wait, actually, it does: <input id='closeme' type=button value='PLZ, Dnt kill me!!' />"
});


wingroup.appendWindow({
    title: 'Theme: <b style="color: green; text-shadow: 1px 1px 1px #000">chromium</b>',
    theme: 'chromium', 
    shadow: false, 
    top: 15, left: 825, 
    width: 400, height: 565,
    min_height: 565,
    resizable: false,
    content: "<input type=text id='browserbar' style='width:97%;' value='agtp:/ww.Wikapada.CAM/' /><iframe id='browserbar_iframe' src='http://m.wikipedia.org' style='width: 100%; height: 450px;'></iframe><p style='font-size:.7em'> ^ That's just an iframe</p>"
});

wingroup.appendWindow({
    id: "myid",
    title: '',
    theme: 'windows7',
    top:500, left:561,
    height: 115, width: 250,
    content: "Set the title to the empty string for this effect."
});

wingroup.appendWindow({
    theme: "chromium",
    title: "Fixed position",
    content: "This window has the `fixed_position` option set to true. It moves relative to the edges of the browser window. Scroll down to see the difference.",
    fixed_position: true,
    top: 514,
    left: 17,
    width: 529,
    height: 248
});

$(document).ready(function() {
    $("#closeme").click( function() {
        wingroup.remove_window(window_ID);
    });

    $('#browserbar').keypress(function (e) {
        if (e.which == 13) { // enter key, presumably
            $('#browserbar_iframe').attr('src', $(this).val());
        }
    });
});


