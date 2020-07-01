<?php
	require 'functions/sqlfunctions.php';

	// $username = "Edmund_Bridges";
	// $email = "edmundbridges2@gmail.com";
	// $level = "forest";
	// $difficulty = 12;

	// //print the results
	// echo "<br />" . "Check if Username is taken:" . "<br />";
	// $results = retreiveMySQLData(
	// 	'SELECT COUNT(username)
	// 	FROM account
	// 	WHERE username = "' . $username . '";');

	// print_r($results);

	// echo $results[0]['COUNT(username)'];

	// echo "<br />" . "Check if Email is taken:" . "<br />";
	// print_r(retreiveMySQLData(
	// 	'SELECT COUNT(email)
	// 	FROM account
	// 	WHERE email = "'. $email . '";'));

	if(isset($_POST['signOut']))
	{
		session_start();
		if(isset($_SESSION['username']))
			$_SESSION['username'] = "";
	}
?>

<!DOCTYPE html>
<html>
	<?php include 'templates/header.php'; ?>

	<section class = "container grey-text">
 		<h4 class = "center"> Hello and Welcome to Nah Nah the Rogue-Like</h4>
 		<h4 class = "center"> This a project that seeks to simulate a Rogue-Like webgame, complete with log in, account information, data storage, and random generation!</h4>
 		<h4 class = "center"> How deep into the abyss can you delve before it overtakes you?!</h4>
 	</section>

	<?php include 'templates/footer.php'; ?>

</html>