class XORGate extends Gate {
    constructor(context, not, x, y) {
        super(context, not, x, y, images["or.svg"]);
    }
    quadCurveXAt(t) {
        var s = this.transform.size.x/2 - 2;
        var l = this.transform.size.x/5 - 2;
        var dt = 1 - t;
        return (dt*dt)*(-s) + 2*t*(dt)*(-l) + (t*t)*(-s);
    }
    setInputAmount(target) {
        super.setInputAmount(target);

        for (var i = 0; i < this.inputs.length; i++) {
            var input = this.inputs[i];
            var t = ((input.origin.y) / this.transform.size.y + 0.5) % 1.0;
            if (t < 0)
                t += 1.0;
            var x = this.quadCurveXAt(t);
            input.origin = V(x, input.origin.y);
        }
    }
    activate(x) {
        var on = false;
        for (var i = 0; i < this.inputs.length; i++)
            on = (on !== this.inputs[i].isOn);
        super.activate(on);
    }
    draw() {
        super.draw();

        var renderer = this.context.getRenderer();

        this.localSpace();
        var amt = 2 * Math.floor(this.inputs.length / 4) + 1;
        for (var i = 0; i < amt; i++) {
            var d = (i - Math.floor(amt/2)) * this.transform.size.y;
            var h = 2;
            var x = 12;
            var l1 = -this.transform.size.y/2;
            var l2 = +this.transform.size.y/2;

            var s = this.transform.size.x/2 - h;
            var l = this.transform.size.x/5 - h;

            var p1 = V(-s, l1 + d);
            var p2 = V(-s, l2 + d);
            var c  = V(-l, d);

            renderer.quadCurve(p1.x, p1.y, p2.x, p2.y, c.x, c.y, this.getBorderColor(), 2);
            renderer.quadCurve(p1.x - x, p1.y, p2.x - x, p2.y, c.x - x, c.y, this.getBorderColor(), 2);
        }

        renderer.restore();
    }
    getDisplayName() {
        return this.not ? "XNOR Gate" : "XOR Gate";
    }
    writeTo(node, uid) {
        var XORNode = createChildNode(node, "xorgate");
        super.writeTo(XORNode, uid);
    }
}

function loadXORGate(context, node) {
    var obj = new XORGate(context);
    loadGate(obj, node);
}
