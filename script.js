win = window;
doc = document;
function get_js_version () {
    this.jsv = {
            versions: [
                "1.1", "1.2", "1.3", "1.4", "1.5", "1.6", "1.7", "1.8", "1.9", "2.0"
            ],
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
    }
    catch (err) {
    }
    c = doc.getElementById("c");
    c.innerHTML += "<div></div>";
    c.innerHTML += `<span class="con">${serial(thing[:3])}</span>`;
    c.innerHTML += `<span class="edt" id="v">${thing[3:].replace(" ", "\u200b \u200b")}</span>`;
    v = doc.getElementById("v")
    v.onkeydown = keys;
    v.contentEditable = 'true';
}
def serial(st):
    st = st.replace("&", "&amp;")
    st = st.replace("<", "&lt;")
    st = st.replace(">", "&gt;")
    st = st.replace(" ", "\u200b \u200b")
    st = st.replace("\n", "<br>")
    return st
def new_print(*args, end = "\n", sep = " "):
    st = sep.join(str(arg) for arg in args)+end
    doc["c"] <= html.DIV(serial(st), Class="out")
def null_print(*args, **kwargs):
    pass
def focuser():
    doc["v"].focus()
def interpret():
  try:
    global stdin, thing
    c = doc["c"]
    v = doc["v"]
    nl = v.innerHTML.replace("\u200b", "")[1:]
    while nl[-1] == " ":
        nl = nl[:-1]
    if stdin:
        stdin += "\n"+nl
    else:
        stdin = nl
    if stdin.endswith(":") or ('.' in thing and nl):
        if thing == ">>> ":
            thing = "... "
        thing = thing.strip()+" "
        for x in nl:
            if x != " ":
                break
            thing += " "
        if stdin.endswith(":"):
            thing += "    "
        arrow(thing)
        timer.set_timeout(focuser, 5)
        return
    
    if stdin.endswith("<br>") or ">" in thing or v.innerHTML.replace("\u200b", "").strip() == "":
        try:
            all = globals()
            all["print"] = new_print
            exec(stdin.strip(), locals = all, globals = all)
            try:
                out = eval(stdin.strip(), locals={"print": null_print}, globals=all)
            except:
                out = None
            typ = str(type(out)).split("'")[1]
            c <= html.DIV(serial(f"<{typ}> `{out}'"), Class="rtn")
        except Exception as ex:
            c <= html.DIV(serial(str(ex)), Class="err")
        thing = ">>> "
        arrow(thing)
        timer.set_timeout(focuser, 5)
        stdin = ""
  except Exception as ex:
    print(ex)
def keys(k):
    if k.key == "Enter":
        interpret()
arrow(thing)
timer.set_timeout(focuser, 5)
