enchant();

var width = 1000;
var height = 1400;
var CardNum = 16;
var MyCardNum = 5;
var touched_card = -1;
var initX;
var initY;

Card = enchant.Class.create(Sprite, {
	initialize: function() {
		var game = enchant.Game.instance;
		Sprite.call(this, width/4, height/5);
		this.image = game.assets['card.png'];
		this.who;
		this.addEventListener('touchstart', function() {
				touched_card = this.who;
				initX = this.x;
				initY = this.y;
				this.scaleX = 1;
		});
	}
});

function makeSelect(text, y) {
	var label = new Label(text);
	label.font = "100px monospace";
	label.color = "rgb (255.200.0)";
	label.y = y;
	label.width = 1000;
	return label;
}

window.onload = function() {
	var game = new Game(width, height);
	game.preload('card.png', 'gray_back.png');
	game.onload = function() {
		game.pushScene(game.topScene());
	};

	game.topScene = function() {
		var scene = new Scene();
		var bg = new Sprite(width, height);
		bg.image = game.assets['gray_back.png'];
		scene.addChild(bg);

		var selectMenu = makeSelect("Game START", 1000);
		selectMenu.addEventListener(Event.TOUCH_START, function(e) {
			game.replaceScene(game.menuScene());
		});
		scene.addChild(selectMenu);

		return scene;
	}

	game.menuScene = function(){
		var scene = new Scene();
		var bg = new Sprite(1000, 1500);
		bg.image = game.assets['gray_back.png'];
		scene.addChild(bg);

		var selectGame1 = makeSelect("Game1 START", 1000);
		selectGame1.addEventListener(Event.TOUCH_START, function(e) {
			game.replaceScene(game.game1Scene());
		});
		scene.addChild(selectGame1);

		return scene;
	};

	game.game1Scene = function() {
		var scene = new Scene();
		var bg = new Sprite(width, height);
		bg.image = game.assets['gray_back.png'];
		scene.addChild(bg);

		var touchX = -1;
		var touchY = -1;
		
		var card = new Array(CardNum);
		var mycard = new Array(MyCardNum);

		for (var i = 0; i < CardNum; i++) {
			card[i] = new Card();
			card[i].x = width / Math.sqrt(CardNum) * (i % Math.sqrt(CardNum));
			card[i].y = height*(4/5) / Math.sqrt(CardNum) * Math.floor(i / Math.sqrt(CardNum));
			card[i].who = i;
			scene.addChild(card[i]);
		}
		for (var i = 0; i < MyCardNum; i++) {
			mycard[i] = new Card();
			mycard[i].x = width / MyCardNum * i - mycard[i].width*(1/5)/2;
			mycard[i].y = height*(4/5);
			mycard[i].scaleX *= (4/5);
			mycard[i].who = i+100;
			scene.addChild(mycard[i]);
		}
		
		scene.addEventListener('touchstart', function(e) {
			touchX = e.x;
			touchY = e.y;
		});
		scene.addEventListener('touchmove', function(e) {
				touchX = e.x;
				touchY = e.y;
		});
		scene.addEventListener('touchend', function(e) {
			if(touched_card >= 100) {
				mycard[touched_card-100].x = initX;
				mycard[touched_card-100].y = initY;
				mycard[touched_card-100].scaleX = (4/5);
				touched_card = -1;
			}
		});
		
		scene.addEventListener('enterframe', function() {
			if(touched_card > 100) {
				mycard[touched_card-100].x = touchX - mycard[touched_card-100].width/2;
				mycard[touched_card-100].y = touchY - mycard[touched_card-100].height/2;
			}
		});

		return scene;
	}

	game.start();
}
