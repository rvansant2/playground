<?php
include_once('classes/pattern.php');
$strategy = new Pattern(new FibNumStrategy());
echo "This is your output: {$strategy->algorithm_output->output('5,7,11')}\n";

$strategy = new Pattern(new WordsToNumsStrategy());
echo "This is your output: {$strategy->algorithm_output->output('negative five milion two hundred thousand and three')}\n";
echo "This is your output: {$strategy->algorithm_output->output('five milion two hundred thousand and three')}\n";
