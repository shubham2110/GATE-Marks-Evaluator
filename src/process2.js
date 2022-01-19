function getCorrectOption(answer, options)
{
	//console.log("options: "+options+" answer: "+answer);
	var option_c = options.indexOf(answer.toLowerCase())+1;
	return option_c;
}
function getCorrectOptionMSQ(answer, options)
{
	//console.log("options: "+options+" answer: "+answer);
	var keys = (""+answer).split(";");
	var option_c="";
	for(var i in keys)
	{
		var key=keys[i];
		//console.log("key = "+key+" i = "+i);
		if(option_c =="")
			option_c = options.indexOf(key.toLowerCase())+1;
		else
			option_c += ","+(options.indexOf(key.toLowerCase())+1);
	}
	return option_c;
}
// New FuzzyEquality. Takes the given array, and the actual answer array
function fuzzyEquality(given_answer, option, actual_answer,type){
	if(actual_answer === 'X') return true;
	if(type == "S")
	{
		//		console.log("given: "+given_answer+" actual: "+actual_answer_arr[0]);
		given = (""+given_answer).split(",");
		actual_answer = getCorrectOptionMSQ(actual_answer, option);
		actual = (""+actual_answer).split(",");
		if(actual.length != given.length)
		{
			//console.log("Wrong answer\n");
			return false;
		}
		for(var i = 0; i < given.length; i++)
		{
			if(actual.indexOf(given[i]) < 0)
			{
				//console.log("Wrong answer\n");
				return false;
			}
		}
		//console.log("Correct answer\n");
		return true;
	}
	if(!option)
	{
		answers = actual_answer.split(",");
		for(ai = 0; ai < answers.length; ai++)
		{
			range = answers[ai].split(":");
			if(range.length == 2)
			{
				if(given_answer >= range[0] && given_answer <= range[1]) return true;
			}
			else {
				if(given_answer == range[0]) return true;
			}
		}
	}

	else{
		answers = actual_answer.split(",");
		for(ai = 0; ai < answers.length; ai++)
		{
			actual_answer = getCorrectOption(answers[ai], option);
			if(given_answer == actual_answer ){
				return true;
			}
		}
	}
	return false;
}

function process(){
	reset();
	get_set();
	get_uid();
	get_uname();
	var questions = document.getElementsByClassName('questionPnlTbl');
	//console.log(questions);
	var givenAnswers = {};
	var qcount = 0;

	//var q_regex = /^Question ID :.*(\d{10}).*(Chosen Option :<\/td>).*>(.*)<\/td>$/;
	var qtype_regex = /Question Type :\w(\w)/;
	var q_regex = /Question ID :.*(\d{9}).*(Chosen Option :)\s*(.*)/;

	for (var i = questions.length - 1; i >= 0; i--) {
		var q = $(questions[i]);
		//console.log(q);
		var q_type, q_no, q_short_id, q_long_id, q_isneg, given_answer;
		var img_name = q.find('img').attr('name');
		var img_names = q.find('img');//.attr('name');
		var found_img = img_name.match(img_regex);
		//var found_imga = img_names[1].match(img_regex1);
		var table_text = q.find('.menu-tbl').text();
		//console.log(table_text);
		var found_type = table_text.match(qtype_regex);
		var found_ttext = table_text.match(q_regex);
		if(!found_ttext)
		{
			table_text = q.find('.questionRowTbl').text();
			found_ttext = table_text.match(/(Given).*(Answer) :(.*)$/);

		}


		//console.log("Answer:" +found_ttext);

		//console.log("imgname "+img_names[0].attr('name'));
		//console.log("imgname "+found_imga);
		//		console.log("imgname "+img_name);
		//	console.log("tbl text "+table_text);
		//	console.log("fnd img "+found_img);
		//console.log("fnd text "+found_ttext);
		if( (found_img && found_img.length >= 3
			&& found_ttext && found_ttext.length >= 4)){
			found_type = found_type[1];
			//console.log("type :"+found_type);
			q_type = found_img[1];
			q_no = found_img[2];
			if((window.set== 1) &&(q_no == 58 ))
			q_no = 54;
			q_short_id = q_type + '' + q_no;
			q_no = parseInt(q_no);
			//	console.log(q_type);
			//		console.log(q_no);
			//		console.log(q_short_id);
			//		console.log(q_long_id);
			q_long_id = parseInt(found_ttext[1]);
			//		console.log(q_long_id);
			if(found_type == 'S')
			{
				q_isneg = 0.0;
			}
			else
			q_isneg = (found_ttext[2][0] === "C")?-1.0:0.0;
			var option = "";
			if(q_isneg || (found_type == 'S'))
			{
				var images = q.find('img').map(function() { return this.name; }).get();

				var option1= images[1].match(img_regex1);
				var option2= images[2].match(img_regex1);
				var option3= images[3].match(img_regex1);
				var option4= images[4].match(img_regex1);
				option = option1[3]+option2[3]+option3[3]+option4[3];
				//console.log(option);
			}

			given_answer = found_ttext[3];
			if(given_answer.charCodeAt(0) === 46){ given_answer = "0" + given_answer; }
			if(given_answer.charCodeAt(0) === 45 && given_answer.charCodeAt(1) === 46){
				given_answer = "-0." + given_answer.substr(2);
			}
			if(given_answer === " -- ") { given_answer = -9999; }
			if(found_type != 'S')
			{
				given_answer = parseFloat(given_answer);
			}
			else
			{
				//		console.log("MSQ "+given_answer);
			}
			qcount += 1;
			givenAnswers[q_short_id] = {
				"answer": given_answer,
				"type": q_type,
				"qtype": found_type,
				"no": q_no,
				"short_id": q_short_id,
				"long_id": q_long_id,
				"is_neg": q_isneg,
				"option": option,
				"node": $(q.find('.menu-tbl')),
				"qnode": q
			};
		}
		else
		{
			console.log("imgname "+img_name);
			console.log("tbl text "+table_text);
			console.log("found img "+found_img);
			console.log("found text "+found_ttext);
			console.log(q);
			return;
		}
	}

	//console.log(qcount);
	if(qcount <= 0){
		alert('Error!\nExpecting questions\nFound:' + qcount);
	}
	//console.log(givenAnswers);
	var attempted_1 = 0, attempted_2 = 0, attempted_total = 0;
	var correct_1 = 0, correct_2 = 0, correct_total = 0;
	var marks_positive = 0.0, marks_negative = 0.0, marks_total = 0.0;
	//var myset = window.set1;
	var myset = window["set" + window.set];
	//var myset = window["set1"];
	//console.log("myset = "+myset);
	var one_max=0;
	var two_max=0;
	var marks_max=0;
	for(var qsid in givenAnswers) {
		if(givenAnswers.hasOwnProperty(qsid)){
			var q = givenAnswers[qsid];
			//	console.log("~~~ "+q.long_id);
			//	console.log("~~~ "+qsid);
			var kq = myset[qsid];
			var is_neg = q.is_neg;
			var qtype = q.qtype;
			if(!kq){
				alert(qsid);
			}
			var selsubjectids=$("#selsubjects").val();
			var subjectids_arr = selsubjectids.split(",");
			if(jQuery.inArray(""+kq[2], subjectids_arr) == -1) 
			{
				console.log(kq[2]+" "+subjectids_arr);
				q.qnode.hide();
				continue;
			}
			else{
				q.qnode.show();
			}
			var crct = '';
			if(qtype == 'C'){
				if(is_neg === 0){
					//alert("Question " + qsid + " expected to be multi-choice.\nDiscrepancy detected!");
					console.log("Question " + qsid + " expected to be multi-choice.\nDiscrepancy detected!");
				}
				else{
					crct_answer_arr = (""+kq[0]).split(",");
					for(ai = 0; ai < crct_answer_arr.length; ai++) {
						if(crct =="")
						{
							crct=getCorrectOption(crct_answer_arr[ai],q.option);
						}
						else
							crct +=","+getCorrectOption(crct_answer_arr[ai],q.option);
					}
				}
			}
			else{
				if(qtype === "S")
				{
					crct = getCorrectOptionMSQ(kq[0],q.option);
				}
				else if(is_neg === -1.0){
					console.log("QType = "+qtype+" Question " + qsid + " expected to be numerical type.\nDiscrepancy detected!"+kq[1]);
					// alert("Question " + qsid + " expected to be numerical type.\nDiscrepancy detected!");
				}
				else
					crct = kq[0];
			}
			var marks = (q.type === "g")?
				((q.no <= 5)?1.0:2.0):
				((q.no <= 25)?1.0:2.0);
			if(marks == 1)
			{
				one_max++;
				marks_max+=1;
			}
			else{
				two_max++;
				marks_max+=2;
			}
			$("#"+kq[2]).attr("data-tmarks", parseFloat($("#"+kq[2]).attr('data-tmarks'))+marks);
			if((q.qtype == 'S') ||(q.answer > -9000) || (kq[0] === "X")){

				attempted_total += 1;
				if (marks===1.0) attempted_1 += 1;
				else attempted_2 += 1;

				var neg_marks = (marks * is_neg)/3.0;
				//console.log("Sid: "+kq[2]);
				if(fuzzyEquality(q.answer, q.option, ""+kq[0],qtype)){
					correct_total += 1;
					if(marks === 1.0) correct_1 += 1;
					else correct_2 += 1;
					marks_positive += marks;
					$("#"+kq[2]).attr("data-marks", parseFloat($("#"+kq[2]).attr('data-marks'))+marks);

					if(kq[0] === "X") crct = "Marks to All";
					q.node.find('tr:last').after('<tr class="goanswer" style="color: green;"><td align="right">✔</td><td class="bold">+' + marks.toFixed(2) + '</td></tr><tr class="goanswer"><td align="right">Correct Answer:</td><td class="bold">'+crct+'</td></tr><tr class="goanswer"><td colspan="2" align="center"><a href="' + kq[1] + '">Discuss on My Website</a></td></tr>');
				}
				else{
					marks_negative += neg_marks;
					$("#"+kq[2]).attr("data-marks", parseFloat($("#"+kq[2]).attr('data-marks'))+neg_marks);
					q.node.find('tr:last').after('<tr class="goanswer" style="color: red;"><td align="right">✗</td><td class="bold">' + neg_marks.toFixed(2) + '</td></tr><tr class="goanswer"><td align="right">Correct Answer:</td><td class="bold">'+crct+'</td></tr><tr class="goanswer"><td colspan="2" align="center"><a href="' + kq[1] + '">Discuss on My Website</a></td></tr>');
				}
			}
			else{
				// alert(q.long_id);
				//		console.log(q.long_id);
				//q.node.find('tr:last').after('<tr><td colspan="2" align="center"><a href="' + kq[1] + '">Discuss on GATEoverflow</a></td></tr>');
				q.node.find('tr:last').after('<tr class="goanswer"><td align="right">Correct Answer:</td><td class="bold">'+crct+'</td></tr><tr class="goanswer"><td colspan="2" align="center"><a href="' + kq[1] + '">Discuss on My Website</a></td></tr>');
			}
			$("#s"+kq[2]).text(parseFloat($("#"+kq[2]).attr('data-marks')).toFixed(2)+"/"+$("#"+kq[2]).attr('data-tmarks'));
			$("#"+kq[2]).val(parseFloat($("#"+kq[2]).attr('data-marks')).toFixed(2)+"/"+$("#"+kq[2]).attr('data-tmarks'));
		}
	}
	marks_total = marks_positive + marks_negative;
	window.final_marks = marks_total;
	$('#attempted-total').text(attempted_total+"/"+(one_max+two_max));
	$('#attempted-1-mark').text(attempted_1+"/"+one_max);
	$('#attempted-2-mark').text(attempted_2+"/"+two_max);
	$('#attempted-percentage').text(((attempted_total*100)/(one_max+two_max)).toFixed(2)+"%");

	$('#correct-1-mark').text(correct_1);
	$('#correct-2-mark').text(correct_2);
	$('#correct-total').text(correct_total);
	$('#correct-percentage').text(((correct_total*100)/attempted_total).toFixed(2)+"%");

	$('#marks-positive').text(marks_positive.toFixed(2));
	$('#marks-negative').text(marks_negative.toFixed(2));
	$('#marks-total').text(marks_total.toFixed(2)+"/"+marks_max);
	$('#marks').val(marks_total.toFixed(2));
	$('#max-marks').val(marks_max);
	$('#marks-percentage').text(((marks_total*100)/marks_max).toFixed(2)+"%");
	//$('#rank-link').attr("href", "VisualizeMarks.php?marks=" + window.final_marks.toFixed(2) + "&set=" + window.set);
	window.final_marks.toFixed(2);
	if(marks_max == 100)
	log_marks();
}

function do_initialize(){
	if(typeof(Storage) !== "undefined"){
		var theme = localStorage.getItem("theme");
		$("#theme-" + theme).prop("checked", true);
		set_theme();
	}
	window._settings_box_collapsed = false;
	toggle_settings_box();
}
