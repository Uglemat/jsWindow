$(document).ready(function () {
    var wg = new jsWindow.windowGroup($("#windows"),{ id: "mywg",
        shadow: false, transparent_when_moving: true, fixed_position:false,
        keep_windows_on_page: { bottom: true, right: true}});
    wg.appendWindow({title: "My title AYssssAYAY",theme:"gnome3", shadow: true});
    wg.appendWindow({title: "OMFGGGGG AAR PURR PURR",theme:"windows7", shadow: true,height:300,top:200});
    wg.appendWindow({title: ""});
    wg.appendWindow({title: "HALLALAL"});
    wg.appendWindow({title: "My title AYAYAY",theme:"softblue",top:40,left:40});
    wg.appendWindow({title: "",theme:"windows7", shadow: true, min_height: 300, fixed_position: true,
                    keep_windows_on_page:{right:false}});
    wg.appendWindow({title: "", id:"myid",theme:"ubuntu",top:300,left:400});
    wg.appendWindow({title: "My title AYAYAY",theme:"orangeish",top:360,left:400,
                    content: "<div style='background:pink;width:100%;height:100%;'>s</div>"});
    wg.appendWindow({title: "My title AYAYAY",theme:"mac",top:200,left:600,shadow: true});
});
