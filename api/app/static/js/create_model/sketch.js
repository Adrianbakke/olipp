let button, gui;
var draggedSprite;
const width = 800;
const height = 800;

function setup() {
  c = createCanvas(width,height);
  c.parent('canvas');

  gui = createGui();
  toggle = createToggle('Models', 0, 0, width, 100);
  toggle.setStyle({
    rounding: 0
  });

  components = [];

  models = '[{"name" : "seasons"}, {"name" : "test"}]';
  models = (JSON.parse(models)).map(el => new Model(el));

  frameRate(30);

  updateSprites(false)
}

function draw() {
  background(25, 25, 25);
  
  drawGui();

  if (toggle.val) {
    show_models();
  } else {
    blueprint(); 
  }
}

function show_models() {
  fill(140,80,80);
  rect(0, 100, width, height-100)
  
  // list all models
  var modelLength = models.length;
  for (var i = 0; i < modelLength; i++) {
    let m = models[i];
    m.sprite.position.x = m.menu_x + i*200;
    m.sprite.position.y = m.menu_y;
    m.draw();
  }
}

function blueprint() {
  // keeps the models the user wants in a list
  // draw them
  for (var i = 0; i < components.length; i++) {
    c = components[i];
    if (c.draggedSprite) {
      c.pos[0] = mouseX;
      c.pos[1] = mouseY;
    }
    c.sprite.position.x = c.pos[0];
    c.sprite.position.y = c.pos[1];
    c.draw();
  }
}

class Model {
  constructor(model) {
    this.name = model.name;
    this.pos = [50, 300];
    this.menu_x = 150;
    this.menu_y = 250;
    this.sprite = this.cons_sprite(model);
  }

  draw() {
    drawSprite(this.sprite);
  }

  cons_sprite(model) {
    let sprite = createSprite();
    sprite.draw = function () {
      push();
      fill(255,200,100);
      rect(0,0,100,100);
      pop();
    };
    
    sprite.setCollider('circle', 0, 0, 64);

    sprite.onMouseOver = function() {
      sprite.draw = function () {
        push();
        fill(100,200,255);
        rect(0,0,100,100);
        pop();
       };
    };

    sprite.onMouseOut = function() {
      sprite.draw = function () {
        push();
        fill(255,200,100);
        rect(0,0,100,100);
        pop();
       };
    };  

    sprite.onMousePressed = function() {
      components.push(new Layer(model))
    };
    
    return sprite
  }
}

class Layer {
  constructor(model) {
    this.name = model.name;
    this.draggedSprite = null;
    this.sprite = this.cons_sprite(model);
    this.pos = [150, 300];
  }

  draw() {
    drawSprite(this.sprite);
  }

  cons_sprite() {
    let obj = this;
    let sprite = createSprite();
    sprite.draw = function () {
      push();
      fill(255,200,100);
      rect(0,0,100,100);
      pop();
    };

    sprite.setCollider('circle', 0, 0, 64);

    sprite.onMouseOver = function() {
      sprite.draw = function () {
        push();
        fill(100,200,255);
        rect(0,0,100,100);
        pop();
       };
    };

    sprite.onMouseOut = function() {
      sprite.draw = function () {
        push();
        fill(255,200,100);
        rect(0,0,100,100);
        pop();
       };
    };

    sprite.onMousePressed = function() {
      if (obj.draggedSprite == null) {
        obj.draggedSprite = this;
      }
    };

    sprite.onMouseReleased = function() {
      if (obj.draggedSprite) {
        obj.draggedSprite = false;
      }
    };

    return sprite
  }
}
