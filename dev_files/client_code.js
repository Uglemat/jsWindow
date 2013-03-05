$(document).ready(function () {
    var wg = new jsWindow.windowGroup($("#windows"),{ shadow: false, opaque_when_moving: true });
    wg.appendWindow({title: "My title AYssssAYAY",theme:"gnome3", shadow: true});
    wg.appendWindow({title: "OMFGGGGG AAR PURR PURR",theme:"windows7", shadow: true,height:300,top:200});
    wg.appendWindow({title: ""});
    wg.appendWindow({title: "HALLALAL"});
    wg.appendWindow({title: "My title AYAYAY",theme:"softblue",top:40,left:40});
    wg.appendWindow({title: "",theme:"windows7", shadow: true, min_height: 300});
    wg.appendWindow({title: "My title AYAYAY",theme:"chromium",top:300,left:400});
});
