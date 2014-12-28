#boomerang

UPDATE: This project is frozen now. More or less forever.

Dream Industries Summer School'13 project - Call to the future

##Edit css

Install compass, run `compass watch` in project dir, edit `*.sass` files.
`compass` will create (or recreate) `*.css` files.
See `config.rb` for details.

##Deploy boomerang / echoist / Rec.All

once install heroku toolbelt and (in project root dir):

    heroku apps:create echoist
    git remote add heroku git@heroku.com:echoist.git

when master branch is "stable":

    git co production
    git merge master
    git push
    git push heroku production:master

##Quick install

 Install npm (server side) dependencies:

    $ npm install

 Start the server:

    $ node server
 
 Then open a browser and go to:
    
    http://localhost:3000

## Min project
    
    npm -g install express
    express boomerang

Add `forever` model to packages -- is needed for heroku deployment
