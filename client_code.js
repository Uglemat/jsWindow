$(document).ready(function () {
    var wg = new jsWindow.windowGroup($("#windows"),{shadow: false });
    wg.appendWindow({title: "My title AYssssAYAY",theme:"gnome3", shadow: true});
    wg.appendWindow({title: "",theme:"windows7", shadow: true});
    wg.appendWindow({title: ""});
    wg.appendWindow({title: "My title AYAYAY",theme:"softblue",top:40,left:40});
});
