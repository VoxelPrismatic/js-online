win = window;
doc = document;
function get_js_version () {
    this.jsv = {
            versions: [ "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "2.0" ],
            version: ""
        };
    var d = document;
    for (i = 0; i < jsv.versions.length; i++) {
        var g = d.createElement('script'),
            s = d.getElementsByTagName('script')[0];
            g.setAttribute("language", "JavaScript" + jsv.versions[i]);
            g.text = "this.jsv.version='" + jsv.versions[i] + "';";
            s.parentNode.insertBefore(g, s);
    }
    return jsv.version;
}
c = doc.getElementById("c")
ver = get_js_version()+".0"
c.innerHTML += `<div style='text-align: center'>------ JAVASCRIPT ${ver} ;] ------</div>`;
c.innerHTML += `<div style='text-align: center'>----- INTERPRETER v1.2.5 ;] -----</div>`;
thing = ">>> ";
stdin = "";
function arrow(thing) {
    try {
        v = doc.getElementById("v");
        v.contentEditable = 'false';
        v.id = "n";
        v.blur();
        v.onkeydown = null;
    } catch (err) {
    }
    c = doc.getElementById("c");
    c.innerHTML += "<div></div>";
    c.innerHTML += `<span class="con">${serial(thing[:3])}</span>`;
    c.innerHTML += `<span class="edt" id="v">${thing[3:].replace(" ", "\u200b \u200b")}</span>`;
    v = doc.getElementById("v")
    v.onkeydown = keys;
    v.contentEditable = 'true';
} function serial(st) {
    st = st.replace("&", "&amp;");
    st = st.replace("<", "&lt;");
    st = st.replace(">", "&gt;");
    st = st.replace(" ", "\u200b \u200b");
    st = st.replace("\n", "<br>");
    return st;
} function new_print(...args) {
    st = args.join(" ")+"\n";
    doc.getElementById("c").innerHTML += `<div class="out">${serial(st)}</div>`;
} function null_print() {
} function focuser() {
    doc.getElementById("v").focus();
} function interpret():
  try {
    c = doc.getElementById("c")
    v = doc.getElementById("v")
    nl = v.innerHTML.replace("\u200b", "")[1:]
    while (nl[-1] == " ") {
        nl = nl[:-1]
    } if (stdin != "") {
        stdin += "\n"+nl
    } else {
        stdin = nl
    } if (stdin[-1] == "{" || (thing.contains(".") and nl != "")):
        if (thing == ">>> ")
            thing = "... "
        arrow(thing)
        win.set_timeout(5, focuser)
        return
    try {
            exec(stdin, locals = all, globals = all)
            try {
                out = eval(stdin.strip(), locals={"print": null_print}, globals=all)
            } catch (err) {
                out = null;
            }
            c.innerHTML += `<div class="rtn">${serial("<"+(typeof out)+"> "+out)}</div>`
        catch (err) {
            c.innerHTML += `<div class="err">${err}</div>`
        }
        thing = ">>> "
        arrow(thing)
        win.set_timeout(5, focuser)
        stdin = ""
  catch (err) {
    print(ex);
  }
def keys(k):
    if k.key == "Enter":
        interpret()
arrow(thing)
win.set_timeout(5, focuser)
