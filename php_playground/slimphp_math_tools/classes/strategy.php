<?php
//include the files, but show stack trace if it the app fails
include_once('interface.php');
include_once('abstract.php');
include_once('libs/wordsnumbers.php');

//Strategy pattern for numeric words to intergers 
class WordsToNumsStrategy extends OutputStrategy {
	//additional valid method for validation
	public function valid($string) {
		return !preg_match('/[^A-Za-z,.#-$\s]/', $string);
	}
	
	//Required output method by interface and abstract class
    public function output($input = '') {
		try {
			if ($input != '' && is_string($input) && $this->valid($input)) {
				$ret = new WordsNumbers($input);
				return $ret->return_integer;
			} else {
				throw new Exception('Improper input string.');
			}
		} catch(Exception $e) {
			//Generic error returned to UI - this includes some minor validation
			return $e->getMessage();
		}
    }
}
//Strategy pattern for fibonacci sequence 
class FibNumStrategy extends OutputStrategy {
	//executes the fibonacci sequence and returns the fibonacci number at that position
	public function fibonacci_sequence($position){
	 	$fibarray = array(0, 1);
		for ($i=2; $i<=$position; ++$i) {
			$fibarray[$i] = $fibarray[$i-1] + $fibarray[$i-2];
		}
		return $fibarray[$position];
	}

	//Required output method by interface and abstract class
    public function output($input = '') {
		$numbers = explode(',', $input);
		$output_numbers = array();
		foreach($numbers as $input_number) {
			try {
				if (is_numeric($input_number) && $input_number <= 5000) {
					$output_numbers[] = $this->fibonacci_sequence($input_number);
				} else {
					throw new Exception('Invalid number.');
				}
			} catch(Exception $e) {
				//Generic error returned to UI - this includes some minor validation
				$output_numbers[] = $e->getMessage();
			}
			
		}
        return implode(',', $output_numbers);
    }
}
