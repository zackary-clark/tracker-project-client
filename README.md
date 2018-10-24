# Workout Tracker Project - Front End

## Links

[Client](https://zclark0625.github.io/tracker-project-client/)

[API](https://infinite-coast-74819.herokuapp.com/)

[API Repo](https://github.com/zclark0625/tracker-project-api)

## Description

This application is a workout tracker for powerlifters, Olympic weightlifters, and strongmen. 

It currently provides logs of "one rep maxes" for the "big four" lifts and the user's bodyweight. It also provides charts of those logs so the user can see their progress over time. 

It is planned for the application to allow planning and tracking of workouts, and complex analysis of changes in strength, bodyweight, volume, and their effects on each other over time, for each user.

It does this by storing one rep maxes in a table with a date, and bodyweight measurements in another table by date, both associated with users accessible with CRUD actions on the front-end. The front end then displays these records using Google Charts.

## Wireframes

[WireFrame](images/Project-2-Wireframe.png)

## Technologies Used

- HTML
- Javascript
- Sass
- JQuery
- AJAX
- Bootstrap
- Node
- Grunt
- Git
- Google Charts

## User Stories

### Goals
- As a user, I should be able to login to the web app
    - I should be able to sign up
    - I should be able to sign in
    - I should be able to change my password
    - I should be able to log out

- As a lifter, I want to be able to record my workout
    - I should be able to track sets, reps, weights, and RPE for each exercise
    - I should also be able to record notes for the set/workout, such as if I was sick or injured

- As a lifter, I want to be able to see my progress in various lifts overtime
    - I may also want to see this compared to my total volume in the lift (or similar lifts) at the time
    - I may also want to see this compared to my rate of bodyweight increase/decrease

- As a lifter, I want to be able to record my bodyweight
    - I should be able to record notes with each day's weight
    - I should be able to see my progress graphed over time

### Stretch Goals

- As a lifter, I want to be able to create custom exercises
    - I should be able to set the name, description, and which lift it is an accessory of, if applicable

- As a user, I want to be able to record my cardio workouts
    - I should be able to track sets, distance, time, weight, and/or intensity
    - I should also be able to record notes for the set/workout

- As a lifter, I want to be able to plan future workouts
    - Lifts
        - I should be able to plan exercises, sets, reps, weights, and RPE for future workouts
        - I should be able to enter a 1RM and calculate weights based on percentages, if desired
        - I should be able to change the sets, reps, or weights of each exercise from week to week, or workout to workout(eg. increasing the weight each week)

    - Cardio
        - I should be able to plan exercises with sets, distance, time, weight and/or intensity
    
    - I should be able to define custom schedules for each workout, such as specific days of the week
    - I should be able to specify the duration of sets and breaks if desired
    - I should be able to easily use planned workouts to record workouts on the planned day(by default), or on a different day

- As a lifter, I want to be able to start my planned workouts from popular templates (eg. Starting Strength, Texas Method, Mag-Ort, Sheiko etc.)
    - For those based on 1RM (3RM, 5RM etc.) I should be able to enter my 1RM and have the planned weights auto calculate
    - For those based on percentages of 1RM, the planned weights should auto calculate based on my existing 1RM

- As a lifter, I want to be able to track total volume (per workout/week/month) for various exercises
    - I want to be able to compare changes in total volume to rate of progression for a particular lift
    - (Extreme Stretch Goal) I want to be able to project future workouts using known templates and based on my known response to various levels of volume

- As a lifter, I may want to add bands/chains to my planned lift
    - I want to be able to set the weight/strength of bands chains separate from the straight weight of the lift

- As a lifter, I want to be able to set goals, and see an estimated time to goal
    - I want to set a goal bodyweight, and see it on my bodyweight graph
    - I want to set goals for 1RM in a given lift, and see my graph over time, as compared to my goal

## Development Process

For the Client, I began only after the "maxes" table was fully working in the API. I then used my previous experience with RESTful authentication to get authentication and BootStrap modal-based forms working on the front-end. After authentication was working, I began to write the client side access to the maxes table. Drawing the table, and getting all database actions working was relatively trivial after so much practice in the previous project. I then researched various charting libraries, and decided Google Charts met my needs. I implemented my chart in a file within the maxes folder, in a way I would later have to change. After this I added the bodyweights table to the API. I was then able to get the access and table portions of the front end working very quickly, as they are a mirror image of the maxes access and display. After this I attempted several ways to get Google Charts working to draw more than one chart in the same application. I ended up discovering that because of the way Google Charts loads, I had to add all charting code to one file, and load that file directly into the HTML file. I cast AJAX calls into JS Promises within this file to allow myself to draw the charts only when the data is returned from the server. Config, AJAX, event handlers, and all related code had to be added into this file alone, as a file that loads Google Charts cannot load Node or Require.