<?php
    if($_SERVER["REQUEST_METHOD"] == "POST") {
        include("includes/mysqli_connect.php");

        $name = $_POST['name'];
        $balance = $_POST['balance'];

        $query = "INSERT INTO customers (custName, custBalance) VALUES ('$name', '$balance')";
        mysqli_query($dbc, $query);
        mysqli_close($dbc);
    }
?>