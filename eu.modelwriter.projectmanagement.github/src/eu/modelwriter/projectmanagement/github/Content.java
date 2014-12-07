package eu.modelwriter.projectmanagement.github;

import java.util.Base64;

public class Content {
	public String ContentBase64;
	public String Name;
	public String Path;
	
	public Content(String contentBase64, String name, String path) {
		super();
		ContentBase64 = contentBase64;
		Name = name;
		Path = path;
	}

	public static String GetContent(Content content, String username, String password, String organization, String repo){
		
		String getContentCommand = "curl -i "
				+ "-i https://api.github.com/repos/" + organization + "/" + repo + "/contents/" + content.Path + "/" + content.Name
				+ " -d " + username + ":" + password + "\"";
		
		byte[] valueDecoded= Base64.getDecoder().decode(content.ContentBase64 );
		System.out.println("Decoded value is " + new String(valueDecoded));
		
		return null;
	}
}
