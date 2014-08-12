<!DOCTYPE html>
<html>
  <head>
    <title><?= $title; ?></title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <!-- Bootstrap -->
    <link href="/css/bootstrap.min.css" rel="stylesheet" media="screen">
  </head>
  <body>
    <div class="navbar navbar-inverse navbar-fixed-top">
	      <div class="navbar-inner">
	        <div class="container">
	          <a class="brand" href="/">Math Tools</a>
	        </div>
	      </div>
	    </div>

	    <div class="container">
	      <div class="hero-unit">
	        <h1>Math Tools</h1>
	        <form action="/" method="post">
			  <fieldset>
			    <legend>Enter values and select how you want the input values processed.</legend>
			    <label>Input values</label>
			    <input type="text" name="input_values" id="input_values" placeholder="Enter values.." value="<?php if (isset($input_values)): ?><?= $input_values ?><?php endif; ?>">
			    <span class="help-block"></span>
			    <label class="radio">
				  <input type="radio" name="process_value" id="process_value1"value="words"<?php if(isset($process_value) && $process_value == 'words'): ?> checked<?php else: ?> checked<?php endif; ?>>
				  Words to Numbers - Convert the numeric text values of numbers to integers.
				</label>
				<label class="radio">
				  <input type="radio" name="process_value" id="process_value2" value="fibonacci"<?php if(isset($process_value) && $process_value == 'fibonacci'): ?> checked<?php endif; ?>>
				  Fibonacci - Output the fibonacci numbers at the listed indexes.
				</label>
				<?php if (isset($output)): ?>
					<div class="alert">
					  <button type="button" class="close" data-dismiss="alert">&times;</button>
					  <strong>Output:</strong> <?= $output; ?> <?php if(isset($process_value) && $process_value == 'words' && is_numeric($output)): ?><br/><strong>Numeric format:</strong> <?= number_format($output); ?><?php endif; ?>
					</div>
				<?php endif; ?>
			    <button type="submit" class="btn">Submit</button>
			  </fieldset>
			</form>
	      </div>

	      <hr>

	      <footer>
	        <p>&copy; RVS 2013</p>
	      </footer>

	    </div> <!-- /container -->
    <script src="http://code.jquery.com/jquery.js"></script>
    <script src="/js/bootstrap.min.js"></script>
  </body>
</html>