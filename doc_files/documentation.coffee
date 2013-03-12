stripX = (str) ->
        str.replace(/\&(?!(\w+;))/g, '&amp;').replace(/</g, '&lt;')

class Doc
        constructor: ->
                @content = ""
                @code = ""
        add_code_snippet: (code_snippet) ->
                @content += """<div class="code"><pre class="prettyprint lang-js">
                #{stripX(code_snippet)}</pre></div>"""
                @code += code_snippet
        get_real_code: ->
                "<script>#{@code}</script>"
        add: (stuff) ->
                @content += """<div class="stuff">#{stuff}</div>"""

doc = new Doc

doc.add("""
<h2>What is jsWindow for?</h2>
<p>jsWindow is for creating fun little desktop windows in the browser. Nothing serious.</p>

<p>All the code snippets shown on this page are actually run in the background.</p>

<p>Here's how you use it... first you must create a "window group", takes two parameters, the first is the element thing which all the windows will be contained within. Just place an empty div somewhere in the html, then select it with jquery like below and pass it in. The second parameter is an object containing settings for jsWindow (optional).</p>
""")
doc.add_code_snippet("""
var windowgroup = new jsWindow.windowGroup($('#windows_div'), {
        start_z_index: 200,
        opaque_when_moving: true,
        theme: "windows7",
        shadow: true
});
""")

doc.add("""
<p>A lot of the window group settings can be overidden. All the window group settings have default values. Ok, now lets add a window:</p>
""")
doc.add_code_snippet("""
windowgroup.appendWindow({
        title: '<b>#1</b> This is <b>my</b> window!!',
        content: 'This is the window content. You can put absolutely anything in here.',
        top:20, left:860, width:400, height:200
});
""")

doc.add("""
<p>You can override some group settings when creating a window:</p>
""")
doc.add_code_snippet("""
windowgroup.appendWindow({
        title: '<b>#2</b> DRRBM',
        content: "♩♭ I'm independent woohoo ♬♫",
        theme: "ubuntu",
        resizable: false,
        top:240, left:860, width:400, height:200
});
""")

doc.add("""
<p>And another example window:</p>
""")
doc.add_code_snippet("""
var blue_window_id = windowgroup.appendWindow({
        title: '<b>#3</b> BOFOEFOE',
        content: "I'm feelin' blue",
        theme: "softblue",
        fixed_position: true,
        keep_windows_on_page: {
                top: true, bottom: true,
                left: true, right: true},
        shadow: false,
        top:460, left:860, width:400, height:200
});
""")
doc.add("""<p>
appendWindow returns the id of the new window. You can use it to remove the window later with windowgroup.remove_window which takes an id as the only parameter. or jsWindow.get_location_information which get the top, left, width, and height css properties of the window, or windowgroup.set_location which takes a window id, and an object containing location information.</p>

<h2>Group Settings:</h2>


<span class="setting">start_z_index</span>
<p>The z-index of the bottom window in the window group. If you set it to 200 and have 1 window then the z-index of the window will be 200. If you have 10 windows, then the topmost window will have a z-index of 209
<br><em>Default value: 100</em></p>
<span class="setting">keep_windows_on_page</span>
<span class="setting">opaque_when_moving</span>
<span class="setting">opaque_when_resizing</span>
<span class="setting">id</span>
<span class="setting">theme</span>
<span class="setting">shadow</span>
<span class="setting">min_height</span>
<span class="setting">min_width</span>
<span class="setting">fixed_position</span>
""")

$(document).ready(->
        $("#doc_container").html(doc.content)
        $("#real_code").html(doc.get_real_code())
)