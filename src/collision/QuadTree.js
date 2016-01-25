var index = Object.create(null);
var keys = null;
var root = null;

function initialize(x, y, w, h, d) {
    index = Object.create(null);
    root = new QuadTree(x, y, w, h, d);
    keys = Object.keys(index);
}

function createIndex() {
    var key = Object.keys(index).length;
    index[key] = [];
    return key;
}

function intersect(a, b) {
    return !( b.x > a.right || b.right < a.x ||
        b.top > a.y || b.y < a.top );
}

class QuadTree {

    constructor(x, y, width, height, depth) {
        this.x = x;
        this.y = y;
        this.right = x + width;
        this.top = y + height;
        this.width = width;
        this.height = height;

        if (depth > 0) {
            var d = depth - 1;
            var w = width * 0.5;
            var h = height * 0.5;
            this.quad0 = new QuadTree(x, y + h, w, h, d);
            this.quad1 = new QuadTree(x + w, y + h, w, h, d);
            this.quad2 = new QuadTree(x, y, w, h, d);
            this.quad3 = new QuadTree(x + w, y, w, h, d);
        } else {
            this.index = createIndex();
        }
    }

    insert(box) {
        if(intersect(box, this)) {
            if(this.quad0) {
                this.quad0.insert(box);
                this.quad1.insert(box);
                this.quad2.insert(box);
                this.quad3.insert(box);
            } else {
                index[this.index].push(box);
            }
        }
    }

    clear() {
        for(var i = 0, l = keys.length; i < l; i++) {
            index[keys[i]].length = 0;
        }
    }

    select(box, callback) {
        if(intersect(box, this)) {
            if(this.quad0) {
                this.quad0.fill(box, callback);
                this.quad1.fill(box, callback);
                this.quad2.fill(box, callback);
                this.quad3.fill(box, callback);
            } else {
                var boxes = index[this.index];
                var len = boxes.length;
                if(!len) return;
                for(var i = 0; i < len; i++) {
                    callback(boxes[i]);
                }
            }
        }
    }

    checkCollisions(callback) {
        for(var i = 0, li = keys.length; i < li; i++) {
            var boxes = index[keys[i]];
            var a = boxes[i];
            for(var j = 0, lj = keys.length; j < lj; i++) {
                var b =  boxes[j];
                if(a == b) continue;
                if(intersect(a, b)) {
                    callback(a, b);
                }
            }
        }
    }


}