
var issueList = [];
var milestoneList = [];
var labelList = [];
var userList = [];
var issueTable = [];


google.load("visualization", "1", {packages:["table"]});

angular.module('GitAPI', [])
.controller('GitHubCtrl', function($scope, $http) {
      	  		

	  var reposNotFound = false;
	  
	  var table = new google.visualization.Table(document.getElementById('table_div'));
	  
	   $scope.drawChart = function() {
		   
		      table.clearChart();
		   	  var selectedUser = "";
			  var selectedMilestone = "";
			  var selectedLabel = "";
			  
		   var data = new google.visualization.DataTable();
			data.addColumn('number', 'Nr.');
			data.addColumn('string', 'Issue');
			data.addColumn('string', 'State');
			data.addColumn('string', 'Task');
			data.addColumn('string', 'Assignee');
			data.addColumn('string', 'Milestone');
			data.addColumn('string', 'Effort Required');
			//data.addColumn('number', 'Total Hours');


			if($scope.selectedMilestone != null)
				selectedMilestone = $scope.selectedMilestone.title; 

			if($scope.selectedLabel != null)
				selectedLabel = $scope.selectedLabel.name; 
			
			if($scope.selectedUser != null)
				selectedUser = $scope.selectedUser.login; 


			var conditionCount = 0;

			var conditionString = "if(";

			if(selectedMilestone != ""){
				conditionString += '"' + selectedMilestone + '" == issueTable[i][5] ';
				conditionCount++;
			}

			if(selectedUser != ""){
				if(conditionCount > 0){
					conditionString += ' && ';
				}
				conditionString += '"' + selectedUser + '" == issueTable[i][4] ';
				conditionCount++;
			}

			if(selectedLabel != ""){
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

			if(conditionString != "if()"){
				
				for(i = 0; i < issueTable.length; i++) {

					//eval("alert(issueTable[i]);");
						eval(conditionString + "{ " + 
								"data.addRow(issueTable[i]); }");

				}

					table.draw(data, {showRowNumber: true});
			}
			
				
	   }
	   
	   // Get Repositories
	   $scope.getRepos = function() {
			$http.get("https://api.github.com/orgs/"+$scope.orgname+"/repos").success(function(data) {

						$scope.repos = data;				
						$scope.selectedRepo = null;									
						$scope.reposLoaded = true;
						$scope.buttonLoaded = true;
						
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
		
				$http.get("https://api.github.com/repos/"+$scope.orgname+"/"+$scope.selectedRepo.name+"/issues").success(function (data) {//Getting issues for org and repo
			
						//alert("issue get");
						for(j in data){
				
							issueList.push(data[j]);
						}	
						//$scope.issueFound = data.length > 0;
						issueParse();
						
						
							//$scope.labels = labelList;
							if(labelList.length > 0){
								$scope.selectedLabel = null;
								$scope.labelsLoaded = true;
								$scope.labels = labelList;
							}else{
								$scope.labels = [];
							}
							
						
						
							//$scope.milestones = milestoneList;
							if(milestoneList.length > 0){
								$scope.selectedMilestone = null;
								$scope.milestonesLoaded = true;
								$scope.milestones = milestoneList;
							}else{
								$scope.milestones = [];
							}
						
						
							//$scope.users = userList;
							if(userList.length > 0){
								$scope.selectedUser = null;
								$scope.usersLoaded = true;
								$scope.users = userList;
							}else{
								$scope.users = [];
							}
						
				}).error(function (data,status,as, config) {
 			
					alert(data+status+config);
        	 
				});
		
		
		function issueParse (){		
			

			for(var i in issueList){// For every issue in List
				
				var value = [];// Table Row
				
				
				value.push(issueList[i].number);// Filling row elements...			
				
				value.push(issueList[i].title);
				
				if(issueList[i].labels.length != 0){
					findState(value,issueList[i].labels);					
					findTask(value,issueList[i].labels);
					
				}
				
				if(issueList[i].assignee != null){
					
					value.push(issueList[i].assignee.login);
					
					if(!isUserExist(issueList[i].assignee)){
						userList.push(issueList[i].assignee);
					}
					
				}else {
					value.push("no assignee");
				}
				
				if(issueList[i].milestone != null){
					
					value.push(issueList[i].milestone.title);
					
					if(!isMilestoneExist(issueList[i].milestone)){
						milestoneList.push(issueList[i].milestone);
					}
				}else {
					value.push("no milestone");
				}
				
				
				if(issueList[i].labels.length != 0){
					findEffort(value,issueList[i].labels);
					
					fillLabels(issueList[i].labels);					
				}
				
				
				issueTable.push(value);// Constracting table row...
			}
		}
		
		function findState(v,labels){// Parsing label which is state status...(v is cell of the table)
			
			for(i in labels){

				if(labels[i].name == "todo" || labels[i].name == "in progress" || labels[i].name == "done"){//find state of the issue
					v.push(labels[i].name);
					
					return;
				}
			}
			v.push("no state assigned");// If there is no assignment with state...
		}
		
		function findTask(v,labels){// Parsing label which is task...
			
			var str;
			
			for(i in labels){
				// taskler regex ile buluncak
				str = labels[i].name;		
				if(str.charAt(0) == 'T' && !(isNaN(parseInt(str.charAt(1))))){// if first element T and next is number...
					v.push(str);
					return;
				}
			}
			v.push("no task assigned");// If there is no task assignment...
		}
		
		function findEffort(v,labels){// Find effort date like 2d , 1h
			
			for(var i = 0; i < labels.length; i++){
				
				if(labels[i].name.match(/[1,2,4,8][h]|[2,3,5,10][d]/) != null){//Compare label value with work our regular exp. ...
					v.push(labels[i].name);
					return;
				}	
			}
			v.push("no effort assigned");	// If there is no work our assignment...
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
