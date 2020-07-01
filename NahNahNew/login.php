<?php 
	require 'functions/sqlfunctions.php';

	//initializes variables
	$field = array('username' => '', 'password' => '');
	$error = array('username' => '', 'password' => '');
	
	//Validations
	//checks if value has been sent and if submit has be set
	if(isset($_POST['signIn']))
	{
		//check user
		if(empty($_POST['username']))
		{
			$error['username'] = 'Please Input Username';
		}
		else
		{
			$field['username'] = htmlspecialchars($_POST['username']);
			//ensures username is in database
			$u = htmlspecialchars($_POST['username']);
			$results = retreiveMySQLData("
				SELECT COUNT(username)
				FROM account
				WHERE username = '$u';
				");

			if($results[0]['COUNT(username)'] == 0)
			{
				$error['username'] = "Username Not Found";
			}
			else if($results[0]['COUNT(username)'] > 1)
			{
				$error['username'] = "Database Error; Multiple Usernames Found";
			}
			else
			{
				if(!empty($_POST['password']))
				{
					//ensure combination is in database
					$u = htmlspecialchars($_POST['username']);
					$p = htmlspecialchars($_POST['password']);
					$results = retreiveMySQLData("
						SELECT COUNT(username)
						FROM account
						WHERE username = '$u'
						AND password = '$p';
						");

					if($results[0]['COUNT(username)'] == 0)
					{
						$error['password'] = "Combintation not found";
					}
					else if($results[0]['COUNT(username)'] > 1)
					{
						$error['password'] = "Database Error; Multiple Usernames Found";
					}
				}
			}
		}

		//check if password is empty
		if(empty($_POST['password']))
		{
			$error['password'] = 'Please Input a Password';
		}
		//check if password matches allowed characters regex
		//to be implemented
		else
		{
			$field['password'] = htmlspecialchars($_POST['password']);
		}

		//if no errors, redirect
		if(!array_filter($error))//if all values are empty or false, returns false
		{
			//save data to the database
			//Sends user back to starting page, but now logged in
			session_start();

			$_SESSION['username'] = $_POST['username'];

			header('Location: index.php');
		}
	}

	$username = "";

 ?>

 <!DOCTYPE html>
 <html>
 	<?php include 'templates/header.php' ?>

 	<section class = "container grey-text">
 		<h4 class = "center"> Login In </h4>
 		<form class="white" action = "login.php" method = "POST">
 			<label> Username: </label>
 			<label class = "red-text"> <?php echo $error['username'] ?> </label>
 			<input type= "text" name="username" value = "<?php echo htmlspecialchars($field['username']) ?>">

 			<label> Password: </label>
 			<label class = "red-text"> <?php echo $error['password'] ?> </label>
 			<input type= "password" name="password" value = "<?php echo htmlspecialchars($field['password']) ?>">

 			<div class = "center">
 				<input type="submit" name="signIn" value = "Sign In" class = "btn brand z-depth-0">
 			</div>
 		</form>
 	</section>

 	<section class = "container grey-text">

 		<div class = "center">
 			<ul id = "nav-mobile" class = "center hide-on-small-and-down">
 				<li><a href = "createAccount.php" class = "btn brand z-depth-0">Create an Account</a></li>
 			</ul>
 		</div>
 	</section>

 	<?php include 'templates/footer.php' ?>

 </html>