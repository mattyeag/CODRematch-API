## CODRematch-API
customizable matchmaking for Call of Duty 


## To run: 
  pull master branch. and run following commands in project directory. 
install dependencies. 
##### `npm install`
build and run server and start listening for changes.
##### `npm run build-dev`



 Use a webbrowser or postman to call the available endoints
   #### POST `localhost:3000/public/cod/stats`
   get your stats
   request body: ```{
	"username":"mattysqueez",
	"game":"mw",
	"platform":"xbl"
}```

response body: ``` {
    "status": "success",
    "data": {
        "title": "mw",
        "platform": "xbl",
        "username": "mattysqueez",
        "type": "mp",
        "level": 76,
        "maxLevel": 0,
        "levelXpRemainder": 3000,
        "levelXpGained": 7000,
        "prestige": 0,
        "prestigeId": 0,
        "maxPrestige": 0,
        "totalXp": 960000,
        "paragonRank": 0,
        "paragonId": 0,
        "lifetime": { // all stats```
	
	
#### POST `localhost:3000/public/cod/friends/stats`
get stats of all your friends

request body: ```{
	"username":"mattysqueez",
	"game":"mw",
	"platform":"xbl"
}```

### Parameters
##### platform: string
xbox => 'xbl'
PC => 'uno'
PS4 => 'psn'

##### game: string
modern warfare => 'wm'
black ops 4 => 'bo4'


##### username : urlEncoded string (not case sensative)
ex: 'mattysqueez'