<?php
//using Slim framework
require 'Slim/Slim.php';
//slim autoloader
\Slim\Slim::registerAutoloader();
//set $app
$app = new \Slim\Slim();
//Slim map routes for get/post and set view data accordingly based on route method
$app->map('/', function () use ($app) {
	$view_data = array('title' => 'Math Tools');
	if ($app->request()->isPost()) {
		//include the strategy patterns
		include_once('classes/pattern.php');
		//switch on the radio selection and use the associated strategy patterns
		switch($app->request()->post('process_value')) {
			//fibonacci is selected to proccess input
			case 'fibonacci':
				$pattern = new Pattern(new FibNumStrategy());
				$output_data = array('output' => $pattern->algorithm_output->output($app->request()->post('input_values')));
				break;
				
			//words/default is selected to proccess input	
			default:	
			case 'words':
				$pattern = new Pattern(new WordsToNumsStrategy());
				$output_data = array('output' => $pattern->algorithm_output->output($app->request()->post('input_values')));
				break;
			
		}
		$view_data = array_merge($view_data, $output_data, $app->request()->post());
	}
	
	$app->render('_index.php', $view_data);
})->via('GET', 'POST');
//run app
$app->run();
