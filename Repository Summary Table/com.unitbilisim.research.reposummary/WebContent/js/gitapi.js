
var issueList = [];
var milestoneList = [];
var labelList = [];
var userList = [];
var TableValues = [];//Data for Table...

function GitHubCtrl($scope, $http) {
      	  		
	  // Get repos
	   $scope.getRepos = function() {
			$http.get("https://api.github.com/orgs/"+$scope.orgname+"/repos").success(function(data) {
						
						$scope.repos = data;
						$scope.reposFound = data.length > 0;				
						fillRepositories(); 	
					});
						
		// end drawTable
			 function fillRepositories(){
				 
				 var selectbox = document.getElementById("select-repository");
				 var option;
				 
				 for(var i = selectbox.options.length-1 ; i >= 1 ; i--){
	            
					//alert(i);
	                selectbox.remove(i);
				 }
				 
				 //alert(data.length);
				 for(var i = 0  ;i < $scope.repos.length ; i++){
	   
	                 option = document.createElement('option');
	                 //alert(data[i].name);
	                 option.text = $scope.repos[i].name;
	                 option.value = $scope.repos[i].name;
	                 selectbox.appendChild(option);
				 }
				 
			 }
	   }
	$scope.fillFields = function(){
		
		var selectbox;
		var option;
		
		var e = document.getElementById("select-repository");
		var repoName = e.options[e.selectedIndex].value;
		
		fillMilestones();
		fillLabels();
		fillUsers();
		
		function fillMilestones(){
			
			//getting milestones for selected repo...
			$http.get("https://api.github.com/repos/"+$scope.orgname+"/"+repoName+"/milestones").success(function (data) {			
				
				milestoneList = [];
							
				for (i in data){
					
					milestoneList.push(data[i].title);
				}	
				$scope.milestones = milestoneList;
			});
			
			cleanbox("select-milestone");
			selectbox = document.getElementById("select-milestone");
		
			for(i = 0  ;i < $scope.milestones.length ; i++){
			   
				option = document.createElement('option');
				//alert(data[i].name);
				option.text = $scope.milestones[i];
				option.value = $scope.milestones[i];
				selectbox.appendChild(option);
			}
		}
		function fillLabels(){
			
			//getting labels for selected repo...
			$http.get("https://api.github.com/repos/"+$scope.orgname+"/"+repoName+"/labels").success(function (data) {
			
				labelList = [];
			
				for (i in data){
					labelList.push(data[i].name);
				}
				$scope.labels = labelList;
			});
	
			cleanbox("select-label");
			selectbox = document.getElementById("select-label");
		
			for(i = 0  ;i < $scope.labels.length ; i++){
			   
				option = document.createElement('option');
				//alert(data[i].name);
				option.text = $scope.labels[i];
				option.value = $scope.labels[i];
				selectbox.appendChild(option);
			}
		}
		function fillUsers(){
		
			//getting contributors for selected repo and fill selectbox...
			$http.get("https://api.github.com/repos/"+$scope.orgname+"/"+repoName+"/contributors").success(function (data) {
	
				userList = [];
			
				for (i in data){
				
					userList.push(data[i].login);
				}
				$scope.users = userList;
			});
	
			cleanbox("select-user");
			selectbox = document.getElementById("select-user");
		
			for(i = 0  ;i < $scope.users.length ; i++){
			   
				option = document.createElement('option');
				option.text = $scope.users[i];
				option.value = $scope.users[i];
				selectbox.appendChild(option);
			}
		}
		function cleanbox(boxID){//Cleaning selectbox for new values from selected repo...
			
			var selectbox = document.getElementById(boxID);
			
			for(i = selectbox.options.length-1 ; i >= 1 ; i--){				
			
				selectbox.remove(i);
			}
		}
	}
	$scope.fillTableValues = function (){
		
		var e = document.getElementById("select-repository");
		var repoName = e.options[e.selectedIndex].value;

		$http.get("https://api.github.com/repos/"+$scope.orgname+"/"+repoName+"/issues").success(function (data) {//Getting issues for org and repo
	
			for(j in data){
				
					issueList.push(data[j]);
			}
			//$scope.issueFound = data.length > 0;
			İssuePars();
         });
		function İssuePars (){		
		
			for(var i in issueList){//For every issue in List
				
				var value = [];//Table Row
				
				value.push(issueList[i].number);//Filling row elements...
				value.push(issueList[i].title);
				findState(value,issueList[i].labels);
				findTask(value,issueList[i].labels);
				value.push(issueList[i].assignee.login);
				value.push(issueList[i].milestone.title);
				findEffort(value,issueList[i].labels);
				
				TableValues.push(value);//Constracting table row...
			}
		}
		function findState(v,labels){//Parsing label which is state status...(v is cell of the table)
			
			for(i in labels){
				
				if(labels[i].name == "todo" || labels[i].name == "in progress" || labels[i].name == "done"){//find state of the issue
					v.push(labels[i].name);
					return;
				}
			}
			v.push("null");//İf there is no assignment with state...
		}
		function findTask(v,labels){//Parsing label which is task...
			
			var str;
			
			for(i in labels){
				
				str = labels[i].name;		
				if(str.charAt(0) == 'T' && !(isNaN(parseInt(str.charAt(1))))){// if first element T and next is number...
					v.push(str);
					return;
				}
			}
			v.push("null");//İf there is no task assignment...
		}
		function findEffort(v,labels){//find effort date like 2d , 1h
			
			for(var i = 0; i < labels.length; i++){
				
				if(labels[i].name.match(/[1,2,4,8][h]|[2,3,5,10][d]/) != null){//Compare label value with work our regular exp. ...
					v.push(labels[i].name);
					return;
				}	
			}
			v.push("null");	//İf there is no work our assignment...
		}
	
	}
	// draw table
}
