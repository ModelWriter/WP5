package eu.modelwriter.projectmanagement.github;

import java.io.BufferedReader;
import java.io.File;
import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

public class CreateObjects {
	
	static String username= "ferhaterata";
	static String password= "?";
	static String organization = "ferhaterata";
	static String repo = "test";
	
//	static String Tasks = "https://api.github.com/repos/" + organization + "/" + repo + "/contents/Tasks.md"; 
//	static String Deliverables = "https://api.github.com/repos/" + organization + "/" + repo + "/contents/Deliverables.md"; 
//	static String Milestones = "https://api.github.com/repos/" + organization + "/" + repo + "/contents/Milestones.md";
//	static String Labels = "https://api.github.com/repos/" + organization + "/" + repo + "/contents/Labels.md";
	
	public static List<String> TaskLabels = new ArrayList<String>();
	
	public static void CreateDeliverables() throws InterruptedException {
		try {
			File file = new File("Deliverables.md");
			CreateTasksAsObject();
			FileReader fileReader = new FileReader(file);
			BufferedReader bufferedReader = new BufferedReader(fileReader);
			String line;
			bufferedReader.readLine();
			bufferedReader.readLine();
			while ((line = bufferedReader.readLine()) != null) {
				if (line.isEmpty()) continue;
				String [] strings = line.split("\\|");
				String title = strings[2].trim();
				String task = "T" + title.substring(1, title.lastIndexOf('.'));
				String WorkPackage = "WP" + title.substring(1, 2);
				int milestone = Integer.parseInt(strings[1].trim().substring(2, strings[1].indexOf(']')-1));
				String body = "";
				String assignee = "";
				List<String> labels = new ArrayList<String>();
				if (strings[3].trim().equals("SW"))
					labels.add("Software");
				if (strings[3].trim().equals("Doc."))
					labels.add("Document");
				labels.add(strings[4].trim());
				labels.add(strings[5].trim());
				labels.add(getTaskLabel(task));
				labels.add(WorkPackage);
				Issue issue = new Issue(title, body, assignee, milestone, labels);
				Issue.CreateIssue(issue, username, password, organization, repo);
			}
			fileReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	private static String getTaskLabel(String task) {
		for (String string : TaskLabels) {
			if (string.startsWith(task))
				return string;
		}
		return null;
	}

	public static void CreateMilestones() throws InterruptedException {
		try {
			File file = new File("Milestones.md");
			FileReader fileReader = new FileReader(file);
			BufferedReader bufferedReader = new BufferedReader(fileReader);
			String line;
			bufferedReader.readLine();
			bufferedReader.readLine();
			while ((line = bufferedReader.readLine()) != null) {
				if (line.isEmpty()) continue;
				String [] strings = line.split("\\|");
				Milestone milestone = new Milestone(strings[0].trim(), strings[2].trim(), strings[1].trim());
				Milestone.createMilestone(milestone, username, password, organization, repo);
			}
			fileReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void CreateLabels() throws InterruptedException {
		try {
			File file = new File("Labels.md");
			FileReader fileReader = new FileReader(file);
			BufferedReader bufferedReader = new BufferedReader(fileReader);
			String line;
			bufferedReader.readLine();
			bufferedReader.readLine();
			while ((line = bufferedReader.readLine()) != null) {
				if (line.isEmpty()) continue;
				String [] strings = line.split("\\|");
				Label label = new Label(strings[0].trim(), strings[1].trim());
				Label.CreateLabel(label, username, password, organization, repo);
			}
			fileReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void CreateTasks() throws InterruptedException {
		try {
			File file = new File("Tasks.md");
			FileReader fileReader = new FileReader(file);
			BufferedReader bufferedReader = new BufferedReader(fileReader);
			String line;
			bufferedReader.readLine();
			bufferedReader.readLine();
			while ((line = bufferedReader.readLine()) != null) {
				if (line.isEmpty()) continue;
				String [] strings = line.split("\\|");
				Label label = new Label(strings[1].trim(), "000000");
				Label.CreateLabel(label, username, password, organization, repo);
			}
			fileReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	public static void CreateTasksAsObject(){
		try {
			File file = new File("Tasks.md");
			FileReader fileReader = new FileReader(file);
			BufferedReader bufferedReader = new BufferedReader(fileReader);
			String line;
			bufferedReader.readLine();
			bufferedReader.readLine();
			while ((line = bufferedReader.readLine()) != null) {
				if (line.isEmpty()) continue;
				String [] strings = line.split("\\|");
				TaskLabels.add(strings[1].trim());
			}
			fileReader.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	
	
	public static void main(String[] args) {

		try {
//			CreateLabels();
//			CreateTasks();
//			CreateMilestones();
			CreateDeliverables();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}

}
