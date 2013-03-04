$(document).ready( function() {
    var wingroup = new jsWindow.windowGroup($('#windows_div'), {
        shadow: true
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
        title: '<b style="color: darkbeige">No close button</b>',
        theme: 'softblue', 
        shadow: false, 
        close_button: false,
        top: 285, left: 560, 
        width: 250, height: 200,
        content: "This window doesn't have a close button. Or wait, actually, it does: \
<input id='closeme' type=button value=\"PLZ, Don't kill me!!\"/>"
    });

    $("#" + window_ID + " #closeme").click( function() {
        wingroup.remove_window(window_ID);
    });
});
