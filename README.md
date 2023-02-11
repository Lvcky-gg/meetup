#TPG EVENT MANAGER -- Meetup Clone

![image](image one.png)

##Live Link

front end: https://meetup-dk5k.onrender.com
back end: https://meetup-dk5k.onrender.com/api

##Intro

This is a clone of Meetup that brings a new face to the platform for a gaming focused community.
It contains two Full CRUD features, One for events and one for groups.

###Crud Feature One
####Groups

/groups allows you to view groups home
/groups/:groupId allows you to view a specific group

It uses modals in order to create and edit the group.
Images are handled with a dropdown.
Deleting both the group and an image are handled with a button.
It utilizes a default image for the group.


###Crud Feature Two
####Events

/events allows you to see your events home
/events/:eventId allows you to view a specific event

It uses modals in order to create and edit the group.
Images are handled with a dropdown.
Deleting both the event and an image are handled with a button.
It utilizes a default image for the event.

##Starting the backend

cd into folder /meetup/backend
run npm install
run npx dotenv sequelize db:migrate
run npx dotenv sequelize db:seed:all
run npm start

##Starting the frontend

cd into folder /meetup/frontend
run npm install
run npm start


