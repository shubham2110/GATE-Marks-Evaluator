<!DOCTYPE html>
<meta charset="UTF-8">
<html>
<head>
	<title>Rank Predictor 2022</title>
    <!-- http://www.webgeekly.com/tutorials/jquery/how-to-switch-css-files-on-the-fly-using-jquery/ -->
    <link id="dynamic-css" rel="stylesheet" type="text/css" href="gatestyles-dark.css">
</head>
<body>
<div id="my-header">
<table style="width: 100%;">
	<tr>
		<td id="input-prompt" style="width: 50%; text-align: center;" align="center">
			<div align="center">
				<h1>For GATE Computer Science only.</h1>
				<h1>Instructions:</h1>
				<nav>
				    <li>Login on <a target="_blank" href="http://appsgate.iisc.ernet.in/">(this page).</a></li>
				    <span>»</span>
				    <li>Click on <img src="view-response-button.png" alt="view-response-button.png"></li>
				    <span>»</span>
				    <li>Copy the URL from the address bar</li>
				    <span>»</span>
				    <li>Paste it in the box below</li>
				</nav>
				<br />
				<input type="url" class="has-tooltip" id="text-url" value = "" placeholder="Enter your responses URL here..." onpaste="setTimeout( function(){submitURL();}, 300);" />
				<br />
				<p class="notification">Answers are verified using finalized official keys:<a href="https://drive.google.com/file/d/1p4nF5fT5-6svoSQtjMxtAcNEYO68ZH_Y/view?usp=sharing">Set1</a>, <a href="https://drive.google.com/file/d/1ZADD3mRJEchcwp6Av2xKn4sBT9JtxSXn/view" target="_blank">Set 2</a></p>
				<a href="#" id="form-submit" onclick="submitURL()">Submit</a>
			</div>
		</td>
		<td style="width: 50%;" align="center">
			<table id="table-results" class="table-results">
				<!-- <tr><td></td><td></td><td></td><td></td></tr> -->
				<tr><th>Set</th><td id="set">-</td><th colspan="2"><a id="rank-link" href="VisualizeMarks.php">(Click here for Rank)</a></th></tr>
				
				<tr style="display:none"><th></th><th colspan="2">
						<form id="markform" action="VisualizeMarks.php" method="post" target="_blank">
						<input type="hidden" name="marks" id="marks">
						<input type="hidden" name="max-marks" id="max-marks">
						<input type="hidden" name="setnum" id="setnum">
						<div class="multiselect">
						<div class="selectBox" onclick="showCheckboxes()">
						<select>
						<option> Filter Subjects</option>
						</select>
						<div class="overSelect"></div>
						</div>
						<div id="checkboxes" style="display: block;">
						<label for="2"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="2" value="2" onclick="update_subject_list()">Algorithms<span class="subject-span" id="s2">0</span></label><label for="14"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="14" value="14" onclick="update_subject_list()">Compiler Design<span class="subject-span" id="s14">0</span></label><label for="15"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="15" value="15" onclick="update_subject_list()">CO and Architecture<span class="subject-span" id="s15">0</span></label><label for="16"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="16" value="16" onclick="update_subject_list()">Operating System<span class="subject-span" id="s16">0</span></label><label for="17"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="17" value="17" onclick="update_subject_list()">Databases<span class="subject-span" id="s17">0</span></label><label for="18"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="18" value="18" onclick="update_subject_list()">Theory of Computation<span class="subject-span" id="s18">0</span></label><label for="19"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="19" value="19" onclick="update_subject_list()">Computer Networks<span class="subject-span" id="s19">0</span></label><label for="22"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="22" value="22" onclick="update_subject_list()">Digital Logic<span class="subject-span" id="s22">0</span></label><label for="26"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="26" value="26" onclick="update_subject_list()">Verbal Aptitude<span class="subject-span" id="s26">0</span></label><label for="27"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="27" value="27" onclick="update_subject_list()">Quantitative Aptitude<span class="subject-span" id="s27">0</span></label><label for="28"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="28" value="28" onclick="update_subject_list()">Mathematical Logic<span class="subject-span" id="s28">0</span></label><label for="29"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="29" value="29" onclick="update_subject_list()">Probability<span class="subject-span" id="s29">0</span></label><label for="30"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="30" value="30" onclick="update_subject_list()">Set Theory &amp; Algebra<span class="subject-span" id="s30">0</span></label><label for="31"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="31" value="31" onclick="update_subject_list()">Combinatory<span class="subject-span" id="s31">0</span></label><label for="32"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="32" value="32" onclick="update_subject_list()">Graph Theory<span class="subject-span" id="s32">0</span></label><label for="33"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="33" value="33" onclick="update_subject_list()">Linear Algebra<span class="subject-span" id="s33">0</span></label><label for="35"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="35" value="35" onclick="update_subject_list()">Calculus<span class="subject-span" id="s35">0</span></label><label for="36"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="36" value="36" onclick="update_subject_list()">Programming<span class="subject-span" id="s36">0</span></label><label for="37"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="37" value="37" onclick="update_subject_list()">DS<span class="subject-span" id="s37">0</span></label><label for="113"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="113" value="113" onclick="update_subject_list()">Analytical Aptitude<span class="subject-span" id="s113">0</span></label><label for="112"><input type="checkbox" checked="" data-marks="0" data-tmarks="0" id="112" value="112" onclick="update_subject_list()">Spatial Aptitude<span class="subject-span" id="s112">0</span></label> <input type="hidden" name="selsubjects" id="selsubjects" value="2,14,15,16,17,18,19,22,26,27,28,29,30,31,32,33,35,36,37,113,112">
						</div>
						</div>
						</form>
						</th>
				</tr>

				<tr class="table-top-header"><th></th><th>1 mark</th><th>2 mark</th><th>Total</th></tr>
				<tr>
					<th>Attempted</th>
					<td id="attempted-1-mark">-</td>
					<td id="attempted-2-mark">-</td>
					<td id="attempted-total">-</td>
				</tr>
				<tr>
					<th>Correct</th>
					<td id="correct-1-mark">-</td>
					<td id="correct-2-mark">-</td>
					<td id="correct-total">-</td>
				</tr>

				<tr class="table-top-header"><th></th><th>+ve</th><th>-ve</th><th>Total</th></tr>
				<tr>
					<th>Marks </th>
					<td id="marks-positive">-</td>
					<td id="marks-negative">-</td>
					<td id="marks-total">-</td>
				</tr>
			</table>
		</td>
	</tr>
</table>
</div>


<div id="settings-box-container">
    <div id="settings-box">
        <table>
        <tr>
            <td>
                <!-- <h1 id="settings-box-heading">Settings</h1> -->
                <h2>Theme</h2>
                <span>
                    <input type="radio" name="theme" class="radio" id="theme-dark" checked onclick="set_theme()">
                    <label for="theme-dark">Dark</label>
                </span><br/>
                <span>
                    <input type="radio" name="theme" class="radio" id="theme-light" onclick="set_theme()">
                    <label for="theme-light">Light</label>
                </span>
            </td>
            <td><div id="collapse-button" onclick="toggle_settings_box()"></div></td>
        </tr>
        </table>
    </div>
</div>

<div id="responses"></div>

	<script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
	<script src="process.js"></script>

<script src="process2.js"></script>

<script src="keys21.js"></script>


	
	<script>
		do_initialize();
	</script>
</body>
</html>