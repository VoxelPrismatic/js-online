win = window;
doc = document;
function elem(type, content, kw) {
    e = doc.createElement(type);
    e.appendChild(doc.createTextNode(content));
    e.className = kw["class"]
    e.id = kw["id"]
    e.setAttribute("style", kw["style"]);
    return e;
}
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
var c = doc.getElementById("c")
var ver = get_js_version()+".0"
c.appendChild(elem("div", `------ JAVASCRIPT ${ver} ;] ------`, {"style": 'text-align: center'}))
c.appendChild(elem("div", `----- INTERPRETER v1.2.5 ;] -----`, {"style": 'text-align: center'}))
var thing = ">>> ";
var stdin = "";
function arrow(thing) {
    try {
        var v = doc.getElementById("v");
        v.contentEditable = 'false';
        v.id = "n";
        v.blur();
        v.onkeydown = null;
    } catch (err) {
    }
    var c = doc.getElementById("c");
    c.appendChild(elem("div", "", {}));
    c.appendChild(elem("span", serial(thing.slice(0,3)), {"class": "con"}));
    c.appendChild(elem("span", thing.slice(3).replace(" ", "\u200b \u200b"), {"class": "edt", "id": "v"}));
    var v = doc.getElementById("v")
    v.onkeydown = keys;
    v.contentEditable = 'true';
} function serial(st) {
    while (st.includes(" "))
        st = st.replace(" ", "\u200b \u200b");
    while (st.includes("\n"))
        st = st.replace("\n", "<br>");
    return st;
} function new_print(...args) {
    var st = args.join(" ")+"\n";
    doc.getElementById("c").appendChild(elem("div", serial(st), {"class": "out"}));
} function null_print() {
} function focuser() {
    doc.getElementById("v").focus();
} function interpret() {
  try {
    var c = doc.getElementById("c");
    var v = doc.getElementById("v");
    var nl = v.innerHTML.replace("\u200b", "").slice(1);
    nl = nl.replace(/ *$/, "");
    if (stdin != "") {
        stdin += "\n"+nl;
    } else {
        stdin = nl;
    } if (stdin[-1] == "{" || (thing.contains(".") && nl != "")) {
        if (thing == ">>> ")
            thing = "... ";
        arrow(thing);
        win.setTimeout(focuser, 5);
        return;
    } try {
        console.log = null_print
        out = eval(stdin);
        c.appendChild(elem("div", serial("<"+(typeof out)+"> "+out), {"class": "rtn"}));
    } catch (err) {
        c.appendChild(elem("div", `${err}`, {"class": "err"}));
    }
    thing = ">>> ";
    arrow(thing);
    win.setTimeout(focuser, 5);
    stdin = "";
  }
  catch (err) {
    print(err);
  }
} function keys(k) {
    if (k.key == "Enter")
        interpret();
}
arrow(thing);
win.setTimeout(focuser, 5);
