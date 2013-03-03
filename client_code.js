$(document).ready(function () {
    var wikipedia_iframe = 
            "<iframe src='http://www.wikipedia.com' style='width:480px;height:320px'>" +
            "  <p>Your browser does not support iframes.</p>   " +
            "</iframe>";
    
    var wg = new jsWindow.windowGroup($("#windows"), {
        keep_windows_on_page: {bottom:true, right:true, left:true},
        opaque_when_moving: true,
        theme: "softblue"
    });
    wg.appendWindow({title: "11111 uihouyo ghuoiygiytgi ytfityf iytf111111",
                     id: "1",top:200,left:200, theme: "plain"});
    wg.appendWindow({title: "22222222222",id: "2", 
                     top: 300, left: 100, width: 400, height: 200});
    var wpID = wg.appendWindow(
        { id: "3",
          content: wikipedia_iframe + "<input type=button id=close value='Close window'>",
          height: 400,
          width: 500,
          title: "333333333333",
          left: 400,
          close_button: false,
          resizable: false });
    

    $("#close").click(function() {
        wg.remove_window(wpID);
    });
});
