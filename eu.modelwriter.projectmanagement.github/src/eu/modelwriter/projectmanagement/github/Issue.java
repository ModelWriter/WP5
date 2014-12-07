package eu.modelwriter.projectmanagement.github;

import java.io.IOException;
import java.util.List;

public class Issue {
	public String title;
	public String body;
	public String assignee;
	public int milestone;
	public List<String> labels;
	
	public Issue(String title, String body, String assignee, int milestone,
			List<String> labels) {
		super();
		this.title = title;
		this.body = body;
		this.assignee = assignee;
		this.milestone = milestone;
		this.labels = labels;
	}
	
	public String GetJSon() {
		String str;
		if (!assignee.isEmpty()) 
			str = String.format("{\\\"title\\\": \\\"%s\\\", \\\"body\\\": \\\"%s\\\", \\\"assignee\\\": \\\"%s\\\", \\\"milestone\\\": %s, ", title, body, assignee, milestone );
		else
			str = String.format("{\\\"title\\\": \\\"%s\\\", \\\"body\\\": \\\"%s\\\", \\\"milestone\\\": %s, ", title, body, milestone );
		
		str = str + "\\\"labels\\\": [";
		int ctr = 1;
		for (String label : labels) {
			
			str = str + String.format("\\\"%s\\\"", label);
			if (ctr != labels.size()) str = str + ",";
			ctr ++;
		}
		str = str + "]}";
		return str;
	} 
	
	public static void CreateIssue(Issue issue, String username, String password, String organization, String repo) throws IOException, InterruptedException{
		String issueCommand = "curl -k -u "
				+ "\"" + username + ":" + password + "\""
				+ " -d \""
				+ issue.GetJSon()
				+ "\" "
				+ "https://api.github.com/repos/" + organization + "/" + repo + "/issues";
		System.out.println(issueCommand);
		Run.RunCommand(issueCommand);
	}
}
