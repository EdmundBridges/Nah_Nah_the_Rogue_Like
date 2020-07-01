<?php 
	if(session_status() == 1)
		session_start();

	if(isset($_GET['signOut']))
	{
		if(isset($_SESSION['username']))
		{
			$_SESSION['username']= '';
		}


		header('Location: index.php');
	}

	if(isset($_SESSION['username']))
	{
		$username = $_SESSION['username'];
	}
	else
	{
		$username = '';
	}
 ?>

<head>
	<title>Nah Nah the Basic Rogue-like</title>
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css">
	<style type="text/css">
		.brand {background: #cbb09c !important;}
		.brand-text{color: #cbb09c !important;}
		form {max-width: 460px; margin: 20px auto; padding: 20px;}
	</style>
</head>
	<body id = "bodyOfHTML" class = "grey lighten-4">
		<nav class = "white" overflow = "auto">
			<div class = "sec">
				<?php
				if($username != ""){ ?>
					<div class = "">
						<ul id = "nav-mobile" class = "left hide-on-small-and-down" style = "word-wrap">
							<li><a href = "game.php" class = "btn brand z-depth-0">Play</a></li>
						</ul>
					</div>
				<?php } ?>
					<div class = "white">
						<a href = "index.php" class = "center brand-logo brand-text"> Nah Nah the Basic Rogue-like</a>
					</div>
				<?php
				if($username == ""){ ?>
					<div class = "" width = "100%">
					<ul id = "nav-mobile" class = "right hide-on-small-and-down">
						<li><a href = "login.php" class = "btn brand z-depth-0">Log In</a></li>
					</ul>
					</div>
				<?php }
				else{ ?>
					<div class = "">
						<ul id = "nav-mobile" class = "right hide-on-small-and-down">
							<li><a href = "?signOut=true" value = "signOut" class = "btn brand z-depth-0" method = "POST">Sign Out
							</a></li>
						</ul>
					</div>
					<div  class = "">
						<ul id = "nav-mobile" class = "right hide-on-small-and-down">
							<li><a href = "profile.php" class = "btn brand z-depth-0">
								<?php  echo htmlspecialchars($username); ?>
							</a></li>
						</ul>
					</div>
				<?php } ?>
			</div>
		</nav>