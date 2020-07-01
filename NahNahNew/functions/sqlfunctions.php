<?php 
	function retreiveMySQLData($sqlStatement)
	{
		//MySQL Connection to Database
		$conn = mysqli_connect('localhost','Edmund','Rogue-Like','rogue_like');

		//check connection
		if(!$conn) //if unsuccessful, evaluate as false
		{
			echo 'Connection error: ' . mysqli_connect_error();
		}

		//make query and get results
		$result = mysqli_query($conn, $sqlStatement);

		//fetch resulting rows as an array
		$results = mysqli_fetch_all($result, MYSQLI_ASSOC);

		//free from memory
		mysqli_free_result($result);

		//close connection to database
		mysqli_close($conn);

		return $results;
	}

	function submitMySQLData($sqlStatement)
	{
		//MySQL Connection to Database
		$conn = mysqli_connect('localhost','Edmund','Rogue-Like','rogue_like');

		//check connection
		if(!$conn) //if unsuccessful, evaluate as false
		{
			echo 'Connection error: ' . mysqli_connect_error();
		}

		//save to database and check
		if(mysqli_query($conn, $sqlStatement))
		{
			mysqli_close($conn);
			return "Successful";
		}
		else
		{
			mysqli_close($conn);
			return "Query Error:" . mysqli_error($conn);
		}
	}
?>