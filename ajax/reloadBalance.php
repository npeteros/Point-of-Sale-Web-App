<?php
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        include("includes/mysqli_connect.php");

        $id = $_POST['id'];
        $balance = $_POST['balance'];

        $query = "SELECT * FROM customers WHERE custID = '$id'";
        $r = mysqli_query($dbc, $query);
        if(mysqli_num_rows($r) > 0) { // customer exists
            $query = "UPDATE customers SET custBalance = '$balance' WHERE custID = '$id'";
            mysqli_query($dbc, $query);
            echo "Balance reloaded!";

            $query = "UPDATE global SET reloaded = reloaded + $balance WHERE unique_key = 1";
            mysqli_query($dbc, $query);
        } else { // no result retrieved i.e., customer does not exist
            echo "Customer does not exist!";
        }
        
        mysqli_close($dbc);
    }
?>