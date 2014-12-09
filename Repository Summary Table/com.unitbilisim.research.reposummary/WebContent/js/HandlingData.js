
var issueList = [];
var milestoneList = [];
var labelList = [];
var userList = [];
var issueTable = [];//Data for Table...

angular.module('GitAPI', [])
.controller('GitHubCtrl', function($scope, $http) {
      	  		
	  var reposNotFound = false;

	   $scope.getRepos = function() {
			$http.get("https://api.github.com/orgs/"+$scope.orgname+"/repos").success(function(data) {
						alert($scope.orgname);
						
						$scope.repos = data;				
						$scope.selectedRepo = null;									
						$scope.reposLoaded = true;
					}).error(function () {
						   
						   $scope.reposNotFound = true;
					   });
								
	   }
	   
	   
	$scope.fillFields = function(){
		

		alert($scope.selectedRepo.name);
		$http.get("https://api.github.com/orgs/"+$scope.orgname+"/"+$scope.selectedRepo.name+"/milestones").success(function (data) {			
			
			alert("milestone içi");
			$scope.milestones = data;
			$scope.selectedMilestone = null;
			$scope.milestonesLoaded = true;
			
		}).error(function (data,status,as, config) {
			alert(data+status+config);
			 $scope.milestonesNotFound = true;
		});
		
		$http.get("https://api.github.com/orgs/"+$scope.orgname+"/"+$scope.selectedRepo.name+"contributors").success(function (data) {
			
			alert("user içi");
			$scope.users = data;
			$scope.selectedUser = null;
			$scope.usersLoaded = true;
		}).error(function (data,status,as, config) {
			alert(data+status+config);

			 $scope.usersNotFound = true;
		});
		
		$http.get("https://api.github.com/orgs/"+$scope.orgname+"/"+$scope.selectedRepo.name+"labels").success(function (data) {
			
			alert("label içi");
			$scope.labels = data;
			$scope.selectedLabel = null;
			$scope.labelsLoaded = true;
		}).error(function (data,status,as, config) {
			alert(data+status+config);

			 $scope.labelsNotFound = true;
		});
	
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
				
				TableValues.push(value);// Constracting table row...
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
	
});
