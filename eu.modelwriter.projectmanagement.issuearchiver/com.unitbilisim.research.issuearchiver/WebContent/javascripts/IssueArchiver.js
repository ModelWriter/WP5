

var issueList = [];
var issueFile = '';

angular.module('IssueArchiver', ['multi-select'])
.controller('IssueArchiverCtrl', function($scope, $http, $parse) {


	var reposNotFound = false;

	$scope.download = function(){  
	
		var blob = new Blob([issueFile], {type: "application/text"});
		var url  = URL.createObjectURL(blob);

		var a = document.getElementById('downloadbtn');
		a.download    = "issues.txt";
		a.href        = url;
		a.textContent = "Download as Text";
	}
	
	$scope.filterIssues = function () {
		
		var selectedState = "all";
		var count = 0;
		issueFile = '';
		
		if($scope.resultState.length > 0){
			angular.forEach( $scope.resultState, function( value, key ) {
				if ( value.ticked === true ) {
					selectedState = value.name;
				}
			});
		}
		
		if(selectedState == "all"){
			
			document.getElementById('issueCount').innerHTML = issueList.length+" issues found !";
			convertToJson(selectedState);
		
		}else{
			
			convertToJson(selectedState);
			for(j = 0; j < issueList.length; j++){
				
				if(issueList[j].state == selectedState){
					count++;
				}
				
			}
			
			document.getElementById('issueCount').innerHTML = count+" issues found !";
			
		}
		
		
		
		function convertToJson(condition) {
			var issueCount = 0;
			
			if(issueList.length > 0){
				
				for(j = 0; j < issueList.length; j++){
					
					if(issueList[j].state == condition || condition == "all"){
						
						issueCount++;
						
						issueFile += 'Issue Number : ' + issueList[j].number + '\n';
						issueFile += '\t Title : ' + issueList[j].title + '\n';

						if(issueList[j].body != null){

							issueFile += '\t Body : ' + issueList[j].body + '\n';
						}else{

							issueFile += '\t body : no body \n';
						}

						if(issueList[j].assignee != null){

							issueFile += '\t assignee : ' + issueList[j].assignee.login + '\n';
						}else{

							issueFile += '\t assignee : no assignee \n';
						}

						if(issueList[j].milestone!= null){

							issueFile += '\t milestone : ' + issueList[j].milestone.title + '\n';
						}else{

							issueFile += '\t milestone : no milestone \n';
						}

						issueFile += ' \t labels : [';
						if(issueList[j].labels.length != 0){

							for(i = 0; i < issueList[j].labels.length; i++){

								issueFile += ' name : ' + issueList[j].labels[i].name + ',';
							}

						}else{

							issueFile += 'no label';
						}

						issueFile += ']\n';
						
						
					}
					
				}
				
				
				
			}
		}// end function convertToText
		
		
	}


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
		openIssues = [];
		closedIssues = [];
		
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
					//convertToText(0);

				} // end for data	


				if(issueList.length > 0){
					$scope.selectedState = null;
					$scope.statesLoaded = true;
					$scope.states = [
					                 {name:'all'},
					                 {name:'open'},
					                 {name:'closed'}
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
