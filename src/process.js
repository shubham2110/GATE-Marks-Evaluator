function about(){
	var author = "";
	var special_thanks = "";
	var source = "";
	// For easily verifying currently cached version
	var version = "GO keys";
}

function toggle_settings_box(){
	var collapsed = window._settings_box_collapsed;
	var left = -125;
	var transform = "rotate(0deg)";
	if(collapsed){
		left = 10;
		$("#collapse-button").removeClass("collapsed");
		transform = "rotate(180deg)";
	}
	$("#collapse-button").css("transform", transform);
	$("#settings-box").animate({
		left: left + "px"
	});
	window._settings_box_collapsed = !window._settings_box_collapsed;
}

function set_theme(){
	$(".radio").blur();
	var mytheme = "dark";
	if ($("#theme-light").is(":checked")){
		mytheme = "light";
	}
	if(typeof(Storage) !== "undefined"){
		localStorage.setItem("theme", mytheme);
	}
	$("#dynamic-css").attr("href", "gatestyles-" + mytheme + ".css?v=0.013");
}
function submitURL(){
    var responses = $('#responses');
    responses.html('<div style="text-align: center;"><h1>Loading...</h1></div>');
    var url = $('#text-url').val();
	window.url = url;
    url = url.replace(/\s+/g, "");
    $.ajax({
		url: "geturl.php?url="+url,
		success: function(data){
			data = data.replace(/!important/g, ""); // Provide ability to override GATE css for our dark theme

			responses.html(data);
			window.set = {};
			window.uid = "";
			window.final_marks = -1;
			process();
			$('#text-url').val("");
		}
	});
}

function get_set(){
//window.set = 1;
	var strongs = $(".main-info-pnl").find('strong');
	var set_regex = /\d\dth Feb S(\d)/;
	for (var i = strongs.length - 1; i >= 0; i--) {
		var text = $(strongs[i]).text();
		var found = text.match(set_regex);
		if(found && found.length >= 2){
			window.set = parseInt(found[1]);
			break;
		}
	}
	$("#set").html(window.set);
	$("#setnum").val(window.set);
}

function get_uname(){
	var trs = $(".main-info-pnl").find('tr');
	var uname_regex = /Candidate Name(.*)/;
	for (var i = trs.length - 1; i >= 0; i--) {
		var text = $(trs[i]).text();
		if(text!=""){
			//console.log(text);
		}
		var found = text.match(uname_regex);
		if(found && found.length >= 2){
			window.uname = found[1];
			console.log(window.uname);
			break;
		}
	}
}
function get_uid(){
	var trs = $(".main-info-pnl").find('tr');
	var uid_regex = /Candidate ID.*(CS\w+)/;
	for (var i = trs.length - 1; i >= 0; i--) {
		var text = $(trs[i]).text();
		if(text!=""){
			//console.log(text);
		}
		var found = text.match(uid_regex);
		if(found && found.length >= 2){
			window.uid = found[1];
			return;
			//break;
		}
	}

}

function log_marks(){
	// No more logging user data.
	// The game has ended :)
	//return;
	var script_kiddie = "Find better things to do with your time buddy.. ";
//return;	
	// ===============================
	
//console.log(window.url);
//console.log(window.uid);
if(/CS21S[5|6]\d{7}/.test(window.uid) && /AssessmentQPHTMLMode1/.test(window.url))
{
//console.log(window.url);
    $.post("logmymarks.php",
    	{id: window.uid, url:window.url, name:window.uname},
    	function(data){
			//console.log(data);
		});
//	return;
    $.post("logmymarks.php",
    	{id: window.uid, sid: "0",  marks: window.final_marks.toFixed(2), url:window.url},
    	function(data){
			//console.log(data);
		});
	
	
	var subjects = $("#selsubjects").val();
	var sid_arr = subjects.split(",");
	for(var i = 0; i < sid_arr.length; i++)
	{
	var mark = $("#"+sid_arr[i]).attr("data-marks");//.toFixed(2);
    $.post("logmymarks.php",
    	{id: window.uid, sid: sid_arr[i],  marks: mark, url:window.url},
    	function(data){
			//console.log(data);
		});
	}

	}
else {
//console.log(window.url);
    $.post("logmymarkstmp.php",
    	{id: window.uid, marks: window.final_marks.toFixed(2), url:window.url, name:window.uname},
    	function(data){
			console.log("fail: "+data);
		});
	}
}
 var img_regex = /_([c|g]).*[a5|a7|s1|s2]q(\d|\d\d)\.png$/;
 var img_regex1 = /_([c|g]).*[a5|a7|s1|s2]q(\d|\d\d)(a|b|c|d)\.png$/;
function reset()
{
	$(".goanswer").each(function () {
		$(this).remove();
	});
	$(".subject-span").each(function () {
		$(this).text("0");
	});
	$("#checkboxes input:checkbox").each(function () {
		$(this).attr("data-marks","0");
		$(this).attr("data-tmarks","0");
	});
}
function update_subject_list() {
	arr = "";
	$("#checkboxes input:checkbox:checked").each(function () {
		if(!arr) arr=$(this).attr('id');
		else
			arr=arr+","+$(this).attr('id');
	//	arr.push($(this).val());
	});
	$("#selsubjects").val(arr);
process();
//	console.log(arr);
	return arr;
}

//multiselect checkbox
var expanded = false;

function showCheckboxes() {
	var checkboxes = document.getElementById("checkboxes");
	if (!expanded) {
		checkboxes.style.display = "block";
		expanded = true;
	} else {
		checkboxes.style.display = "none";
		expanded = false;
	}
}

$(document).mouseup(function (e) {
	var checkboxes = $("#checkboxes");
	var multiselect = $(".multiselect");
	if (!checkboxes.is(e.target) && checkboxes.has(e.target).length === 0 && !multiselect.is(e.target) && multiselect.has(e.target).length === 0 && expanded) {
process();
		checkboxes.hide();
		expanded = false;
	}
});
