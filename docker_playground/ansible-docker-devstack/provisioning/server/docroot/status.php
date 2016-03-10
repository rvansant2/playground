<?php
/**
 * User: rvansant2
 * Date: 3/6/16
 */

$link = mysql_connect('127.0.0.1', 'root', 'mysql1') or die('Could not connect: ' . mysql_error());
echo "Connected successfully\n<br />\n";
mysql_select_db('test') or die('Could not select database');