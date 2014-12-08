
var issueList = [];
var milestoneList = [];
var labelList = [];
var userList = [];


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
		repoName = e.options[e.selectedIndex].value;
    
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
       /*function fillIssues(){
    	   
    	   $http.get("https://api.github.com/repos/"+$scope.orgname+"/"+repoName+"/issues/").success(function (data) {
   			
   			for(j = 0 ; j < data.length ; j++){
   					issueList.push(data[i]);
   			}
            });
       }*/
	  function cleanbox(boxID){
		  	 var selectbox = document.getElementById(boxID);
			 
			 for(i = selectbox.options.length-1 ; i >= 1 ; i--){
				 selectbox.remove(i);
			 }
	  }
	}
	// draw table	
}
function print(){
	document.getElementById("demo").innerHTML = userList.toString();
}