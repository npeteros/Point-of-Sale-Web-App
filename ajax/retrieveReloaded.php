<?php
    if($_SERVER["REQUEST_METHOD"] == "GET") {
        header('Content-type: application/json');

        include("includes/mysqli_connect.php");

        $query = "SELECT reloaded FROM global WHERE unique_key = 1";
        $r = mysqli_query($dbc, $query);
        $data = mysqli_fetch_array($r)[0];
        
        mysqli_close($dbc);
        echo json_encode($data);
    }
?>