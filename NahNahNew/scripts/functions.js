

//Function to create a simple seperation
	function seperatorDIV(elementToInsert)
	{
		var testLabel = document.createElement('LABEL');
		testLabel.innerHTML = "....";
		document.getElementById(elementToInsert).appendChild(testLabel);
	}

//Enemy Functions
	//Function to spawn in enemy
		function spawnEnemy()
		{
			//selects the enemy randomly from list.
			var selectedEnemy = null;
			var value = Math.random();
			var index = 0;
			while(selectedEnemy == null)
			{
				if (index == enemyTable.length)
				{
					selectedEnemy = "Default Enemy";
				}
				else if(value <= enemyTable[index].spawn_rate)
				{	
					selectedEnemy = enemyTable[index];
				}
				else
				{
					value -= enemyTable[index].spawn_rate;
				}
				index++;
			}

		//DIV for Enemy
			var element = document.createElement('DIV');
			element.setAttribute('class', 'row');
			enemyField.appendChild(element);
		//Node 0: nameLabel
			var nameLabel = document.createElement('LABEL');
			nameLabel.innerHTML = selectedEnemy.name;
			element.appendChild(nameLabel);
		//Node 1: healthLabel
			var healthLabel = document.createElement('LABEL');
			healthLabel.innerHTML = ': Health: ';
			element.appendChild(healthLabel);
		//Node 2: hpLabel
			var hpLabel = document.createElement('LABEL');
			hpLabel.innerHTML = selectedEnemy.health;
			element.appendChild(hpLabel);
		//Node 3: defendButton
			var defendButton = document.createElement('BUTTON');
			defendButton.innerHTML = ''.concat('Attack for ', playerDamage);
			defendButton.setAttribute('onClick','attackEnemy(this)');
			element.appendChild(defendButton);
		//Node 4: attackButton
			var attackButton = document.createElement('BUTTON');
			attackButton.innerHTML = ''.concat('Attacking for ', selectedEnemy.damage);
			element.appendChild(attackButton);
			attackButton.style.visibility = "hidden";
			attackButton.setAttribute('onClick','defendEnemy(this)');
		//Input Enemy Relation
			var enemyRelationObject = {enemy: selectedEnemy, position: element};
			enemyRelation.push(enemyRelationObject);

		// Timer for attack
			window.setTimeout(function()
				{
					enemyAttack(attackButton)
				}, Math.random()*2000 + 1000);
		}

	//function to get enemy from their position
		function getEnemyFromPosition(position, remove)
		{
			var result = null;
			var index = 0;
			while (result == null)
			{
				if(enemyRelation.length == index)
				{
					return 0;
				}
				else if(enemyRelation[index].position == position)
				{
					var result = enemyRelation[index].enemy;
					if(remove == 1)
					{
						enemyRelation.splice(index,1);
					}
					return result;
				}
				index++;
			}
		}

	//function to remove enemy from field
		function killEnemy(enemyElement)
		{
				var enemy = getEnemyFromPosition(enemyElement, 1);
				var child = enemyElement.lastElementChild;
				while(child)
				{
					enemyElement.removeChild(child);
					child = enemyElement.lastElementChild;
				}
				enemyElement.remove();
				checkGameEnds();

				var value1 = Math.random();
				var value2 = Math.random();

				if(value2 <= .25 && value1 < .2)//spawn equipment
				{
					spawnTreasure(enemy.e_drop_list, 1)
				}
				if(value2 <= .25 && value1 >= .2)//spawn consumable
				{
					spawnTreasure(enemy.c_drop_list, 1);
				}

				var defeatedEntry = {e: enemy.name, u: username, playerDeath: 0};
				defeatedList.push(defeatedEntry);

				score -= -enemy.difficulty;
				scoreLabel.innerHTML = score;

				if(enemyField.childNodes.length == 0 && score <= startingScore*2)
				{
					hazardSpawner();
				}
		}

	//functions relating to enemy attacks
		function attackEnemy(enemyButton)
		{
			enemyButton.parentNode.childNodes[2].innerHTML -= playerDamage;
			if(enemyButton.parentNode.childNodes[2].innerHTML <= 0)
			{
				killEnemy(enemyButton.parentNode);
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
			if(getEnemyFromPosition(attackButton.parentNode) != 0)
			{
				window.setTimeout(function()
					{
						enemyAttack(attackButton)
					}, Math.random()*2000 + 1000);
			}
		}

		function enemyAttack(attackButton)
		{
			attackButton.style.visibility = "visible";

			var damage = getEnemyFromPosition(attackButton.parentNode, 0).damage;

			damage = Math.max(damage - playerProtection,1);
			
			if(getEnemyFromPosition(attackButton.parentNode, 0) != 0)
			{
				window.setTimeout(function()
					{
						if(attackButton.style.visibility == "visible" && getEnemyFromPosition(attackButton.parentNode, 0) != 0)
						{
							var attackingHazard = getEnemyFromPosition(attackButton.parentNode, 0)
							enemyHit(damage);

							if(playerHealth <= 0)
							{
								var defeatedEntry = {e: attackingHazard.name, u: username, playerDeath: 1};
								defeatedList.push(defeatedEntry);
							}

							defendEnemy(attackButton);
						}
					},1000);
			}
		}

		function enemyHit(amount)
		{
			playerHealth -= amount;
			hpLabel.innerHTML = playerHealth;
			checkGameEnds();
		}

//Trap Functions
	//Spawn Enemy Trap
		function spawnTrap()
		{
			var selectedTrap = null;
			var value = Math.random();
			var index = 0;
			while(selectedTrap == null)
			{
				if(index == trapTable.length)
				{
					selectedTrap = "Default Trap";
				}
				else if(value <= trapTable[index].spawn_rate)
				{
					selectedTrap = trapTable[index];
				}
				else
				{
					value -= trapTable[index].spawn_rate;
				}
				index++;
			}

		//DIV for Trap
			var element = document.createElement('DIV');
			element.setAttribute('class', 'row');
			trapField.appendChild(element);
		//Node 0: nameLabel
			var nameLabel = document.createElement('LABEL');
			nameLabel.innerHTML = selectedTrap.name.concat(": ");
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
			triggerButton.setAttribute('onClick', selectedTrap.effect); 
			element.appendChild(triggerButton);
			triggerButton.style.visibility = "hidden";

			var trapRelationObject = {trap: selectedTrap, position: element};
			trapRelation.push(trapRelationObject);

		//Timer for Trigger
			window.setTimeout(function()
			{
				trapActivate(deactivateButton);
			}, Math.random()*2000 + 1000);
		}

		function getTrapFromPosition(position, remove)
		{
			var result = null;
			var index = 0;
			while (result == null)
			{
				if(trapRelation.length == index)
				{
					return 0;
				}
				else if(trapRelation[index].position == position)
				{
					var result = trapRelation[index].trap;
					if(remove == 1)
					{
						trapRelation.splice(index,1);
					}
					return result;
				}
				index++;
			}
		}

	//Trap activation, damage, and trigger functions
		function trapActivate(trapButton)
		{
			trapButton.style.visibility = "visible";
			if(getTrapFromPosition(trapButton.parentNode, 0) != 0)
			{
				window.setTimeout(function()
				{
					if(trapButton.style.visibility == "visible" && getTrapFromPosition(trapButton.parentNode, 0) != 0)
					{
						var attackingHazard = getTrapFromPosition(trapButton.parentNode, 0);
						trapButton.parentNode.childNodes[2].click();

						if(playerHealth <= 0)
						{
						var defeatedEntry = {e: attackingHazard.name, u: username, playerDeath: 1};
						defeatedList.push(defeatedEntry);
						}

						deactivateTrap(trapButton);
					}
				}, 1000);
			}
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

//Treasure Functions
	//Spawn the Treasure
		function spawnTreasure(treasureTable, list)
		{
			if(list == 1 && treasureTable.length == 0)
			{
				return 0;
			}
			if(list == 1)
			{
				var selectedTreasure = null;
				var value = Math.random();
				var index = 0;

				while(selectedTreasure == null)
				{
					if (index == treasureTable.length)
					{
						selectedTreasure = "Default Treasure";
					}
					else if(value <= treasureTable[index].drop_rate)
					{	
						selectedTreasure = treasureTable[index];
					}
					else
					{
						value -= treasureTable[index].drop_rate;
					}
					index++;
				}
			}
			else
			{
				var selectedTreasure = treasureTable;
			}

		//DIV for Treasure
			var element = document.createElement('DIV');
			element.setAttribute('class', 'row');
			treasureField.appendChild(element);
		//Node 0: nameLabel
			var nameLabel = document.createElement('LABEL');
			nameLabel.innerHTML = selectedTreasure.name;
			element.appendChild(nameLabel);
		//Node 1: deactivationButton
			var lootButton = document.createElement('Button');
			lootButton.innerHTML = "Loot";
			element.appendChild(lootButton);

			if(selectedTreasure.equipment_type == null)
			{
				lootButton.setAttribute('onClick',"consumeItem(this)");
			//Node 2a: Consumable Effect
				consumeItemButton = document.createElement('Button');
				consumeItemButton.innerHTML = "Consume";
				element.appendChild(consumeItemButton);
				consumeItemButton.style.visibility = "hidden";
				consumeItemButton.setAttribute('onClick', selectedTreasure.effect);
			}
			else if (selectedTreasure.equipment_type == "Arms")
			{
				lootButton.setAttribute('onClick',"equipArms(this)");
			//Node 2b: Arms Value
				valueLabel = document.createElement('LABEL');
				valueLabel.innerHTML = selectedTreasure.value;
				element.appendChild(valueLabel);
				valueLabel.style.visibility = "hidden";
			}
			else if (selectedTreasure.equipment_type == "Armor")
			{
				lootButton.setAttribute('onClick',"equipArmor(this)");
			//Node 2c: Armor Value
				valueLabel = document.createElement('LABEL');
				valueLabel.innerHTML = selectedTreasure.value;
				element.appendChild(valueLabel);
				valueLabel.style.visibility = "hidden";
			}
			else
			{
				lootButton.innerHTML = "Not an item?"
			}
		}
	//Consumable Functions
		function healthPack(amount)
		{
			if(playerHealth > 0)
			{
				playerHealth -= -amount;
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
	//Equipment Functions
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
				spawnTreasure(previousArms, 0);
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
				spawnTreasure(previousArmor, 0);
			}
		}
//End game functions
	function checkGameEnds()
	{
		if(playerHealth <= 0)
		{
		//Clear the Fields
			for(let i = 0; i < enemyField.childNodes.length; i++)
			{
				var enemyElement = enemyField.childNodes[i];
				var child = enemyElement.lastElementChild;
				while(child)
				{
					enemyElement.removeChild(child);
					child = enemyElement.lastElementChild;
				}
				enemyElement.remove();
			}

			for(let i = 0; i < trapField.childNodes.length; i++)
			{
				var trapElement = trapField.childNodes[i];
				var child = trapElement.lastElementChild;
				while(child)
				{
					trapElement.removeChild(child);
					child = trapElement.lastElementChild;
				}
				trapElement.remove();
			}

			for(let i = 0; i < treasureField.childNodes.length; i++)
			{
				var treasureElement = treasureField.childNodes[i];
				var child = treasureElement.lastElementChild;
				while(child)
				{
					treasureElement.removeChild(child);
					child = treasureElement.lastElementChild;
				}
				treasureElement.remove();
			}
		//Other End Game Features
			endGameButton.innerHTML = "New Game";
			endGameButton.setAttribute('onClick', 'newGame()');
			endGameField.style.visibility = "visible";
		
		}
		else if(score >= startingScore*2)
		{
			for(let i = 0; i < trapRelation.length; i++)
			{
				score -= -(trapRelation[i].trap.difficulty*2);
				trapRelation[i].trap.difficulty = 0;
				scoreLabel.innerHTML = score;
			}
			difficulty -= -1;
			difficultyLabel.innerHTML = difficulty;
			endGameButton.setAttribute('onClick', 'nextLevel()');
			endGameField.style.visibility = "visible";
		}
	}

	function nextLevel()
	{
		const form = document.createElement('FORM');
		form.action = 'game.php';
		form.method = 'POST';

		const hiddenField1 = document.createElement('input');
			hiddenField1.type = 'hidden';
			hiddenField1.name = 'difficulty';
			hiddenField1.value = difficulty;
			form.appendChild(hiddenField1);

		const hiddenField2 = document.createElement('input');
			hiddenField2.type = 'hidden';
			hiddenField2.name = 'score';
			hiddenField2.value = score;
			form.appendChild(hiddenField2);

		const hiddenField3 = document.createElement('input');
			hiddenField3.type = 'hidden';
			hiddenField3.name = 'health';
			hiddenField3.value = playerHealth;
			form.appendChild(hiddenField3);

			if(playerArms != "Unarmed")
			{
				const hiddenField4 = document.createElement('input');
				hiddenField4.type = 'hidden';
				hiddenField4.name = 'arms';
				hiddenField4.value = playerArms;
				form.appendChild(hiddenField4);
			}
			if(playerArmor != "Unarmored")
			{
				const hiddenField5 = document.createElement('input');
				hiddenField5.type = 'hidden';
				hiddenField5.name = 'armor';
				hiddenField5.value = playerArmor;
				form.appendChild(hiddenField5);
			}

		const hiddenField6 = document.createElement('input');
			hiddenField6.type = 'hidden';
			hiddenField6.name = 'seed';
			hiddenField6.value = seed;
			form.appendChild(hiddenField6);

		const hiddenField7 = document.createElement('input');
			hiddenField7.type = 'hidden';
			hiddenField7.name = 'level';
			hiddenField7.value = level;
			form.appendChild(hiddenField7);

		const hiddenField8 = document.createElement('input');
			hiddenField8.type = 'hidden';
			hiddenField8.name = 'rating';
			hiddenField8.value = rating;
			form.appendChild(hiddenField8);

		for(let i = 0; i < defeatedList.length; i++)
		{
			const hiddenField = document.createElement('input');
			hiddenField.type = 'hidden';
			hiddenField.name = i;
			hiddenField.value = JSON.stringify(defeatedList[i]);

			form.appendChild(hiddenField);
		}

		document.body.appendChild(form);
		form.submit();

	}

	function newGame()
	{
		const form = document.createElement('FORM');
		form.action = 'game.php';
		form.method = 'POST';

		const hiddenField1 = document.createElement('input');
			hiddenField1.type = 'hidden';
			hiddenField1.name = 'difficulty';
			hiddenField1.value = difficulty;
			form.appendChild(hiddenField1);

		const hiddenField2 = document.createElement('input');
			hiddenField2.type = 'hidden';
			hiddenField2.name = 'score';
			hiddenField2.value = score;
			form.appendChild(hiddenField2);

		const hiddenField6 = document.createElement('input');
			hiddenField6.type = 'hidden';
			hiddenField6.name = 'seed';
			hiddenField6.value = seed;
			form.appendChild(hiddenField6);

		const hiddenField7 = document.createElement('input');
			hiddenField7.type = 'hidden';
			hiddenField7.name = 'level';
			hiddenField7.value = level;
			form.appendChild(hiddenField7);

		const hiddenField8 = document.createElement('input');
			hiddenField8.type = 'hidden';
			hiddenField8.name = 'rating';
			hiddenField8.value = rating;
			form.appendChild(hiddenField8);

		for(let i = 0; i < defeatedList.length; i++)
		{
			const hiddenField = document.createElement('input');
			hiddenField.type = 'hidden';
			hiddenField.name = i;
			hiddenField.value = JSON.stringify(defeatedList[i]);

			form.appendChild(hiddenField);
		}

		document.body.appendChild(form);
		form.submit();
	}

	function setRating(value)
	{
		rating = value;
		element1.style.visibility = "hidden";
	}