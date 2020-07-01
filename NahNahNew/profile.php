<?php 
	require 'functions/sqlfunctions.php';

	//Gets the user's highest scores
	session_start();

	if(isset($_SESSION['username'])) {$username = $_SESSION['username'];}
	else	{$username = '';}

	if($username != '' && isset($_POST['deleteAccount']))
	{
		$a = submitMySQLData("
			DELETE FROM defeated
			WHERE username = '$username';
			");

		$b = submitMySQLData("
			DELETE FROM played_on
			WHERE username = '$username';
			");

		$c = submitMySQLData("
			DELETE FROM account
			WHERE username = '$username';
			");

		if($a == $b && $b == $c && $c == 'Successful')
		{
			if(isset($_SESSION['username']))
				{$_SESSION['username'] = '';}
			
			header('Location: index.php');
		}
	}

	$results1 = retreiveMySQLData("
		SELECT MAX(score)
		FROM played_on
		WHERE username = '$username';
		");

	$results1_5 = retreiveMySQLData("
		SELECT level_type, AVG(rating), COUNT(level_type)
		FROM played_on
		WHERE username = '$username'
		GROUP BY level_type;
		");

	//print_r($results1_5);

	//Gets the user's win data
	$results2 = retreiveMySQLData("
		SELECT hazard_name, COUNT(hazard_name)
		FROM defeated
		WHERE username = '$username' AND player_death = 0
		GROUP BY hazard_name;
		");

	//Gets undefeated enemy
	$results3 = retreiveMySQLData("
		SELECT hazard_name
		FROM hazard
		WHERE hazard_name NOT IN(
			SELECT hazard_name
			FROM defeated
			WHERE username = '$username' AND player_death = 0);
		");

	//Gets the user's defeat data
	$results4 = retreiveMySQLData("
		SELECT hazard_name, COUNT(hazard_name)
		FROM defeated
		WHERE username = '$username' AND player_death = 1
		GROUP BY hazard_name;
		");

	//Gets enemies never died to
	$results5 = retreiveMySQLData("
		SELECT hazard_name
		FROM hazard
		WHERE hazard_name NOT IN(
			SELECT hazard_name
			FROM defeated
			WHERE username = '$username' AND player_death = 1);
		");

	//If delete account is pressed, deletes account, then redirects to index
?>

<!DOCTYPE html>
<html>
	<?php include 'templates/header.php'; ?>

	<section class = "container grey-text">
		<div class = "container"></div>
		<div class = "row">
			<label> High Score: </label>
			<label><?php  echo htmlspecialchars($results1[0]["MAX(score)"]);?></label>
		</div>
		<div class = "row">
			<label> ... </label>
		</div>
		<div class = "row">
			<label> Player Level Records</label>
		</div>
		<?php foreach($results1_5 as $r) {?>
			<div class = "row">
				<label> <?php  echo htmlspecialchars($r["level_type"]) . "...Average Rating: ";?> </label>
				<label> <?php  echo htmlspecialchars($r["AVG(rating)"]) . "...Times Played: ";?> </label>
				<label> <?php  echo htmlspecialchars($r["COUNT(level_type)"]);?> </label>
			</div>
		<?php  }?>
		<div class = "row">
			<label> ... </label>
		<div class = "row">
			<label> Player Victory Records</label>
		</div>
		<?php foreach($results2 as $r) {?>
			<div class = "row">
				<label> <?php  echo htmlspecialchars($r["hazard_name"]) . ": ";?> </label>
				<label> <?php  echo htmlspecialchars($r["COUNT(hazard_name)"]);?> </label>
			</div>
		<?php  }?>
		<?php foreach($results3 as $r) {?>
			<div class = "row">
				<label> <?php  echo htmlspecialchars($r["hazard_name"]) . ": ";?> </label>
				<label> <?php  echo 0;?> </label>
			</div>
		<?php  }?>
		<div class = "row">
			<label> ... </label>
		</div>
		<div class = "row">
			<label> Player Defeats Records</label>
		</div>
		<?php foreach($results4 as $r) {?>
			<div class = "row">
				<label> <?php  echo htmlspecialchars($r["hazard_name"]) . ": ";?> </label>
				<label> <?php  echo htmlspecialchars($r["COUNT(hazard_name)"]);?> </label>
			</div>
		<?php  }?>
		<?php foreach($results5 as $r) {?>
			<div class = "row">
				<label> <?php  echo htmlspecialchars($r["hazard_name"]) . ": ";?> </label>
				<label> <?php  echo 0;?> </label>
			</div>
		<?php  }?>
 	</section>
 	<form class="red" action = "profile.php" method = "POST">
 			<div class = "center">
 				<input type="submit" name="deleteAccount" value = "Delete Account" class = "btn red z-depth-0">
 			</div>
 		</form>

	<?php include 'templates/footer.php'; ?>

</html>