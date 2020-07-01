<?php 

	require 'functions/sqlfunctions.php';

	//initializes variables
	$field = array('username' => '', 'email' => '', 'password' => '', 'c_password' => '');
	$error = array('username' => '', 'email' => '', 'password' => '', 'c_password' => '');
	
	//Validations
	//checks if value has been sent and if submit has be set
	if(isset($_POST['submit']))
	{
		//check user
		if(empty($_POST['username']))
		{
			$error['username'] = 'Please Input Username';
		}
		else
		{
			$field['username'] = htmlspecialchars($_POST['username']);
			//check if username is in use
			$results = retreiveMySQLData(
				'SELECT COUNT(username)
				FROM account
				WHERE username = "' . htmlspecialchars($_POST['username']) . '";');

			if($results[0]['COUNT(username)'] > 0)
			{
				$error['username'] = "Username Taken";
			}
		}


		//check if email is empty
		if(empty($_POST['email']))
		{
			$error['email'] = 'Please Input Email';
		}
		else
		{
			$field['email'] = htmlspecialchars($_POST['email']);

			//check if email is valid
			if(!filter_var($field['email'],FILTER_VALIDATE_EMAIL))
			{
				$error['email'] = 'Not a valid email';
			}
			//check if email is in use
			$e = htmlspecialchars($_POST['email']);
			$results = retreiveMySQLData("
				SELECT COUNT(email)
				FROM account
				WHERE email = '$e';
				");

			if($results[0]['COUNT(email)'] > 0)
			{
				$error['email'] = "Email Taken";
			}
		}


		//check if password is empty
		if(empty($_POST['password']))
		{
			$error['password'] = 'Please Select a Password';
		}
		else
		{
			$field['password'] = htmlspecialchars($_POST['password']);
			//check if password matches allowed characters regex
		}
		//check if c_password is empty
		if(empty($_POST['c_password']))
		{
			$error['c_password'] = 'Please Confirm Password';
		}
		else
		{
			$field['c_password'] = htmlspecialchars($_POST['c_password']);
			//check if passwords match
			if($_POST['password'] != $_POST['c_password'])
			{
				$error['c_password'] = 'Passwords do not match';
			}
		}

		//if no errors, redirect
		if(!array_filter($error))//if all values are empty or false, returns false
		{
			//save data to the database
			$conn = mysqli_connect('localhost','Edmund','Rogue-Like','rogue_like');

			//check connection
			if(!$conn) //if unsuccessful, evaluate as false
			{
				echo 'Connection error: ' . mysqli_connect_error();
			}

			$field['username'] = mysqli_real_escape_string($conn, $_POST['username'] );
			$field['email'] = mysqli_real_escape_string($conn, $_POST['email'] );
			$field['password'] = mysqli_real_escape_string($conn, $_POST['password'] );

			mysqli_close($conn);

			$u = $field['username'];
			$e = $field['email'];
			$p = $field['password'];
			submitMySQLData("
				INSERT INTO account(username, email, password) 
				VALUES ( '$u', '$e', '$p');
				");

			session_start();

			$_SESSION['username'] = $_POST['username'];

			header('Location: index.php');
		}
	}

	//$username = "";

 ?>

 <!DOCTYPE html>
 <html>
 	<?php include 'templates/header.php' ?>

 	<section class = "container grey-text">
 		<h4 class = "center"> Create an Account </h4>
 		<form class="white" action = "createAccount.php" method = "POST">
 			<label> Username: </label>
 			<label class = "red-text"> <?php echo $error['username'] ?> </label>
 			<input type= "text" name="username" value = "<?php echo htmlspecialchars($field['username']) ?>">

 			<label> Email: </label>
 			<label class = "red-text"> <?php echo $error['email'] ?> </label>
 			<input type= "text" name="email" value = "<?php echo htmlspecialchars($field['email']) ?>">

 			<label> Password: </label>
 			<label class = "red-text"> <?php echo $error['password'] ?> </label>
 			<input type= "password" name="password" value = "<?php echo htmlspecialchars($field['password']) ?>">

 			<label> Confirm Password: </label>
 			<label class = "red-text"> <?php echo $error['c_password'] ?> </label>
 			<input type= "password" name="c_password" value = "<?php echo htmlspecialchars($field['c_password']) ?>">

 			<div class = "center">
 				<input type="submit" name="submit" value = "Submit" class = "btn brand z-depth-0">
 			</div>
 		</form>
 	</section>

 	
 	<?php include 'templates/footer.php' ?>

 </html>