let button, gui;
var draggedSprite;
const width = 332;
const height = 332;

// if true shows menu instead of blueprint
let val = false;

// the current modelcapsule being clicked
let current = null;

function setup() {
    c = createCanvas(width, height);
    c.parent('canvas');

    models = '[{"name" : "seasons"}, {"name" : "test"}]';
    models = (JSON.parse(models)).map(el => new ModelItem(el));

    start = new ModelCapsule()

    components = [];
    components.push(start);

    var modelLength = models.length;
    for (var i = 0; i < modelLength; i++) {
        let m = models[i];
        m.x = m.x + i * 100;
    }

    frameRate(30);
}

function draw() {
    background(255, 255, 255);

    if (val) {
        show_models();
    } else {
        blueprint();
    }
}

function show_models() {
    let v = width-2;
    fill(155, 155, 255);
    rect(1, 1, v, v, 50);

    // list all models
    for (var i = 0; i < models.length; i++) {
        let m = models[i];
        m.update();
    }
}

function blueprint() {
    // keeps the models the user wants in a list
    // draw them
    for (var i = 0; i < components.length; i++) {
        c = components[i];
        c.update();
    }
}

/* function dragging(c) {
    if (mouseIsPressed && drag != null) {
        // drag.drag();
    } else if (c.mouse_hitbox() && mouseIsPressed && drag == null) {
        drag = c;
    } else {
        drag = null;
    }
} */

function mouseClicked() {
    if (val) {
        for (var i = 0; i < models.length; i++) {
            c = models[i];
            if (c.mouse_hitbox()) {
                current.model = new Model(c.name);
                val = false;
            }
        }
    } else {
        for (var i = 0; i < components.length; i++) {
            c = components[i];
            if (c.mouse_hitbox()) {
                val = true;
                current = c;
            }
        }
    }
}

class Node {
    constructor() {
        this.x = 50;
        this.y = 50;
        this.rad = 40;
    }

    draw() {
        if (this.mouse_hitbox()) {
            fill(10,150,70);
            circle(this.x, this.y, this.rad+10)
        } else {
            fill(150, 30, 70);
            circle(this.x, this.y, this.rad)
        }
    }

    mouse_hitbox() {
        let X = mouseX > this.x-this.rad && mouseX < this.x + this.rad;
        let Y = mouseY > this.y-this.rad && mouseY < this.y + this.rad;
        if (X && Y) {
            return true;
        } else {
            return false;
        }
    }
}

class ModelItem extends Node {
    constructor(model) {
        super();
        this.name = model;
    }

    update() {
        this.draw();
    }
}

class Model extends Node {
    constructor(model) {
        super();
        this.name = model.name;
    }

    update() {
        this.draw();
    }
}

class ModelCapsule {
    constructor() {
        this.x = 1;
        this.y = 1;
        this.width = 330;
        this.height = 55;
        this.model = null;
    }

    draw() {
        rectMode(CORNER);
        let v = 10;
        if (this.mouse_hitbox()) {
            fill(10,150,70);
            rect(this.x, this.y, this.width, this.height,v);
        } else {
            fill(205,205,205);
            rect(this.x, this.y, this.width, this.height,v);
        }
        if (this.model == null) {
            fill(255,255,255);
            rect(this.x+v, this.y+v, this.width-2*v, this.height-2*v,v);
            fill(0,0,0);
            text('Click here to add model!', this.x+this.width/2-7*v, this.y+this.height/2+v/3);
        } else {
            fill(200,200,240);
            rect(this.x+v, this.y+v, this.width-2*v, this.height-2*v,v);
            fill(0,0,0);
            text(this.model.name, this.x+this.width/2-3*v, this.y+this.height/2+v/3);
        }
    }

    mouse_hitbox() {
        let X = mouseX > this.x && mouseX < this.x + this.width;
        let Y = mouseY > this.y && mouseY < this.y + this.height;
        if (X && Y) {
            return true;
        } else {
            return false;
        }
    }
    
    update() {
        this.draw();
    }
}
