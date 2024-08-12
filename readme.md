Welcome to the Navy Demo.

Getting Started:

Initialize database:

1. Go into the data-hub directory: cd data-hub and run ./gradlew hubInit followed by ./gradlew mlDeploy. Ensure your username and password are correct for local instance in gradle.properties
2. Check that you have a user with correct roles to utilize data-hub (the project should create one called DrSmith pw: demo)
3. In order to make the security work for both the data-hub and frontend go into the final db(port 8011) in the admin interface and change the authentication method to digestbasic(you cannot set this in the configuration for some reason).

Frontend setup:

1. Begin by changing directories to fasttrack-middle: cd fasttrack-middle. Run: npm run start.
2. Switch to ui directory cd ../ui. Run: npm run dev.
