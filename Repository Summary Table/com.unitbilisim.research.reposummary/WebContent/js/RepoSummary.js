
var issueList = [];
var milestoneList = [];
var labelList = [];
var userList = [];
var issueTable = [];


google.load("visualization", "1", {packages:["table","corechart"]});

angular.module('GitAPI', [])
.controller('GitHubCtrl', function($scope, $http) {
      	  		
	  
	
	  var reposNotFound = false;
	  
	  var table = new google.visualization.Table(document.getElementById('table_div'));
	  
	  $scope.drawChart = function() {


		  totalHoursToDo = 0;
		  totalHoursDone = 0;
		  totalHoursInProgress = 0;
		  table.clearChart();
		  var selectedUser = "all";
		  var selectedMilestone = "all";
		  var selectedLabel = "all";
		  var selectedState = "all";

		  var data = new google.visualization.DataTable();
		  //data.addColumn('number', 'Nr.');
		  data.addColumn('string', "State");
		  data.addColumn('string', 'Issue');
		  data.addColumn('string', 'Progress');
		  data.addColumn('string', 'Task');
		  data.addColumn('string', 'Assignee');
		  data.addColumn('string', 'Milestone');
		  data.addColumn('string', 'Effort Required');
		  //data.addColumn('number', 'Total Hours');

		  if($scope.selectedState != null)
			  selectedState = $scope.selectedState.name;

		  if($scope.selectedMilestone != null)
			  selectedMilestone = $scope.selectedMilestone.title; 

		  if($scope.selectedLabel != null)
			  selectedLabel = $scope.selectedLabel.name; 

		  if($scope.selectedUser != null)
			  selectedUser = $scope.selectedUser.login; 


		  //var conditionCount = 0;

		  var conditionString = "if(";

		  if(selectedState == "all"){

			  conditionString += '("open" == issueTable[i][0] || '
				  + '"closed" == issueTable[i][0]) ' ;

		  }else if(selectedState == "open"){

			  conditionString += '"open" == issueTable[i][0] ';

		  }else if(selectedState == "closed"){

			  conditionString += '"closed" == issueTable[i][0] ';
		  }

		  if(selectedMilestone != "all"){
			  conditionString += ' && ';
			  conditionString += '"' + selectedMilestone + '" == issueTable[i][5] ';
			  //conditionCount++;
		  }

		  if(selectedUser != "all"){
			  //if(conditionCount > 0){
			  conditionString += ' && ';
			  //}
			  conditionString += '"' + selectedUser + '" == issueTable[i][4] ';
			  //conditionCount++;
		  }

		  if(selectedLabel != "all"){
			  //if(conditionCount > 0){

			  conditionString += ' && (';
			  conditionString += '"' + selectedLabel + '" == issueTable[i][2] || "' 
			  + selectedLabel + '" == issueTable[i][3] || "' 
			  + selectedLabel + '" == issueTable[i][6] ';
			  conditionString += ')';

			  //}else{
			  //conditionString += '"' + selectedLabel + '" == issueTable[i][2] || "' 
			  //				   + selectedLabel + '" == issueTable[i][3] || "'
			  //			   + selectedLabel + '" == issueTable[i][6] ';
			  //}

			  //conditionCount++;
		  }


		  conditionString += ')';

		  alert(conditionString);

		  var totalHours = "";

		  totalHours += 'if(issueTable[i][6].charAt(1) == "h"){';

		  totalHours += '	var h = parseInt(issueTable[i][6].charAt(0));'

			  totalHours += '	if(issueTable[i][2] == "todo"){'
				  totalHours += '	totalHoursToDo = totalHoursToDo + h;}'
			  
				  totalHours += 'if(issueTable[i][2] == "done"){'
					  totalHours += 'totalHoursDone = totalHoursDone + h;}'

				  totalHours += 'if(issueTable[i][2] == "in progress"){'
			     		totalHours += '	totalHoursInProgress = totalHoursInProgress + h;}'											

		  totalHours += '	}'

		totalHours += 'if(issueTable[i][6].charAt(1) == "d"){'

			totalHours += '	var d = parseInt(issueTable[i][6].charAt(0));'

		  totalHours += '	if(issueTable[i][2] == "todo"){'
				totalHours += 'totalHoursToDo = totalHoursToDo + d*8;}'

			totalHours += '	if(issueTable[i][2] == "done"){'
			totalHours += '		totalHoursDone = totalHoursDone + d*8;}'

			totalHours += '	if(issueTable[i][2] == "in progress"){'
			totalHours += '		totalHoursInProgress = totalHoursInProgress + d*8;}'

		totalHours += '	}';


		  if(issueTable.length > 0){

			  for(i = 0; i < issueTable.length; i++) {

				  //eval("alert(issueTable[i]);");
				  eval(conditionString + "{ " + 
						  "data.addRow(issueTable[i]);"+ totalHours +"}");


			  }
			  
			  
			  document.getElementById('table_div').setAttribute("style","display:block");
			  
			  
			  table.draw(data, {showRowNumber: true});
			  //alert("Done:"+totalHoursDone+", \n in progress:"+totalHoursInProgress+"\n todo:"+totalHoursToDo);
			  
			  
		  }
	  }
	   
	   // Get Repositories
	   $scope.getRepos = function() {
			$http.get("https://api.github.com/orgs/"+$scope.orgname+"/repos").success(function(data) {
						
						$scope.reposNotFound = false;
						$scope.repos = data;				
						$scope.selectedRepo = null;									
						$scope.reposLoaded = true;
						
						
						issueTable = [];
					}).error(function () {
						   
						   $scope.reposNotFound = true;
					   });
								
	   }
	   
	   
	$scope.fillFields = function(){
		
		issueList = [];
		milestoneList = [];
		labelList = [];
		userList = [];
		issueTable = [];
		$scope.labelsNotFound = false;
		$scope.usersNotFound = false;
		$scope.milestonesNotFound = false;
		$scope.statesNotFound = false;
		
				$http.get("https://api.github.com/repos/"+$scope.orgname+"/"+$scope.selectedRepo.name+"/issues?state=all&per_page=1000").success(function (data) {//Getting issues for org and repo
			
						//alert("issue get");
						for(j in data){
				
							issueList.push(data[j]);
						}	
						//$scope.issueFound = data.length > 0;
						issueParse();
						drawUserProgressCharts();
						
						
							//$scope.labels = labelList;
							if(labelList.length > 0){
								$scope.selectedLabel = null;
								$scope.labelsLoaded = true;
								$scope.labels = labelList;
							}else{
								//$scope.labels = [];
								$scope.labelsLoaded = false;
								$scope.labelsNotFound = true;	
							}
							
						
						
							//$scope.milestones = milestoneList;
							if(milestoneList.length > 0){
								$scope.selectedMilestone = null;
								$scope.milestonesLoaded = true;
								$scope.milestones = milestoneList;
							}else{
								//$scope.milestones = [];
								$scope.milestonesLoaded = false;
								$scope.milestonesNotFound = true;	
							}
						
						
							//$scope.users = userList;
							if(userList.length > 0){
								$scope.selectedUser = null;
								$scope.usersLoaded = true;
								$scope.users = userList;
							}else{
								//$scope.users = [];
								$scope.usersLoaded = false;
								$scope.usersNotFound = true;	
							}
							
							
							if(issueList.length > 0){
								$scope.selectedState = null;
								$scope.statesLoaded = true;
								$scope.states = [
								                 {name:'open'},
								                 {name:'closed'}
								               ];
								$scope.buttonLoaded = true;
							}else{
								$scope.statesLoaded = false;
								$scope.statesNotFound = true;
								$scope.buttonLoaded = false;
							}
							
						
				}).error(function (data,status,as, config) {
 			
					alert(data+status+config);
        	 
				});
		
		function drawUserProgressCharts() {	 
			 
			 var numberOfMilestones = milestoneList.length;
			 
			 if(numberOfMilestones > 0){
				 
				 for(x = 0; x < numberOfMilestones; x++){
					 
					 var completedHours;
					 var toDoHours;
					 var row = [];
					 var container = [];
					 
				
					 container.push(["User","To Do","Done"]);
					 
					 for(i = 0; i < userList.length; i++){
						  	
						 row = [];
						 
						 completedHours = 0;
						 toDoHours = 0;
						  for(j = 0; j <issueTable.length; j++){
							  
							  if(issueTable[j][4] == userList[i].login && issueTable[j][5] == milestoneList[x].title){

								  if(issueTable[j][6].charAt(1) == "h"){ ;

								  var h = parseInt(issueTable[j][6].charAt(0)); 

								  if(issueTable[j][2] == "todo"){ 
									  toDoHours = toDoHours + h;} 

								  if(issueTable[j][2] == "done"){ 
									  completedHours = completedHours + h;} 

								  if(issueTable[j][2] == "in progress"){ 
									  toDoHours = toDoHours + h;} 											

								  } 

								  if(issueTable[j][6].charAt(1) == "d"){ 

									  var d = parseInt(issueTable[j][6].charAt(0)); 

									  if(issueTable[j][2] == "todo"){ 
										  toDoHours = toDoHours + d*8;} 

									  if(issueTable[j][2] == "done"){ 
										  completedHours = completedHours + d*8;} 

									  if(issueTable[j][2] == "in progress"){ 
										  toDoHours = toDoHours + d*8;} 

								  }
							  }
						  } // end for issueTable
						  
						  row.push(userList[i].login);
						  row.push(toDoHours);
						  row.push(completedHours);
						  
						  container.push(row);
					  } // end for users
					 
					 
					 var data = new google.visualization.arrayToDataTable(container);
					  
					 
					  var title = "User Performance for " + milestoneList[x].title; 
					  var options = {
							  title: title,
							  hAxis: {title: 'Users', titleTextStyle: {color: 'black'}}
					  };
					  
					  var newDiv = document.createElement('div');
					  newDiv.id = 'chart_div'+(x+1);
					  document.getElementById('chart_div'+x).appendChild(newDiv);
					  
					  var chart = new google.visualization.ColumnChart(document.getElementById(newDiv.id));
					  
					  
					  chart.draw(data, options);
					  
					  /*
					  var data = google.visualization.arrayToDataTable([
					                                                    ['Year', 'Sales', 'Expenses'],
					                                                    ['2004',  1000,      400],
					                                                    ['2005',  1170,      460],
					                                                    ['2006',  660,       1120],
					                                                    ['2007',  1030,      540]
					                                                  ]);

					                                                  var options = {
					                                                    title: 'Company Performance',
					                                                    hAxis: {title: 'Year', titleTextStyle: {color: 'red'}}
					                                                  };
					  
					  var newDiv = document.createElement('div');
					  newDiv.id = 'chart_div';
					  document.getElementById('chart_divs').appendChild(newDiv);
					  
					                                                  
					  var chart = new google.visualization.ColumnChart(document.getElementById(newDiv));
					  
					  
					  chart.draw(data, options);	
					  
					  */
				 } // end for milestones
			 }// end if 
			 else {
				 alert("NO MILESTONES!");
				 
			 }
			 
		}
		
		
		function issueParse (){		
			

			for(var i in issueList){// For every issue in List
				
				var value = [];// Table Row

				
				//value.push(issueList[i].number);// Filling row elements...			
				
				//state
				value.push(issueList[i].state);
				var state = issueList[i].state;
				
				//title
				value.push(issueList[i].title);
				
				// state
				// task
				if(issueList[i].labels.length != 0){
					findProgress(value,issueList[i]);					
					findTask(value,issueList[i].labels);
					
				}else if(state == "closed"){
					value.push("done");
					value.push("no task assigned");
				}else {
					
					value.push("no progress assigned");
					value.push("no task assigned");
				}
				
				// user
				if(issueList[i].assignee != null){
					
					value.push(issueList[i].assignee.login);
					
					if(!isUserExist(issueList[i].assignee)){
						userList.push(issueList[i].assignee);
					}
					
				}else {
					value.push("no assignee");
				}
				
				
				// milestone
				if(issueList[i].milestone != null){
					
					value.push(issueList[i].milestone.title);
					
					if(!isMilestoneExist(issueList[i].milestone)){
						milestoneList.push(issueList[i].milestone);
					}
				}else {
					value.push("no milestone");
				}
				
				// effort
				if(issueList[i].labels.length != 0){
					findEffort(value,issueList[i].labels);
					
					fillLabels(issueList[i].labels);					
				}else {
					
					value.push("no effort");
				}
				
				
				issueTable.push(value);// Constracting table row...
			}
		}
		
		function findProgress(v,issue){// Parsing label which is state status...(v is cell of the table)
			
			for(i in issue.labels){


				if(issue.state == "closed"){
					v.push("done");
					return;
				}else if(issue.labels[i].name == "todo" || issue.labels[i].name == "in progress"){//find state of the issue
					v.push(issue.labels[i].name);
					
					return;
				} 
				
				
			}
			v.push("no progress");// If there is no assignment with state...
		}
		
		function findTask(v,labels){// Parsing label which is task...
			
			var str;
			
			for(i in labels){
					
				if(labels[i].name.match(/(T[0-9]+)/)){// if first element T and next is number...
					v.push(labels[i].name);
					return;
				}
			}
			v.push("no task");// If there is no task assignment...
		}
		
		function findEffort(v,labels){// Find effort date like 2d , 1h
			
			for(var i = 0; i < labels.length; i++){
				
				if(labels[i].name.match(/[1-9][h,d]|(10)[h,d]/) != null){//Compare label value with work our regular exp. ...
					v.push(labels[i].name);
					return;
				}	
			}
			v.push("no effort");	// If there is no work our assignment...
		}
		
		function fillLabels(labels){
			
			for(var i in labels){
				
				if(!isLabelExist(labels[i])){
					labelList.push(labels[i]);
				}
			}
		}
		
		function isLabelExist(label){
				
			var exist = false;
				
			for(var i in labelList){
					
				    if (labelList[i].name == label.name)
				    	exist = true;
				}
				return exist;		
		}
		
		function isMilestoneExist(milestone){
			
			var exist = false;
				
			for(var i in milestoneList){
					
				    if (milestoneList[i].title == milestone.title)
				    	exist = true;
				}
				return exist;		
		}
		
		function isUserExist(user){
			
			var exist = false;
				
			for(var i in userList){
					
				    if (userList[i].login == user.login)
				    	exist = true;
				}
				return exist;		
		}
		
		
	
	}
	
	
});
