let boardImg, imgWidth, imgHeight;
let logoImg, winImg, backImg;
let plOneCircleX, plOneCircleY, plOneCircleMove;
let plTwoCircleX, plTwoCircleY, plTwoCircleMove;

const diameter = 16;
let plOneTurn;
let colorList;
let cardColors;
let chosenColor, chosenEvent;  // keeps track of the index of the chosed color card and event card
let cardHeight, cardWidth;
let eventTrack;
let randomNum = [ 'one','two','three','four','five','six']; //array to decide if player take event card
let MENU;

const eventList = 
			[
				"\n\n   Skip next \n       turn",
				"\n\n Move back   \n    1 space",
				"\n\nMove forward \n    1 space",
				"\n\n Move back   \n    3 space",
				"\n\nMove forward \n    3 space",
				"\n\n Move back   \n    5 space",
				"\n\nMove forward \n    5 space",
				"\n\nMove forward \n   to green",
				"\n\n Move back   \n   to green",
				"\n\nMove forward \n     to red",
				"\n\n Move back   \n     to red",
				"\n\nMove forward \n   to yellow",
				"\n\n Move back   \n   to yellow",
				"\n   Call your   \n      mom     \n  and tell her  \n you love her",
				"\n\n      Give   \n   opponent   \n   one dollar",
				"\n\n    Move to  \n  opponents   \n       spot",
				"\n   Opponent    \n       goes   \n    back two    \n       spots",
				"\n   Opponent    \n       goes   \n  forward two   \n       spots",
				"\n   Opponent    \n       goes   \n    back four    \n       spots",
				"\n   Opponent    \n       goes   \n  forward four   \n       spots",
				" Challenge: \n\n 5 push ups ",
				" Challenge: \n\n 10 push ups ",
				" Challenge: \n\n 20 push ups ",
				" Challenge: \n\n  Do a split",
				" Challenge: \n Play Rock,    \n  Paper, and  \n   Scissors,    \n    against \n   opponent",
				" Challenge: \n Say the    \n  Alphabet  \n   Backwards "
				
				
		
				];

let whosTurn;

//variables for button
//B = button X = x-axis Y = y-axis S = size
var buttonText = [];
var buttons;
var BX = 25;
var BX4;
var BXS1 = 70;
var BXS2 = 72;
var BXS3 = 76;
var BXS4 = 68;
var BY1 = 25;
var BY2 = 95;
var BY3 = 165;
var BY4;
var BYS = 20;
var showInstruction = false;
var gameStart = false; 

function setup() {
	
	boardImg = loadImage('CandyLandBoardNew.png');
	logoImg = loadImage('CandyLand.png');
	winImg = loadImage('Sundae.png');
	backImg = loadImage('CandyLand_Back.png');// Menu Background image
	imgWidth = 992;
	imgHeight = 576;
	BX4 = imgWidth - BXS4 - 25;
	BY4 = imgHeight - BYS - 25;
	
	createCanvas(imgWidth, imgHeight);
	
	colorList =
	[
		color(245, 5, 5),
		color(5, 245, 5),
		color(150, 20, 20),
		color(20, 150, 20)
	];
	
	cardColors = 
	[
			color(204, 55, 81),//red
			color(19, 84, 149),//blue
			color(67, 168, 28),//green
			color(149, 46, 193),//purple
			color(215, 188, 53),//yellow
			color(179, 120, 34) //brown	
	];
	
	plOneCircleX = 165;
	plOneCircleY = imgHeight - 85;
	plTwoCircleX= plOneCircleX;
	plTwoCircleY = plOneCircleY + diameter;
	plOneCircleMove = false;
	plTwoCircleMove = false;
	
	plOneTurn = true;
	colorCardClicked = false;
	eventCardClicked = false;
	chosenColor = -1;
	chosenEvent = -1;
	cardWidth = 75;
	cardHeight = 100;
	eventTrack = random(randomNum);
	MENU =0;
	
	whosTurn = new Display();
	buttons = new Buttons();
	
	background(100);
}


//Calls Menu Function to find next state
//Sends Menu variable with default value of 0
function draw() {
 
	MenuDis(MENU);
	//checkWin(plOneCircleX, plOneCircleY, plTwoCircleX, plTwoCircleY, 220, 249, 40, 69);
}

// displays Color Card chosen
function displayColorCard(){
	
		let x = width-100, y = 50;
		fill(color(250,250,250));
		rect(x, y, cardWidth, cardHeight);
		if(chosenColor != -1){
		
	
		//Decides if player selects event card
		if(eventTrack == "one" || eventTrack == "three" || eventTrack == "six"){
			
		//fill(cardColors[chosenColor]);
		rect(x+(cardWidth/2)-30, y+(cardHeight/2)-30, 60, 60);
		textSize(11);
		fill(0, 0, 0);
		text("Choose an \n    event \n     card",x+(cardWidth/2)-25, y+(cardHeight/2)-15);
			
		}
		else{
		fill(cardColors[chosenColor]);
		rect(x+(cardWidth/2)-30, y+(cardHeight/2)-30, 60, 60);
		}
	
	}
	
}

//displays event Card chosen
function displayEventCard(){
	let x = width-100, y = 160;
	fill(color(250,250,250));
	rect(x, y, cardWidth, cardHeight);
	if(chosenEvent != -1){
		textSize(11);
		fill(0, 0, 0);
		// text(eventList[chosenEvent],x+5,y+(cardHeight/2));
		text(eventList[chosenEvent],x+5,y+10);
		
	}
}

//when user clicked "Instruction" button, this function will run
function displayInstruction(){
	fill("#FFFFFF");
	rect(200,50,imgWidth-2*200, imgHeight-2*50,20);
	fill("#000000");
	textSize(24);
	text("How to play?", 220, 90);
	textSize(16);
	text("This is a two player game, first player is the red circle piece and the second \nplayer is the green circle piece.", 220, 120);
	text("When it is your turn, press the \"Color card\" button and move your piece to the \nnext color tile displayed on the card.", 220, 160);
	text("After you moved, if the color card also displays to click on the event card, press \nthe \"Event card\" button and follow the directions on the card (the event card \nmay help you reach the victory, hurt you, or give you a challenge to complete).", 220, 220);
	text("If a player fails to complete the challenge, that player moves 4 tiles back. \nOtherwise, that player moves foward 2 tiles.", 220, 280);
	text("If the direction says to move backwards to a tile and that tiles does not exist,\nplayer must move to the START tile. If the directions says to move forward to a \ntile and that tiles does not exist, player must move to the END time.", 220, 340);
	text("If you stop at the tile that has the white bridge connected to another tile, \nyou can move to the tile closer to the END tile.", 220, 400);
	text("The player that reaches the END tile first wins the game. Good Luck and Have \nFun!", 220, 460);
	textSize(12);
	text("if viewing from game board:\n-press anywhere to close this window-",imgWidth/2-120,imgHeight-75);
}



function mouseDragged() {
	
	let radius = diameter/2;
	
	if(mouseX >= 102+radius && mouseX <= 842-radius && mouseY >= radius && mouseY <= imgHeight-radius){
		
		if(plOneTurn == true && plOneCircleMove == true){
			
			plOneCircleX = mouseX;
			plOneCircleY = mouseY;
		}
		
		if(plOneTurn == false && plTwoCircleMove == true){
			
			plTwoCircleX = mouseX;
			plTwoCircleY = mouseY;
		}
	}
}

function mouseReleased(){
	plOneCircleMove = false;
	plTwoCircleMove = false;
}

function mousePressed(){
	
	//whenever user clicked, close instruction
	showInstruction = false;
	
	//please see each value ment in hoverOver function
		if(hoverOver()==3){	
		plOneTurn = !plOneTurn;
		chosenColor = -1; // when a player clicks next player the chosen card and event card is starts from fresh
		chosenEvent = -1;
		eventTrack = random(randomNum);
		
	}

	//if color card button is clicked, a random color is chosen
	if(hoverOver() == 1){
		if(chosenColor==-1) { 
			chosenColor = int(random(cardColors.length));
		}
	}

	//if color card button is clicked, a random event is chosen
	if(hoverOver() == 2){
		if(chosenEvent == -1 && (eventTrack == "one" || eventTrack == "three" || eventTrack == "six")){
			chosenEvent = int(random(eventList.length));
		}
	}

	if(hoverOver() == 4){
		showInstruction = true;
	}
	
	let radius = diameter/2;
	if(plOneTurn == true && mouseX >= plOneCircleX-radius && mouseX <= plOneCircleX+radius && mouseY >= plOneCircleY-radius && mouseY <= plOneCircleY+radius){
		plOneCircleMove = true;
	}
	if(plOneTurn == false && mouseX >= plTwoCircleX-radius && mouseX <= plTwoCircleX+radius && mouseY >= plTwoCircleY-radius && mouseY <= plTwoCircleY+radius){
			plTwoCircleMove = true;
		}
}


//the definition of each variable can be find at the top of the page
//for implement the key, you can use this fuction's return to implement it
function hoverOver()
{
	if((mouseX>=BX && mouseX<=BX+BXS1)&&(mouseY>=BY1 && mouseY<=BY1+BYS))
		return 1;//user hover over on color card
	if((mouseX>=BX && mouseX<=BX+BXS2)&&(mouseY>=BY2 && mouseY<=BY2+BYS))
		return 2;//user hover over on event card
	if((mouseX>=BX && mouseX<=BX+BXS3)&&(mouseY>=BY3 && mouseY<=BY3+BYS))
		return 3;//user hover over on next player
	if((mouseX>=BX4 && mouseX<=BX4+BXS4)&&(mouseY>=BY4 && mouseY<=BY4+BYS))
		return 4;//user hover over on Instruction button
}


//By default-> displays menu
//Uses conditional statements for next state
function MenuDis(Menu){
		

	//Display Menu
	if(MENU == 0){
		
		
		createCanvas(imgWidth, imgHeight);
		background(255);
		fill(255,254,165);
		rect(0, 0, 500,imgHeight);
		image(backImg,0,0);
		//image(logoImg, 0, 0, 600,600);
		fill(194,255,193);
		rect(450, 250, 500, 85, 30);
		fill(249,172,252);
		rect(450, 350, 500, 85, 30);
		fill(255,254,165);
		rect(450, 450, 500, 85,30);
		textSize(30)
	
		
		if(gameStart == true){
			fill(255,0,0);
			text('*GAME IN PROGRESS*', 650, 40);
			fill(110,108,255);
			text('Type "s" to RESUME -OR- \n Type "r" to Restart', 530, 285);
		}
		else{
			fill(110,108,255);
			text('Type "s" to START', 530, 300);
		}
		
		fill(110,108,255);
		text('Type "i" for INSTRUCTIONS',  530, 400);
		text('Type "e" to EXIT', 530, 500)
		
	}

	// START GAME
  if (MENU == 1) {
    
		gameStart = true;
		image(boardImg, 0, 0);
		buttons.showOptions();
	
			if(plOneTurn){
				stroke(0, 0, 0, 255);
				fill(colorList[3]);
				circle(plTwoCircleX, plTwoCircleY, diameter);
				fill(colorList[0]);
				circle(plOneCircleX, plOneCircleY, diameter);
			}
			else{
				stroke(0, 0, 0, 255);
				fill(colorList[2]);
				circle(plOneCircleX, plOneCircleY, diameter);
				fill(colorList[1]);
				circle(plTwoCircleX, plTwoCircleY, diameter);
			}
		

				//Check if a player has reached the goal
				checkWin(plOneCircleX, plOneCircleY, plTwoCircleX, plTwoCircleY, 440, 500, 80, 140);

	
				//displays the color and event cards. If index is = -1, no cards have been chosen
				displayColorCard();
				displayEventCard();

			
			if(showInstruction){
				displayInstruction();
			}
		
				whosTurn.draw();
				text('Type "m" to return to MENU', 525, 30)
			
			if (mouseButton == RIGHT) {
				MENU = 0
			}
		
  } 

	//Displays Instructions
  if (MENU == 2) {
		
    background(255, 255, 255)
		fill(0);
    textSize(20)
    text('Type "m" to return to MENU', 525, 30)
    textSize(30)
    displayInstruction();
    
  }

	//Exits Game
  if (MENU == 3) {
	
    background(0, 0, 0);
		fill(255);
    textSize(75);
    text('COME AGAIN SOON!', 25, height / 2);
  } 

	//Conditional Statements to change the value of menu
	//Default Value is 0 for menu
	  if (key =='s' || key =='S'){
        MENU = 1
    }
    if (key =='i' || key =='I') {
        MENU = 2
    }
    if (key =='e' || key =='E') {
        MENU = 3
    }
    if (key =='m' || key =='M') {
        MENU = 0
    }
		if (key =='r' || key =='R') {
        gameStart = false;
				MENU = 0;
			
				plOneCircleX = 165;
				plOneCircleY = imgHeight - 85;
				plTwoCircleX= plOneCircleX;
				plTwoCircleY = plOneCircleY + diameter;
				plOneCircleMove = false;
				plTwoCircleMove = false;
				plOneTurn = true;
				colorCardClicked = false;
				eventCardClicked = false;
				chosenColor = -1;
				chosenEvent = -1;

				key = null;
    }
	
  

}


//Displays which players turn it is, text in their respective colors
class Display
{
	constructor()
	{
	this.textX = (imgWidth / 2) - 96;
	this.textY = 550;
	this.colorList = colorList;
	this.textSize = 24;
	}
	
	draw()
	{
		textSize(this.textSize);
		
		if(plOneTurn)
		{
			fill(this.colorList[0]);
			text("Player 1 turn", this.textX, this.textY);
		}
		else
		{
			fill(this.colorList[1]);
			text("Player 2 turn", this.textX, this.textY);
		}
	}
}


//If a player reaches the end, displays who won, shows option to reset
function checkWin(pOneX, pOneY, pTwoX, pTwoY, winXone, winXtwo, winYone, winYtwo)
{
	var transparency;
	var word;
	var colorNumb = 0;
	
	if((pOneX > winXone & pOneX < winXtwo) && (pOneY > winYone & pOneY < winYtwo))
	{
		transparency = 255;
		word = "Player 1 Wins!";
		colorNumb = 0;
	}
	else
	{
		if((pTwoX > winXone & pTwoX < winXtwo) && (pTwoY > winYone & pTwoY < winYtwo))
		{
			transparency = 255;
			word = "Player 2 Wins!";
			colorNumb = 1;
		}
		else
		{
			transparency = 0;
			word = "";
			colorNumb = 0;
		}
	}
	
	fill(0, 0, 0, transparency);
	stroke(0, 0, 0, 0);
	rect(imgWidth/3, imgHeight/3, imgWidth/3, imgHeight/3);
	
	fill(red(colorList[colorNumb]), green(colorList[colorNumb]), blue(colorList[colorNumb]), transparency);
	//fill(colorList[colorNumb], transparency);
	textSize(32);
	text(word, imgWidth/2 - 150, imgHeight/2 - 45);
	
	if(colorNumb == 0)
	{
		fill(red(colorList[1]), green(colorList[1]), blue(colorList[1]), transparency);
	}
	else
	{
		fill(red(colorList[0]), green(colorList[0]), blue(colorList[0]), transparency);
	}
	textSize(24);
	text("Congradulations!!!", imgWidth/2 - 150, imgHeight/2 - 15);
	
	fill(red(colorList[colorNumb]), green(colorList[colorNumb]), blue(colorList[colorNumb]), transparency);
	fill(255, 255, 255, transparency);
	textSize(24);
	text("Type 'e' to Exit  -OR-", imgWidth/2 - 150, imgHeight/2 + 45);
	text("Type 'r' to RESTART", imgWidth/2 - 150, imgHeight/2 + 75);
	
	if(transparency == 255)
	{
	image(winImg, imgWidth/2 + 45, imgHeight/2 - 50);
	}
	
	if (key =='r' || key =='R')
	{

		//Brings game back to menu 
		//sets GameStart back to false 
		MENU = 0; 
		gameStart = false; 
		
		plOneCircleX = 165;
		plOneCircleY = imgHeight - 85;
		plTwoCircleX= plOneCircleX;
		plTwoCircleY = plOneCircleY + diameter;
		plOneCircleMove = false;
		plTwoCircleMove = false;
		plOneTurn = true;
		colorCardClicked = false;
		eventCardClicked = false;
		chosenColor = -1;
		chosenEvent = -1;
		
		key = null;
		
  }
}

class Buttons
{
	constructor()
	{
		buttonText.push("Color card");//0
		buttonText.push("Event card");//1
		buttonText.push("Next player");//2
		buttonText.push("Instruction");//3
	}
	showOptions()
	{
		if(hoverOver()==1)
			fill('#818181');
		else
			fill('#FFFFFF');
		rect(BX,BY1,BXS1,BYS);
		
		if(hoverOver()==2)
			fill('#818181');
		else
			fill('#FFFFFF');
		rect(BX,BY2,BXS2,BYS);
		
		if(hoverOver()==3)
			fill('#818181');
		else
			fill('#FFFFFF');
		rect(BX,BY3,BXS3,BYS);
		
		if(hoverOver()==4)
			fill('#818181');
		else
			fill('#FFFFFF');
		rect(BX4, BY4, BXS4, BYS);
		
		fill('#000000');
		textSize(14);
		text(buttonText[0],BX+2,BY1+BYS-5);
		text(buttonText[1],BX+2,BY2+BYS-5);
		text(buttonText[2],BX+2,BY3+BYS-5);
		text(buttonText[3],BX4+2,BY4+BYS-5);
	}
}//end buttons class
