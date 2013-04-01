# License: http://creativecommons.org/licenses/by-sa/3.0/

stripX = (str) ->
        str.replace(/\&(?!(\w+;))/g, '&amp;').replace(/</g, '&lt;')

class Doc
        constructor: ->
                @content = ""
                @code = ""
        add_code_snippet: (code_snippet, run_snippet=true, js=true) ->
                @content += """<div class='code #{if run_snippet then "realcode" else ""}'><pre class='prettyprint #{if js then "lang-js" else ""}'>
                #{stripX(code_snippet)}</pre></div>"""
                if run_snippet
                        @code += code_snippet
        get_real_code: ->
                "<script>#{@code}</script>"
        add: (stuff) ->
                @content += """<div class='stuff'>#{stuff}</div>"""

doc = new Doc

doc.add("""

""")

doc.add("""<h2 id="whatisjswindowfor">What is jsWindow for?</h2>
<p>jsWindow is for creating fun little desktop windows in the browser. Nothing serious. Seriously, don't take this thing too seriously. Will it work for browser X with something Y? I have no idea. You figure that out, since you're so serious. Is jsWindow tested and stuff like that? No. This project probably has many bugs, I developed it as a fun project to work on. I'm not very experienced when it comes to web development. Take this for what it is, a fun little project, and it seems to be working fine with Firefox and Chromium, which is the browsers I've been trying it out in regularly. It also seemed to work last time I tried it in IE 10, but I don't have time to keep track of all those things.</p>""")

doc.add("""
<h2 id="gettingstarted">Getting started</h2>

<p>You need to include the CSS and Javascript, and you also need jQuery. If you just want to get started, put this into your HTML:</p>
""")

doc.add_code_snippet("""
    <meta charset="utf-8">
    <link rel="stylesheet" type="text/css" href="http://static.smartviking.webfactional.com/jswindow/jsWindow_style.css" />
    <script src="http://code.jquery.com/jquery-1.9.1.min.js"></script>
    <script src="http://static.smartviking.webfactional.com/jswindow/jsWindow.js"></script>
""", run_snippet=false)

doc.add("""
<P>You need the meta charset thing because otherwise the browser might start to whine about characters outside of the ASCII range. You can probably use other versions of jQuery as well, try it out and see. If you're doing something that's more or less important, you should <a href="http://static.smartviking.webfactional.com/jswindow/jsWindow.tar">download jsWindow</a>. This is because I can't guarantee the version on this website to always be backwards compatible, and I cannot guarantee the file to always be hosted here for the eternal future. I've got ambitions to keep hosting them, but you never know. If you want to be quick about it, here's a one-liner for downloading jsWindow and placing the files you need into a directory named "jswindow":</p>
""")

doc.add_code_snippet("""
$ mkdir jswindow && cd jswindow && wget http://static.smartviking.webfactional.com/jswindow/jsWindow.tar -O - | tar -xf -
""", run_snippet=false, js=false)

doc.add("""
<h2 id="links">Links</h2>
<p>
Github repository: <a href="https://github.com/SmartViking/jsWindow">https://github.com/SmartViking/jsWindow</a><br />
"Homesite" for jsWindows: <a href="http://static.smartviking.webfactional.com/jswindow/">http://static.smartviking.webfactional.com/jswindow/</a><br />
A jsWindow demo: <a href="http://static.smartviking.webfactional.com/jswindow/demo.html">http://static.smartviking.webfactional.com/jswindow/demo.html</a><br />
<a href=""></a>
</p>
""")


doc.add("""
<h2 id="quickstart">Quickstart</h2>

<p>All the code snippets with pink background shown on this page are actually run in the background, so you can see the windows to the right. (that is, the code which creates the windows in case you're color blind or something).</p>

<p>To use it, first you must create a 'window group' with <em>jsWindow.windowGroup</em>. It takes two parameters, the first is the element thing which all the windows will be contained within. Just place an empty div somewhere in the html, then select it with jquery like below and pass it in. Make sure that you only select one and not multiple elements though, I'm not sure what would happen if you select multiple elements but it's bad and you don't want it to happen. The second parameter is an object containing settings for jsWindow (optional).</p>""")

doc.add_code_snippet("""
var windowgroup = new jsWindow.windowGroup($('#windows_div'), {
        start_z_index: 200,
        transparent_when_moving: true,
        theme: 'windows7',
        shadow: true
});""")

doc.add("""<p>A lot of the window group settings can be overidden. All the window group settings have default values. Ok, now lets add a window:</p>""")

doc.add_code_snippet("""
windowgroup.appendWindow({
        title: '<b>#1</b> This is <b>my</b> window!!',
        content: 'This is the window content. You can put absolutely anything in here.',
        top:20, left:860, width:400, height:200
});""")

doc.add("""<p>You can override some group settings when creating a window:</p>""")

doc.add_code_snippet("""
windowgroup.appendWindow({
        title: '<b>#2</b> DRRBM',
        content: 'Kdieofi iuiu iuefW!!',
        theme: 'ubuntu',
        resizable: false,
        top:240, left:860, width:400, height:200
});""")

doc.add("""<p>And another example window:</p>""")

doc.add_code_snippet("""
var blue_window_id = windowgroup.appendWindow({
        title: '<b>#3</b> BOFOEFOE',
        content: "I'm feelin' blue",
        theme: 'softblue',
        fixed_position: true,
        keep_windows_on_page: {
                top: true, bottom: true,
                left: true, right: true},
        shadow: false,
        top:460, left:860, width:400, height:200
});""")

doc.add("""<p>appendWindow returns the id of the new window. You can use it to remove the window later with <em>windowgroup.remove_window</em> which takes an id as the only parameter. or <em>windowgroup.get_location</em> which gets the top, left, width, and height css properties of the window, or <em>windowgroup.set_location</em> which takes a window id, and an object containing location information. You can basically feed the output of <em>get_location</em> into the second parameter of <em>set_location</em>.</p>""")

class Settings
        constructor: (@conf) ->
                @html = ""
        add_setting: (setting) ->
                @html += """<span class='setting'>#{setting[0]}</span>  <p class="settinginfo">#{setting[1]} </br> <em class='default_setting_value'>Default value: #{setting[2]}</em> </p>"""
        get_html: ->
                """<h2 id='#{@conf.id}'>#{@conf.title}</h2><div class='setting_wrapper'><input class='show_settings' type=button value='Show all' />#{@html}</div>"""

groupsettings  = new Settings {id: "groupsettings",  title: "Group Settings: "}
windowsettings = new Settings {id: "windowsettings", title: "Window Settings: "}

groupsettings.add_setting(["start_z_index","The <em>z-index</em> of the bottom window in the window group. If you set it to <em>200</em> and have <em>1</em> window then the <em>z-index</em> of the window will be <em>200</em>. If you have <em>10</em> windows, then the topmost window will have a <em>z-index</em> of <em>209</em>","100"])
groupsettings.add_setting(["keep_windows_on_page", "An object that contains information about what sides the browser window or document windows can move outside of. If the window in question uses fixed positioning, then the sides refers to the visible browser window. If the window uses absolute positioning, then the sides refer to the whole document. Or something like that.", "{top: true, bottom: false, left: false, right: false}"])
groupsettings.add_setting(["transparent_when_moving","Whether or not the window should be slightly transparent when it's moved.","false"])
groupsettings.add_setting(["transparent_when_resizing","Whether or not the window should be slightly transparent when it's being resized.","true"])
groupsettings.add_setting(["id", "The <em>id</em> of the window group. This is added as a <em>class</em> to the element you pass into <em>jsWindow.windowGroup</em>, so it's a little confusing. This <em>\"id\"</em> is used internally. You can set this to whatever you want if that makes your code better as long as you make sure it's unique. And alphanumeric.", "A value will be generated randomatically"])
groupsettings.add_setting(["theme", "Which <em>theme</em> the window should have. This is literally just inserted right into the window as an additional class. It raises an error if it's not alphanumeric, but there's nothing special about it. It relies on there being CSS code for that class. You can pass in your own theme name, and create CSS for it, and voila that's a new theme. Here's the themes you can chose from at the moment of writing: <em>[softblue, windows7, plain, chromium, gnome3, mac, ubuntu, orangeish]</em>.", "plain"])
groupsettings.add_setting(["shadow","Whether or not there should be a box shadow around the windows. Some themes look much better with shadow.","false"])
groupsettings.add_setting(["min_height","The minimum height when resizing, in pixels. The window will refuse to be become smaller when the user resizes.","100"])
groupsettings.add_setting(["min_width","Same idea as with <em>min_height</em>.","150"])
groupsettings.add_setting(["fixed_position","Whether or not the window should use fixed positioning. Window <em>#3</em> on this page has this option set to true.","false"])

windowsettings.add_setting(["title","The title of the window. This is completely unescaped. It is put inside a <em>p</em> element.","'This is a title!'"])
windowsettings.add_setting(["content","The stuff that's inside the window. Also completely unescaped.","'This is... content'"])
windowsettings.add_setting(["resizable","Whether the window should be resizable. If false, the resize thing will simply be removed.","true"])
windowsettings.add_setting(["close_button","Whether there should be a close button. If false, the close button thing will simply be removed.","true"])
windowsettings.add_setting(["width","The width of the window in pixels.","250"])
windowsettings.add_setting(["height","The height of the window (including the top part) in pixels.","400"])
windowsettings.add_setting(["top","This is the <em>top</em> CSS value of the window. This means different things for absolute positioning and fixed positioning.","0"])
windowsettings.add_setting(["left","Same deal as with the top setting above.","0"])
windowsettings.add_setting(["min_height","Same as for group settings, but only for this window.","Same as the respective group settings value"])
windowsettings.add_setting(["min_width","Same as for group settings, but only for this window.","Same as the respective group settings value"])
windowsettings.add_setting(["theme","Same as for group settings, but only for this window.","Same as the respective group settings value"])
windowsettings.add_setting(["shadow","Same as for group settings, but only for this window.","Same as the respective group settings value"])
windowsettings.add_setting(["fixed_position","Same as for group settings, but only for this window.","Same as the respective group settings value"])
windowsettings.add_setting(["keep_windows_on_page","Same as for group settings, but only for this window.","Same as the respective group settings value"])
windowsettings.add_setting(["id","The id of the window. This is the actual id, not a class like for the group settings.","A value will be generated randomatically"])


doc.add groupsettings.get_html()
doc.add windowsettings.get_html()

doc.add("""
<h2 id="html_structure">HTML structure</h2>

<p>You can get a lot of information from the DOM inspector of your browser about how jsWindow works, but it is useful to see how the HTML is generated. This is literally how it's done at the time of writing this:</p>
""")
doc.add_code_snippet("""
var window_html = 
        (" <div class='jswindow {theme} {shadow} {position}' \\n" +
         "      id='{id}' style='z-index:{zindex};'>         \\n" +
         "   <div class='window-top'>                        \\n" +
         "     {close_button}                                \\n" +
         "     <p class='window-title'>{title}</p>           \\n" +
         "   </div>                                          \\n" +
         "                                                   \\n" +
         "   <div class='window-content-container'>          \\n" +
         "     <div class='window-content'>                  \\n" +
         "       {content}                                   \\n" +
         "     </div>                                        \\n" +
         "   </div>                                          \\n" +
         "   {resize_thing}                                  \\n" +
         " </div>                                            \\n" ).jsWin_format({
                 id: settings.id,
                 zindex: zindex,
                 close_button: (settings.close_button) ? 
                     "<div class='close-window-button'><b>{X}</b></div>".jsWin_format(
                         {X:"X"}) : "",
                 title: settings.title,
                 resize_thing: (settings.resizable) ?
                     "<div class='resize-window'>⌟</div>" : "",
                 content: settings.content,
                 theme: settings.theme,
                 shadow: (settings.shadow) ? "shadow" : "",
                 position: (settings.fixed_position) ? "fixed" : "abs"
             });
""",false)

doc.add("""
<p><em>settings</em> being the window settings described above. You can infer a lot from the code above. One thing that isn't obvious but is the actual case is that <em>settings.content</em> and <em>settings.title</em> is pasted right in the HTML. <em>settings.id</em> and <em>settings.theme</em> should throw exceptions if they aren't alphanumeric (before the code above is executed), but the content and title will absolutely not so beware of cross-site scripting.</p>
""")

doc.add("""
<h2 id="themes">Themes & creating own themes</h2>
<p>Themes are just CSS, nothing more. The theme setting that you pass in must be alphanumeric but other than that there are no restrictions and the setting value will be added as a class to the jsWindow. You can create your own themes by just adding the CSS you need. But you'll want some information about what CSS already is influencing the window. So here is the <a href="http://www.lesscss.org/">less</a> code which applies to all windows at the time of writing this:</p>
""")
doc.add_code_snippet("""
.jswindow * { 
    margin: 0;
    padding: 0;
}
.jswindow {
    background: #FF0000;
    width: 200px;
    height: 200px;
    .window-top {
        cursor: default;
        word-wrap: break-word;
        p.window-title {
            .no-user-select;
            text-align: center;
            padding: 5px 0 5px 0;
            min-height: 20px;
        }
        .close-window-button {
            display: inline;
            float: right;
            padding: 5px 0 5px 0;
            width: 35px;
            text-align: center;
            b { 
                margin-right: 3px; 
                color: white; 
            }
            &:hover {
                cursor: pointer;
            }
            &:active {
                b { 
                    position: relative;
                    top: 1px;
                }
            }
        }
    }
    .window-content-container {
        min-height: 20px;
        padding: 5px;
        height: 40%;
        overflow: auto;
        margin: 2px;
    }
    .window-content {
        height: 99%;
    }
    .resize-window {
        .no-user-select;
        float: right;
        cursor: move;
        position: relative;
        bottom: 21px;
        right: 0px;
        padding: 0 3px 0 6px;
    }
}""", false)

doc.add("""
<p>So if you want to make your own themes you'll just build upon that until it looks nice by adding your own new theme name as an additional class to the CSS selector. As an example, here's how the <em>chromium</em> theme is implemented:</p>
""")

doc.add_code_snippet("""
.jswindow.chromium {
    background: #738eb1;
    border-radius: 5px;
    border: 1px solid #595959;
    padding: 1px;
    .window-top {
        p.window-title {}
        .close-window-button {
            .set_inset_shadow(#9cb0c8, 1px, 1px);
            margin-top: 3px;
            margin-right: 3px;
            height: 5px;
            width: 22px;
            border: 1px solid #687e98;
            border-radius: 2px;
            b {
                font-size: 10px;
                position: relative;
                top: -8px;
                left: 1px;
            }
            &:hover {
                .set_inset_shadow(#ccd6e3, 1px, 2px);
            }
            &:active {
                background: #5a718e;
                .set_inset_shadow(lighten(#ccd6e3, -10%), 1px, 2px);
            }
        }
    }
    .window-content-container {
        background: #FFFFFF;
        border: 1px solid #4b5f79;
        border-radius: 3px;
    }
    .window-content {}
    .resize-window {}
}
""", false)

doc.add("""
<p>Obviously you don't need to use less, you can just use normal CSS. If you want to look at the other themes, look at the <em>jsWindow_style.less</em> file in the github repo.</p>
""")

$(document).ready ->
        $("#doc_container").html doc.content
        $("#real_code").html doc.get_real_code()

        $(".setting_wrapper p").css("display", "none")

        $("#doc_container h2").wrap ->
                """<a class="headerlinkwrapper" href='\##{$(@).attr('id')}'></a>"""        
        $(".show_settings").click ->
                if $(@).val() == "Show all"
                        $(@).parent().children("p").css("display", "block")
                        $(@).val "Hide all"
                else if $(@).val() == "Hide all"
                        $(@).parent().children("p").css("display", "none")
                        $(@).val "Show all"

        $("span.setting").click ->
                if $(@).next().css("display") != "none"
                        $(@).next().css("display", "none")
                else
                        $(@).next().css("display", "block")
