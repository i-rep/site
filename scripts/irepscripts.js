


//application request
function volunteerApply(){

var Fname = document.getElementById("Fname").value
var Lname = document.getElementById("Lname").value
var Gender = document.getElementById("Gender").value
var DOB = document.getElementById("DOB").value
var Tel = document.getElementById("Tel").value
var Email = document.getElementById("Email").value
var Location = document.getElementById("Location").value
var MaritalStatus = document.getElementById("MaritalStatus").value
var Summary = document.getElementById("Summary").value
var Department = document.getElementById("Department").value
var Duration = document.getElementById("Duration").value
var VolunteeredBefore = document.getElementById("VolunteeredBefore").value
var VolunteeredBeforeWhere = document.getElementById("VolunteeredBeforeWhere").value	
var HeardAboutUs = document.getElementById("HeardAboutUs").value
var QuestionForUs = document.getElementById("QuestionForUs").value


		if (
			Fname.length<3 || 
			Lname.length<3 ||
			Gender=='Select'  ||
			DOB=='' ||
			Tel.length<10 ||
			Email.length<3 ||
			Location.length<3 ||
			MaritalStatus=='Select'  ||
			Summary.length<10 ||
			Department=='Select'  ||
			Duration=='Select' ||
			VolunteeredBefore=='Select' ||
			HeardAboutUs.length<3 ||
			QuestionForUs==''
			) {

			alert('Please fill in all details')
		}




	else {
		const scriptVolunteer = 'https://script.google.com/macros/s/AKfycbyjxYZiGW6DCEqPh1pXZKO3U4d3xlrslGruE2u0r5CaDWw3Sjg/exec?action=apply'
		var volunteerRequest = scriptVolunteer+'&Fname='+Fname+'&Lname='+Lname+'&Gender='+Gender+'&DOB='+DOB+'&Tel='+Tel+'&Email='+Email+'&Location='+Location+'&MaritalStatus='+MaritalStatus+'&Summary='+Summary+'&Department='+Department+'&Duration='+Duration+'&VolunteeredBefore='+VolunteeredBefore+'&VolunteeredBeforeWhere='+VolunteeredBeforeWhere+'&HeardAboutUs='+HeardAboutUs+'&QuestionForUs='+QuestionForUs

		var xmlHttp = new XMLHttpRequest();
	    xmlHttp.onreadystatechange = function() { 
	        if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
	            var res = JSON.parse(this.responseText)

	        	if (res == 'Application Received') {
	        		sessionStorage.setItem("ApplicantName", Fname)
	        		window.location.replace("https://www.irepfoundation.org/thank-you") 
	        }
	        
	    }
	    xmlHttp.open("GET", volunteerRequest, true); // true for asynchronous 
	    xmlHttp.send();
		
	}



}










function exitThankYouPage(){
	window.location.replace("https://www.irepfoundation.org")
}


function confirmApplicant(){
	document.getElementById("volunteer_name").innerHTML = 'Dear ' + sessionStorage.getItem('ApplicantName')
}