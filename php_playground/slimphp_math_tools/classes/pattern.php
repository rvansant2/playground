<?php
//include the strategy patterns
include_once('strategy.php');
//class that executes the pattern and returns the output
class Pattern {
	public $algorithm_output;
	public function __construct(OutputStrategy $output_strategy) {
		$this->algorithm_output = $output_strategy;
	}
}