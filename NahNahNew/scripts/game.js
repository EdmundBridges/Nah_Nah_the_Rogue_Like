seperatorDIV("bodyOfHTML");


//player statistics
var playerHealth = 40;
var playerArms = "Unarmed";
var playerDamage = 1;
var playerArmor = "Unarmored";
var playerProtection = 0;
var seed = 1111111;

//creating the player field
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

	seperatorDIV("bodyOfHTML");

//create the enemy field
	var enemyField = document.createElement('DIV');
	enemyField.setAttribute('class', 'section');
	document.getElementById("bodyOfHTML").appendChild(enemyField);

	seperatorDIV("bodyOfHTML");

//create the trap field
	var trapField = document.createElement('DIV');
	trapField.setAttribute('class', 'section');
	document.getElementById("bodyOfHTML").appendChild(trapField);

	seperatorDIV("bodyOfHTML");

//create the treasure field
	var treasureField = document.createElement('DIV');
	treasureField.setAttribute('class', 'section');
	document.getElementById("bodyOfHTML").appendChild(treasureField);

	seperatorDIV("bodyOfHTML");

//Creating End Game Field
	var endGameField = document.createElement('DIV');
	endGameField.setAttribute('class', 'section');
	document.getElementById("bodyOfHTML").appendChild(endGameField);

	var endGameButton = document.createElement('Button');
	endGameButton.innerHTML = "Next Level";
	endGameField.appendChild(endGameButton);
	endGameButton.style.visibility = "hidden";


//enemy statistics
var goblinStats = {name: "Goblin", health: 3, damage: 2};
var mookStats = {name: "Mook", health: 1, damage: 4};
var koboldStats = {name: "Kobold", health: 6, damage: 1};

//trap statistics
var acidTrapStats = {name: "Acid Trap", effect: "trapDamage(3)"};

//treasure statistics
var healthPackStats = {name: "Health Pack", type: "Consumable", effect: "healthPack(5)"};
var pistolStats = {name: "Pistol", type: "Arms", value: 3};
var leatherArmorStats = {name: "Leather Armor", type: "Armor", value: 2};


//testing enemy spawn
spawnEnemy(goblinStats);
spawnEnemy(mookStats);
spawnEnemy(koboldStats);

spawnTrap(acidTrapStats);
spawnTrap(acidTrapStats);

//treasure spawn
spawnTreasure(healthPackStats);
spawnTreasure(pistolStats);
spawnTreasure(leatherArmorStats);




function spawnTreasure(treasure)
{
//DIV for Treasure
	var element = document.createElement('DIV');
	element.setAttribute('class', 'row');
	treasureField.appendChild(element);
//Node 0: nameLabel
	var nameLabel = document.createElement('LABEL');
	nameLabel.innerHTML = treasure.name;
	element.appendChild(nameLabel);
//Node 1: deactivationButton
	var lootButton = document.createElement('Button');
	lootButton.innerHTML = "Loot";
	element.appendChild(lootButton);
	if(treasure.type == "Consumable")
	{
		lootButton.setAttribute('onClick',"consumeItem(this)");
	//Node 2a: Consumable Effect
		consumeItemButton = document.createElement('Button');
		consumeItemButton.innerHTML = "Consume";
		element.appendChild(consumeItemButton);
		consumeItemButton.style.visibility = "hidden";
		consumeItemButton.setAttribute('onClick', treasure.effect);
	}
	else if (treasure.type == "Arms")
	{
		lootButton.setAttribute('onClick',"equipArms(this)");
	//Node 2b: Arms Value
		valueLabel = document.createElement('LABEL');
		valueLabel.innerHTML = treasure.value;
		element.appendChild(valueLabel);
		valueLabel.style.visibility = "hidden";
	}
	else if (treasure.type == "Armor")
	{
		lootButton.setAttribute('onClick',"equipArmor(this)");
	//Node 2c: Armor Value
		valueLabel = document.createElement('LABEL');
		valueLabel.innerHTML = treasure.value;
		element.appendChild(valueLabel);
		valueLabel.style.visibility = "hidden";
	}
	else
	{
		lootButton.innerHTML = "Not an item?"
	}
}

function healthPack(amount)
{
	if(playerHealth > 0)
	{
		playerHealth += amount;
		hpLabel.innerHTML = playerHealth;
	}
}

function consumeItem(lootButton)
{
	lootButton.parentNode.childNodes[2].click();
	var element = lootButton.parentNode;
	var child = element.lastElementChild;
	while(child)
	{
		element.removeChild(child);
		child = element.lastElementChild;
	}
	element.remove();
}

function equipArms(lootButton)
{
	var previousArms = {name: playerArms, type: "Arms", value: playerDamage};

	playerArms = lootButton.parentNode.childNodes[0].innerHTML;
	playerDamage = lootButton.parentNode.childNodes[2].innerHTML;
	armsLabel.innerHTML = playerArms;
	damageLabel.innerHTML = playerDamage;

	var element = lootButton.parentNode;
	var child = element.lastElementChild;
	while(child)
	{
		element.removeChild(child);
		child = element.lastElementChild;
	}
	element.remove();

	for(let i = 0; i < enemyField.childNodes.length; i++)
	{
		enemyField.childNodes[i].childNodes[3].innerHTML = ''.concat('Attack for ', playerDamage);
	}

	if(previousArms.name != "Unarmed")
	{
		spawnTreasure(previousArms);
	}
}

function equipArmor(lootButton)
{
	var previousArmor = {name: playerArmor, type: "Armor", value: playerProtection};

	playerArmor = lootButton.parentNode.childNodes[0].innerHTML;
	playerProtection = lootButton.parentNode.childNodes[2].innerHTML;
	armorLabel.innerHTML = playerArmor;
	protectionLabel.innerHTML = playerProtection;

	var element = lootButton.parentNode;
	var child = element.lastElementChild;
	while(child)
	{
		element.removeChild(child);
		child = element.lastElementChild;
	}
	element.remove();

	if(previousArmor.name != "Unarmored")
	{
		spawnTreasure(previousArmor);
	}
}

function spawnEnemy(enemy)
{

	console.log("TEST");
//DIV for Enemy
	var element = document.createElement('DIV');
	element.setAttribute('class', 'row');
	enemyField.appendChild(element);
//Node 0: nameLabel
	var nameLabel = document.createElement('LABEL');
	nameLabel.innerHTML = enemy.name;
	element.appendChild(nameLabel);
//Node 1: healthLabel
	var healthLabel = document.createElement('LABEL');
	healthLabel.innerHTML = ': Health: ';
	element.appendChild(healthLabel);
//Node 2: hpLabel
	var hpLabel = document.createElement('LABEL');
	hpLabel.innerHTML = enemy.health;
	element.appendChild(hpLabel);
//Node 3: defendButton
	var defendButton = document.createElement('BUTTON');
	defendButton.innerHTML = ''.concat('Attack for ', playerDamage);
	defendButton.setAttribute('onClick','attackEnemy(this)');
	element.appendChild(defendButton);
//Node 4: attackButton
	var attackButton = document.createElement('BUTTON');
	attackButton.innerHTML = ''.concat('Attacking for ', enemy.damage);
	element.appendChild(attackButton);
	attackButton.style.visibility = "hidden";
	attackButton.setAttribute('onClick','defendEnemy(this)');
//Node 5: enemyDamageLabel
	var enemyDamageLabel = document.createElement('LABEL');
	enemyDamageLabel.innerHTML = enemy.damage;
	element.appendChild(enemyDamageLabel);
	enemyDamageLabel.style.visibility = "hidden";
//Timer for attack
	window.setTimeout(function()
		{
			enemyAttack(attackButton)
		}, Math.random()*2000 + 1000);
}


function spawnTrap(trap)
{
//DIV for Trap
	var element = document.createElement('DIV');
	element.setAttribute('class', 'row');
	trapField.appendChild(element);
//Node 0: nameLabel
	var nameLabel = document.createElement('LABEL');
	nameLabel.innerHTML = trap.name.concat(": ");
	element.appendChild(nameLabel);
//Node 1: deactivationButton
	var deactivateButton = document.createElement('Button');
	deactivateButton.innerHTML = "Deactivate";
	deactivateButton.setAttribute('onClick','deactivateTrap(this)');
	element.appendChild(deactivateButton);
	deactivateButton.style.visibility = "visible";
//Node 2: triggerButton
	var triggerButton = document.createElement('Button');
	triggerButton.innerHTML = "Trigger";
	triggerButton.setAttribute('onClick', trap.effect); 
	element.appendChild(triggerButton);
	triggerButton.style.visibility = "hidden";
//Timer for Trigger
	window.setTimeout(function()
	{
		trapActivate(deactivateButton);
	}, Math.random()*2000 + 1000);
}

function attackEnemy(enemyButton)
{
	enemyButton.parentNode.childNodes[2].innerHTML -= playerDamage;
	if(enemyButton.parentNode.childNodes[2].innerHTML <= 0)
	{
		var element = enemyButton.parentNode;
		var child = element.lastElementChild;
		while(child)
		{
			element.removeChild(child);
			child = element.lastElementChild;
		}
		element.remove();
		checkGameEnds();
	}

	for(let i = 0; i < enemyField.childNodes.length; i++)
	{
		enemyField.childNodes[i].childNodes[3].style.visibility = "hidden";
	}

	window.setTimeout(function()
	{
	for(let i = 0; i < enemyField.childNodes.length; i++)
		{
			enemyField.childNodes[i].childNodes[3].style.visibility = "visible";
		}
	}, 2000)
}

function defendEnemy(attackButton)
{
	attackButton.style.visibility = "hidden";
	window.setTimeout(function()
		{
			enemyAttack(attackButton)
		}, Math.random()*2000 + 1000);
}

function enemyAttack(attackButton)
{
	attackButton.style.visibility = "visible";

	var damage = attackButton.parentNode.childNodes[5].innerHTML;

	damage = Math.max(damage - playerProtection,1);
	
	window.setTimeout(function()
		{
			if(attackButton.style.visibility == "visible")
			{
				enemyHit(damage);
				defendEnemy(attackButton);
				}
		},1000);
}

function enemyHit(amount)
{
	playerHealth -= amount;
	hpLabel.innerHTML = playerHealth;
	checkGameEnds();
}

function trapActivate(trapButton)
{
	trapButton.style.visibility = "visible";
	window.setTimeout(function()
	{
		if(trapButton.style.visibility == "visible")
		{
			trapButton.parentNode.childNodes[2].click();
			deactivateTrap(trapButton);
		}
	}, 1000);
}

function trapDamage(amount)
{
	damage = Math.max(amount - playerProtection, 1);
	playerHealth -=damage;
	hpLabel.innerHTML = playerHealth;
	checkGameEnds();
}

function deactivateTrap(deactivateButton)
{
	deactivateButton.style.visibility = "hidden";

	window.setTimeout(function()
	{
		trapActivate(deactivateButton);
	}, 2000*Math.random() + 1000);
}

function checkGameEnds()
{
	if(playerHealth <= 0)
	{
		endGameButton.innerHTML = "New Game";
		endGameButton.setAttribute('onClick', 'neGame()');
		endGameButton.style.visibility = "visible";
	}
	else if(enemyField.childNodes.length == 0)
	{
		endGameButton.setAttribute('onClick', 'nextLevel()');
		endGameButton.style.visibility = "visible";
	}
}

function nextLevel()
{

}

function newGame()
{

}