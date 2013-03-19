$(document).ready(function () {
    var wg = new jsWindow.windowGroup($("#windows"),{ id: "mywg",
        shadow: false, transparent_when_moving: true, fixed_position:false,
        keep_windows_on_page: { bottom: true, right: true}});
    wg.appendWindow({id:"gnome3",title: "My title AYssssAYAY",theme:"gnome3", shadow: true});
    wg.appendWindow({title: "", id:"ubuntu",theme:"ubuntu",top:300,left:400});
    wg.appendWindow({id:"orangeish",title: "My title AYAYAY",theme:"orangeish",top:360,left:400,
                    content: "<div style='background:pink;width:100%;height:100%;'>s</div>"});
    wg.appendWindow({id:"mac",title: "My title AYAYAY",theme:"mac",top:200,left:600,shadow: true});
    window.wg = wg;
});
