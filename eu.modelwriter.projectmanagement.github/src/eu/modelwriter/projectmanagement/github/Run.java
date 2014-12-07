/**
 * 
 */
package eu.modelwriter.projectmanagement.github;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

/**
 * @author Ferhat Erata 
 * It is the only prerequisite to download and install curl.
 * Tested on Windows Machine
 */
public class Run {

	static void RunCommand(String command){
		Process curlProcess = null;
		try {
			// start execution
			curlProcess = Runtime.getRuntime().exec(command);
			
			// exhaust input stream
	        BufferedInputStream in = new BufferedInputStream(curlProcess.getInputStream());
	        byte[] bytes = new byte[4096];
	        while (in.read(bytes) != -1) {}
	        
	        // wait for completion
			curlProcess.waitFor();

			if (curlProcess.exitValue() != 0) {
				throw new IOException("Error..");
			}

//			InputStream is = curlProcess.getInputStream();
//			InputStreamReader isr = new InputStreamReader(is);
//			BufferedReader br = new BufferedReader(isr);
//			String line;
//			while ((line = br.readLine()) != null) {
//				System.out.println(line);
//			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		finally {
		    if(curlProcess != null)
		    	curlProcess.destroy();
		}
	}

}
