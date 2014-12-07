package eu.modelwriter.projectmanagement.github;

import java.io.IOException;

public class Label {
	public String name;
    public String color;
	public Label(String name, String color) {
		this.name = name;
		this.color = color;
	}
	
	public String GetJSon() {
		return String.format("{\\\"name\\\": \\\"%s\\\", \\\"color\\\": \\\"%s\\\"}", name, color );
	}
	
	public static void CreateLabel(Label label, String username, String password, String organization, String repo) throws IOException, InterruptedException{
		String labelCommand = "curl -k -u "
				+ "\"" + username + ":" + password + "\""
				+ " -d \""
				+ label.GetJSon()
				+ "\" "
				+ "https://api.github.com/repos/" + organization + "/" + repo + "/labels";
		System.out.println(labelCommand);
		Run.RunCommand(labelCommand);
	}
}
