## Chat from the training course Yandex.Practicum by profession middle frontend developer.
This project is designed to develop a text chat as part of a training course.
Currently connected:
sprint 1
- parcel to build the project
- pug template engine (unfortunately pug does not have methods for rendering on the client, you probably need to switch to handlebars)
- express server for distributing statics
- scss for styling
sprint2
- implemented MVC approach and own classes Block, EventBus
- developed by HTTPClient
- the structure of the project is divided into independent components
- added validation of form fields
- added code quality analysis tools eslint & stylelint + husky precommit hooks for linting before commit
- the project has completely moved to typescript
- implemented hash routing
sprint3
- added full routing based on History
- added global application state storage
- developed the functionality of data interaction with api, as well as dynamic messaging
- implemented tested with mocha+chai
- application is protected from XSS attacks
sprint4
- definitive departure from pug, implemented its own templating engine
- Implemented assembly of a static application in a Docker container
- configured Webpack instead of Parcel
- audit of dependencies was carried out
- deploy to Heroku

Automatic deployment occurs when delpoy branch is updated
## Commands
npm run dev to start the parcel dev server
to build the project npm run build
to start express server npm run start
to run the code quality checker (link) npm run lint
to run tests npm run test

## Links
layouts (provided by the Yandex.Practice team): https://www.figma.com/file/24EUnEHGEDNLdOcxg7ULwV/Chat?node-id=0%3A1
expanded copy on netlify: https://agitated-visvesvaraya-3225a8.netlify.app
copy on heroku: https://vodyanov-app.herokuapp.com/ 
