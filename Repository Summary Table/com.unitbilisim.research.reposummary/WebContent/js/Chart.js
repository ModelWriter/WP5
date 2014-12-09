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
	   data.addColumn('string', 'Name');
	   data.addColumn('number', 'Salary');
	   data.addColumn('boolean', 'Full Time Employee');
	   data.addRows([
	     ['Mike',  {v: 10000, f: '$10,000'}, true],
	     ['Jim',   {v:8000,   f: '$8,000'},  false],
	     ['Alice', {v: 12500, f: '$12,500'}, true],
	     ['Bob',   {v: 7000,  f: '$7,000'},  true]
	   ]);

	   var table = new google.visualization.Table(document.getElementById('table_div'));

	   table.draw(data, {showRowNumber: true});

}