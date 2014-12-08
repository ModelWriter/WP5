/**
 * 
 */

var issueTable = [ 
                  [2,	"issue1",		"done",			"T.1.0.2",	"ffurkAn",		"Sprint #1",	"3d"],
                  [4,	"issueasdas",	"in progress",	"T.1.3.2",	"ffurkAn",		"Sprint #2",	"4h"],
                  [7,	"issue qwe",	"in progress",	"T.1.0.4",	"AhmetCahit",	"Sprint #2",	"5d"],
                  [11,	"issue ffr",	"todo",			"T.2.2.4",	"ferhaterata",	"Sprint #3",	"1d"],
                  [15,	"issue 7776",	"done",			"T.2.4.5",	"ferhaterata",	"Sprint #3",	"2h"]
                  ];

google.load("visualization", "1", {packages:["table"]});

//google.setOnLoadCallback(drawTable);

function drawTable() {


	var data = new google.visualization.DataTable();
	data.addColumn('number', 'Nr.');
	data.addColumn('string', 'Issue');
	data.addColumn('string', 'State');
	data.addColumn('string', 'Task');
	data.addColumn('string', 'Assignee');
	data.addColumn('string', 'Milestone');
	data.addColumn('string', 'Effort Required');
	//data.addColumn('number', 'Total Hours');


	var e = document.getElementById("select-milestone");
	var selectedMilestone = "Sprint #3"; //e.options[e.selectedIndex].value;

	var e = document.getElementById("select-label");
	var selectedLabel = "todo"; //e.options[e.selectedIndex].value;

	var e = document.getElementById("select-user");
	var selectedUser = e.options[e.selectedIndex].value;

	var conditionCount = 0;

	var conditionString = "if(";

	if(selectedMilestone != "Select milestone"){
		conditionString += '"' + selectedMilestone + '" == issueTable[i][5] ';
		conditionCount++;
	}

	if(selectedUser != "Select user"){
		if(conditionCount > 0){
			conditionString += ' && ';
		}
		conditionString += '"' + selectedUser + '" == issueTable[i][4] ';
		conditionCount++;
	}

	if(selectedLabel != "Select label"){
		if(conditionCount > 0){

			conditionString += ' && (';
			conditionString += '"' + selectedLabel + '" == issueTable[i][2] || "' 
								   + selectedLabel + '" == issueTable[i][3] || "' 
								   + selectedLabel + '" == issueTable[i][6] ';
			conditionString += ')';

		}else{
			conditionString += '"' + selectedLabel + '" == issueTable[i][2] || "' 
								   + selectedLabel + '" == issueTable[i][3] || "'
								   + selectedLabel + '" == issueTable[i][6] ';
		}

		conditionCount++;
	}


	conditionString += ')';


	eval("alert(conditionString);");

	for(i = 0; i < issueTable.length; i++) {

		//eval("alert(issueTable[i]);");
			eval(conditionString + "{ " + 
					"data.addRow(issueTable[i]); }");

	}

	var table = new google.visualization.Table(document.getElementById('table_div'));

		table.draw(data, {showRowNumber: true});

}