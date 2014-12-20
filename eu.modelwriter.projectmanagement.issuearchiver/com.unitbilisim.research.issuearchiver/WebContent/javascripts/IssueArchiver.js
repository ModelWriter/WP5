

var issueList = [];

angular.module('IssueArchiver', ['multi-select'])
.controller('IssueArchiverCtrl', function($scope, $http, $parse) {

	    
	  var reposNotFound = false;
	  // Get Repositories
	   $scope.getRepos = function() {
		    
		   if($scope.orgname == null || $scope.orgname == ""){
		    	//$scope.orgname = "modelwriter";
		    	
		    	var the_string = 'orgname';

		    	// Get the model
		    	var model = $parse(the_string);

		    	// Assigns a value to it
		    	model.assign($scope, "modelwriter");

		    	// Apply it to the scope
		    	//$scope.$apply();
		    	//console.log($scope.life.meaning);
		    }
			
			$scope.reposLoaded = false;
	
			$http.get("https://api.github.com/orgs/"+$scope.orgname+"/repos").success(function(data) {
						
						$scope.reposNotFound = false;
						$scope.repos = data;				
						$scope.selectedRepo = null;									
						$scope.reposLoaded = true;
						
					}).error(function () {
						   
						   $scope.reposNotFound = true;
					   });
								
	   }
	   
	   $scope.getIssues = function () {
		   
		   issueList = [];
		   $scope.statesNotFound = false;
		   var repoCount = $scope.resultRepos.length;
		   
		   // alert($scope.resultRepos.length);
		   
		   if(repoCount > 0){
			   
			   for(i = 0; i < repoCount; i++){
				   
				   getAll($scope.resultRepos[i].name);
				   
			   }
		   }
		   else{
			   
			   document.getElementById('issueCount').innerHTML = "There is no repository selected ! ";
			   $scope.buttonLoaded = false;
			   $scope.statesLoaded = false;
			   $scope.statesNotFound = true;
			   $scope.buttonLoaded = false;
			   $scope.selectedState = null;
		   }
		   
		   function getAll(repo){
			   
			   $http.get("https://api.github.com/repos/"+$scope.orgname+"/"+repo+"/issues?state=all&per_page=100").success(function (data) {//Getting issues for org and repo
					
					//alert("issue get");
					for(j in data){
			
						issueList.push(data[j]);
					}	
					
						if(issueList.length > 0){
							$scope.selectedState = null;
							$scope.statesLoaded = true;
							$scope.states = [
							                 {name:'open'},
							                 {name:'closed(done)'}
							               ];
							$scope.buttonLoaded = true;
							document.getElementById('issueCount').innerHTML = issueList.length+" issues found !";
						}
						
						
						
						/*
						if($scope.progressChartNotFound == true){
							$scope.milestoneNotSelected = false;
						}else{
							$scope.milestoneNotSelected = true;
						}
						*/
					
			}).error(function (data,status,as, config) {
		
				alert("ERROR! - Get Repositories"+status);
		 
			});
		   }
		   
	   }

	   
	   
});
      	  		