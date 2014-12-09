
var issueList = [];
var milestoneList = [];
var labelList = [];
var userList = [];
var issueTable = [];

google.load("visualization", "1", {packages:["table"]});

angular.module('GitAPI', [])
.controller('GitHubCtrl', function($scope, $http) {
      	  		

	  var reposNotFound = false;

	  var selectedLabel = "";
	  var selectedMilestone = "";
	  var selectedUser = "";
	  
	   $scope.drawChart = function() {
		   
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
				selectedMilestone = $scope.selectedMilestone.title; //"Sprint #2"; //e.options[e.selectedIndex].value;

			if($scope.selectedLabel != null)
				selectedLabel = $scope.selectedLabel.name; //"in progress";
			
			if($scope.selectedUser != null)
				selectedUser = $scope.selectedUser.login; //"ffurkAn";

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


			 eval("alert(conditionString);");

			for(i = 0; i < issueTable.length; i++) {

				//eval("alert(issueTable[i]);");
					eval(conditionString + "{ " + 
							"data.addRow(issueTable[i]); }");

			}

			var table = new google.visualization.Table(document.getElementById('table_div'));
				table.draw(data, {showRowNumber: true});
				
	   }
	   
	   // Get Repositories
	   $scope.getRepos = function() {
			$http.get("https://api.github.com/orgs/"+$scope.orgname+"/repos").success(function(data) {
						//alert($scope.orgname);
						
						$scope.repos = data;				
						$scope.selectedRepo = null;									
						$scope.reposLoaded = true;
						
						
						issueTable = [];
					}).error(function () {
						   
						   $scope.reposNotFound = true;
					   });
								
	   }
	   
	   
	$scope.fillFields = function(){
		
		$scope.buttonLoaded = true;
		alert($scope.selectedRepo.name);
		// "https://api.github.com/orgs/"+$scope.orgname+"/"+$scope.selectedRepo.name+"
		$http.get("https://api.github.com/repos/"+$scope.orgname+"/"+$scope.selectedRepo.name+"/milestones").success(function (data) {			
			
			//alert("milestone içi");
			$scope.milestones = data;
			$scope.selectedMilestone = null;
			$scope.milestonesLoaded = true;
			
		}).error(function (data,status,as, config) {
			alert(data+status+config);
			 $scope.milestonesNotFound = true;
		});
		
		$http.get("https://api.github.com/repos/"+$scope.orgname+"/"+$scope.selectedRepo.name+"/assignees").success(function (data) {
			
			//alert("user içi");
			$scope.users = data;
			$scope.selectedUser = null;
			$scope.usersLoaded = true;
		}).error(function (data,status,as, config) {
			alert(data+status+config);

			 $scope.usersNotFound = true;
		});
		
		$http.get("https://api.github.com/repos/"+$scope.orgname+"/"+$scope.selectedRepo.name+"/labels").success(function (data) {
			
			//alert("label içi");
			$scope.labels = data;
			$scope.selectedLabel = null;
			$scope.labelsLoaded = true;
		}).error(function (data,status,as, config) {
			alert(data+status+config);

			 $scope.labelsNotFound = true;
		});
		
		$http.get("https://api.github.com/repos/"+$scope.orgname+"/"+$scope.selectedRepo.name+"/issues").success(function (data) {//Getting issues for org and repo
			
			//alert("issue get");
			for(j in data){
				
					issueList.push(data[j]);
			}
			//$scope.issueFound = data.length > 0;
			issueParse();
         }).error(function (data,status,as, config) {
 			
        	 alert(data+status+config);
        	 
		});
		
		function issueParse (){		
		
			for(var i in issueList){// For every issue in List
				
				var value = [];// Table Row
				
				value.push(issueList[i].number);// Filling row elements...
				value.push(issueList[i].title);
				findState(value,issueList[i].labels);
				findTask(value,issueList[i].labels);
				value.push(issueList[i].assignee.login);
				value.push(issueList[i].milestone.title);
				findEffort(value,issueList[i].labels);
				
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
			v.push("null");// If there is no assignment with state...
		}
		
		function findTask(v,labels){// Parsing label which is task...
			
			var str;
			
			for(i in labels){
				
				str = labels[i].name;		
				if(str.charAt(0) == 'T' && !(isNaN(parseInt(str.charAt(1))))){// if first element T and next is number...
					v.push(str);
					return;
				}
			}
			v.push("null");// If there is no task assignment...
		}
		
		function findEffort(v,labels){// Find effort date like 2d , 1h
			
			for(var i = 0; i < labels.length; i++){
				
				if(labels[i].name.match(/[1,2,4,8][h]|[2,3,5,10][d]/) != null){//Compare label value with work our regular exp. ...
					v.push(labels[i].name);
					return;
				}	
			}
			v.push("null");	// If there is no work our assignment...
		}
	
	}
	
		/*
	$scope.fillissueTable = function (){
		

		$http.get("https://api.github.com/repos/"+$scope.orgname+"/"+repoName+"/issues").success(function (data) {//Getting issues for org and repo
	
			for(j in data){
				
					issueList.push(data[j]);
			}
			//$scope.issueFound = data.length > 0;
			İssuePars();
         });
		
		function issueParse (){		
		
			for(var i in issueList){// For every issue in List
				
				var value = [];// Table Row
				
				value.push(issueList[i].number);// Filling row elements...
				value.push(issueList[i].title);
				findState(value,issueList[i].labels);
				findTask(value,issueList[i].labels);
				value.push(issueList[i].assignee.login);
				value.push(issueList[i].milestone.title);
				findEffort(value,issueList[i].labels);
				
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
			v.push("null");// If there is no assignment with state...
		}
		
		function findTask(v,labels){// Parsing label which is task...
			
			var str;
			
			for(i in labels){
				
				str = labels[i].name;		
				if(str.charAt(0) == 'T' && !(isNaN(parseInt(str.charAt(1))))){// if first element T and next is number...
					v.push(str);
					return;
				}
			}
			v.push("null");// If there is no task assignment...
		}
		
		function findEffort(v,labels){// Find effort date like 2d , 1h
			
			for(var i = 0; i < labels.length; i++){
				
				if(labels[i].name.match(/[1,2,4,8][h]|[2,3,5,10][d]/) != null){//Compare label value with work our regular exp. ...
					v.push(labels[i].name);
					return;
				}	
			}
			v.push("null");	// If there is no work our assignment...
		}
	
	}
	*/	
	
});
