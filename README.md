# Pong Fellows  
## A MEAN Stack App for Tracking Intra-Office Ping Pong Competitions  

### Ideation  
At the beginning of our final project week in Code Fellows' 401 JavaScript program, the group that would become Team Pong Fellows was unofficially tasked with creating a system that would keep track of ping pong competitions around campus.  
We needed to create an app that would replace a whiteboard-based system that recorded standings based on a particular set of rules. In addition to keeping track of standings and rankings, we wanted to create player profiles and collect a variety of game statistics. With these ideas in mind, we got started on a 4-day sprint to complete the project.

### Functionality
When you visit the Pong Fellows website for the first time, you will be greeted with a signin screen that will allow you to either log into your profile or create a new one.  
Once you have logged in, you will see the "Ladder," which offers a quick look at the rankings of players in the Code Fellows ping pong competition (the highest-ranked player is at the top, and the lowest is at the bottom). Below the Ladder is a button that allows you to toggle a display of historical game records.  
Each name represented on the Ladder is a clickable button that will take you to the player's profile page. On each profile page, you can find a photo or avatar, a list of statistics, and a quote or message from the player. When you visit your own profile page while logged in, you will see an "edit" button that will allow you to update your picture and message.  
In accordance with Code Fellows' ping pong ladder rules, you can challenge another player for his or her spot on the ladder, so long as the other player is ranked no more than 2 positions above you. You can also challenge lower-ranked players if you so choose. In the Pong Fellows app, this is represented by the presence of a "Challenge" button next to the names of any eligible players. A player that you could ordinarily challenge may be temporarily ineligible if that player already has a pending challenge.  
When you present a challenge to another player, that player will be notified with a message above the Ladder the next time he or she visits the page. It is up to the _challengee_ to record the results of the challenge.  

### Technologies  
Pong Fellows was created using the four primary technologies of the MEAN Stack.  
In **MongoDB**, we stored player profiles, login details, and match records.  
Using **Express.js**, we built a static server to present our app, and an API server to regulate communication between our app and the records in our database.  
**Angular.js**, with custom services, controllers, and directives, allowed us to create a scalable and maintainable front end that communicates easily with our back end.  
**Node.js** Provided the backbone for this project, forming the foundation of our Express.js server-side code and providing a basis for other useful libraries for our data persistence, authorization, and other features.  
We also used semantic HTML5, CSS, and vanilla JavaScript to write custom code as needed.  

### Plans for Improvement  
Team Pong Fellows is made up of coders who love learning and improving. There are several areas in which we would like to see our app grow and improve. We expect to work on the areas listed below, and we are always open to pull requests from outside contributors.
- **Scaling:** Our app is currently set up to run as one instance, focused on the Code Fellows Campus. We would like to expand the app so that new games/locations can be instantiated, each with their own ladders, players, and statistics.  
- **Speed:** Currently, our app checks for updates to the Ladder or new challenges on timed intervals. We expect to alter this code so that updates to the front end are made as soon as data changes--no sooner and no later.  
- **Mobile:** While our app is designed with a mobile-first approach and looks good on smartphones and tablets, it is still a website. Our code could be ported to mobile with the Ionic framework to give smartphone users a more app-like experience.

#### Contributors
[Chris Perez](https://github.com/ckperez) | [Drew Ferris](https://github.com/drewferris) | [Vic Benavente](https://github.com/vbenavente) | [Zach Simonson](https://github.com/simonszc)  

#### Dependencies
Angular, Express, bcrypt, body-parser, jsonwebtoken, mongoose.
