package eu.modelwriter.projectmanagement.github;

import java.io.IOException;

public class Milestone {
	public String due_on; 
	public String title;
	public String description;
	
	public Milestone(String title, String description, String due_on) {
		this.due_on = due_on;
		this.title = title;
		this.description = description;
	}
	
	public String GetJSon() {
		return String.format("{\\\"title\\\": \\\"%s\\\", \\\"state\\\": \\\"open\\\", \\\"description\\\": \\\"%s\\\", \\\"due_on\\\": \\\"%s\\\"}", title, description, due_on );
	}

	public static void createMilestone(Milestone milestone, String username, String password, String organization, String repo) throws IOException, InterruptedException{
		String milestoneCommand = "curl -k -u "
				+ "\"" + username + ":" + password + "\""
				+ " -d \""
				+ milestone.GetJSon()
				+ "\" "
				+ "https://api.github.com/repos/" + organization + "/" + repo + "/milestones";;
		System.out.println(milestoneCommand);
		Run.RunCommand(milestoneCommand);
	}
}
