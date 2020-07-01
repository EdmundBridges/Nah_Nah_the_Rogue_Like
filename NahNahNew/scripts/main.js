

//Values passed from php:
//username, score, difficulty, playerHealth, playerArms, playerArmor, seed, enemyTable, trapTable, consumableTable, equipmentTable
	seperatorDIV("bodyOfHTML");

//Creating the player field
//playerField, usernameLabel, healthLabel, hpLabel, armsLabel, damageLabel,armorLabel, protectionLabel
	var playerField = document.createElement('DIV');
	playerField.setAttribute('class', 'row');
	document.getElementById("bodyOfHTML").appendChild(playerField);

	var usernameLabel = document.createElement('LABEL');
	usernameLabel.innerHTML = username.concat("    ");
	playerField.appendChild(usernameLabel);

	var healthLabel = document.createElement('LABEL');
	healthLabel.innerHTML = "Health: ";
	playerField.appendChild(healthLabel);

	var hpLabel = document.createElement('LABEL');
	hpLabel.innerHTML = playerHealth;
	playerField.appendChild(hpLabel);

	var labeL = document.createElement('LABEL');
	labeL.innerHTML = "    ";
	playerField.appendChild(labeL);

	var armsLabel = document.createElement('LABEL');
	armsLabel.innerHTML = playerArms;
	playerField.appendChild(armsLabel);

	var labeL = document.createElement('LABEL');
	labeL.innerHTML = ": ";
	playerField.appendChild(labeL);

	var damageLabel = document.createElement('LABEL');
	damageLabel.innerHTML = playerDamage;
	playerField.appendChild(damageLabel);

	var labeL = document.createElement('LABEL');
	labeL.innerHTML = "    ";
	playerField.appendChild(labeL);

	var armorLabel = document.createElement('LABEL');
	armorLabel.innerHTML = playerArmor;
	playerField.appendChild(armorLabel);

	var labeL = document.createElement('LABEL');
	labeL.innerHTML = ": ";
	playerField.appendChild(labeL);

	var protectionLabel = document.createElement('LABEL');
	protectionLabel.innerHTML = playerProtection;
	playerField.appendChild(protectionLabel);

	var labeL = document.createElement('LABEL');
	labeL.innerHTML = "    ";
	playerField.appendChild(labeL);

	var labeL = document.createElement('LABEL');
	labeL.innerHTML = "Difficulty: ";
	playerField.appendChild(labeL);

	var difficultyLabel = document.createElement('LABEL');
	difficultyLabel.innerHTML = difficulty;
	playerField.appendChild(difficultyLabel);

	var labeL = document.createElement('LABEL');
	labeL.innerHTML = "    ";
	playerField.appendChild(labeL);

	var labeL = document.createElement('LABEL');
	labeL.innerHTML = "Score: ";
	playerField.appendChild(labeL);

	var scoreLabel = document.createElement('LABEL');
	scoreLabel.innerHTML = score;
	playerField.appendChild(scoreLabel);


	seperatorDIV("bodyOfHTML");

//Creating the trap field
//trapField
	var trapField = document.createElement('DIV');
	trapField.setAttribute('class', 'section');
	document.getElementById("bodyOfHTML").appendChild(trapField);

	seperatorDIV("bodyOfHTML");

//Creating the enemy field
//enemyField
	var enemyField = document.createElement('DIV');
	enemyField.setAttribute('class', 'section');
	document.getElementById("bodyOfHTML").appendChild(enemyField);

	seperatorDIV("bodyOfHTML");

//Creating the treasure field
//treasureField
	var treasureField = document.createElement('DIV');
	treasureField.setAttribute('class', 'section');
	document.getElementById("bodyOfHTML").appendChild(treasureField);

	seperatorDIV("bodyOfHTML");

//Creating End Game Field
//endGameField
	var endGameField = document.createElement('DIV');
	endGameField.setAttribute('class', 'section');
	document.getElementById("bodyOfHTML").appendChild(endGameField);
	endGameField.style.visibility = "hidden";

	var element1 = document.createElement('DIV');
	element1.setAttribute('class', 'row');
	endGameField.appendChild(element1);

	var oneButton = document.createElement('Button');
	oneButton.innerHTML = 1;
	oneButton.setAttribute('onClick', 'setRating(1)');
	element1.appendChild(oneButton);

	var twoButon = document.createElement('Button');
	twoButon.innerHTML = 2;
	twoButon.setAttribute('onClick', 'setRating(2)');
	element1.appendChild(twoButon);

	var threeButton = document.createElement('Button');
	threeButton.innerHTML = 3;
	threeButton.setAttribute('onClick', 'setRating(3)');
	element1.appendChild(threeButton);

	var fourButton = document.createElement('Button');
	fourButton.innerHTML = 4;
	fourButton.setAttribute('onClick', 'setRating(4)');
	element1.appendChild(fourButton);

	var fiveButton = document.createElement('Button');
	fiveButton.innerHTML = 5;
	fiveButton.setAttribute('onClick', 'setRating(5)');
	element1.appendChild(fiveButton);

	var element2 = document.createElement('DIV');
	element2.setAttribute('class', 'row');
	endGameField.appendChild(element2);

	var endGameButton = document.createElement('Button');
	endGameButton.innerHTML = "Next Level";
	element2.appendChild(endGameButton);

//Creating the enemyRow - Object Relation
const enemyRelation = [];
const trapRelation = [];

const defeatedList = [];
var gameHasEnded = 0;
var rating = -1;
var startingScore = score;

var index = 0;
hazardSpawner();
hazardSpawner();
hazardSpawner();
treasureSpawner();


function hazardSpawner()
{
	var cumulativeDifficulty = 0;

	if((enemyField.childNodes.length + trapField.childNodes.length) < 6 && score <= startingScore*2 && playerHealth > 0)
	{
		let value = Math.random();
		if(value <= .2 && trapField.childNodes.length <= 3 && enemyField.childNodes.length > 0 && enemyField.childNodes.length > 2*trapField.childNodes.length)
		{
			spawnTrap();
		}
		else
		{
			spawnEnemy();
		}
	}
	window.setTimeout(function()
				{
					hazardSpawner();
				}, Math.random()*4000 + 3000);
}

function treasureSpawner()
{
	let value = Math.random();

	if(value < .25 && score <= startingScore*2 && treasureField.childNodes.length < 4 && playerHealth > 0)
	{
		if( value < .2)
		{
			spawnTreasure(consumableTable, 1);
		}
		else
		{
			spawnTreasure(equipmentTable, 1);
		}
	}


	window.setTimeout(function()
				{
					treasureSpawner();
				}, 5000);
}

