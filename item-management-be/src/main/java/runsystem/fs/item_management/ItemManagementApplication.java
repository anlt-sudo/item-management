package runsystem.fs.item_management;


import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ItemManagementApplication {

	public static void main(String[] args) {
	// Load .env file
	Dotenv dotenv = Dotenv.configure()
		.directory("./")
		.ignoreIfMalformed()
		.ignoreIfMissing()
		.load();

	// Set env variables for Spring
	dotenv.entries().forEach(entry -> {
	    System.setProperty(entry.getKey(), entry.getValue());
	});

	SpringApplication.run(ItemManagementApplication.class, args);
	}

}
