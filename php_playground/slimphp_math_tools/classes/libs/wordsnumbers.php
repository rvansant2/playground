<?php
//Words class, it's a inverse version of Pear Numbers_Words class
class WordsNumbers {
	//class variables
	public $words;
	public $total = 1;
	public $force_addition = false;
	public $last_digit = null;
	public $final_sum = array();
	public $return_integer = 0;
	public $is_negative = false;
	public $numbers = array(
							'zero' 			=> 0,
	    					'one' 			=> 1,
							'two' 			=> 2,
							'three' 		=> 3,
							'four' 			=> 4,
							'five' 			=> 5,
							'six' 			=> 6,
							'seven' 		=> 7,
							'eight' 		=> 8,
							'nine' 			=> 9,
							'ten' 			=> 10,
							'eleven' 		=> 11,
							'twelve' 		=> 12,
							'thirteen' 		=> 13,
							'fourteen' 		=> 14,
							'fifteen' 		=> 15,
							'sixteen' 		=> 16,
							'seventeen' 	=> 17,
							'eighteen' 		=> 18,
							'nineteen' 		=> 19,
							'twenty' 		=> 20,
							'thirty' 		=> 30,
							'forty' 		=> 40,
							'fourty' 		=> 40,
							'fifty' 		=> 50,
							'sixty' 		=> 60,
							'seventy' 		=> 70,
							'eighty' 		=> 80,
							'ninety' 		=> 90,
							'hundred' 		=> 100,
							'thousand' 		=> 1000,
							'million' 		=> 1000000,
							'billion' 		=> 1000000000
						);
		//class constructor
		public function __construct($word_string) {
			$this->words = $word_string;
			$this->check_is_negative();
			$this->sanitize_input();
			$this->run();
		}
		
		//clean input
		public function sanitize_input() {
			$this->words = preg_replace("/[^a-zA-Z]+/", " ", $this->words);
			$this->words = explode(" ", $this->words);
		}
		
		//check if negative is mentioned
		public function check_is_negative() {
			preg_match('/negative/', $this->words, $matches);
			$this->is_negative = (!empty($matches));
		}
		//main execution method
		public function run() {
			foreach ($this->words as $word) {
			    if (!isset($this->numbers[$word]) && $word != "and") {
			        continue;
			    }
			    $word = strtolower($word);
			    if ($word == "and") {
			        if ($this->last_digit === null) {
			            $this->total = 0;
			        }
			        $this->force_addition = true;
			    } else {
			        if ($this->force_addition) {
			            $this->total += $this->numbers[$word];
			            $this->force_addition = false;
			        } else {
			            if ($this->last_digit !== null && $this->last_digit > $this->numbers[$word]) {
			                $this->total += $this->numbers[$word];
			            } else {
			                $this->total *= $this->numbers[$word];
			            }
			        }
			    }

			    $this->last_digit = (isset($this->numbers[$word])) ? $this->numbers[$word] : 0;
			    if (isset($this->numbers[$word]) && $this->numbers[$word] >= 1000) {
			        $this->final_sum[] = $this->total;
			        $this->last_digit = null;
			        $this->force_addition = false;
			        $this->total = 1;
			    }
			}
			
			$this->final_sum[] = $this->total;
			$this->return_integer = array_sum($this->final_sum);
			if ($this->is_negative) {
				$this->return_integer = -$this->return_integer;
			}
		}
}