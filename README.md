# 2048 game

Implementation of 2048, core game functionality 
based on [PavlyukVadim/amadev](https://github.com/PavlyukVadim/amadev).
You will find the original script in `src/lib/amadev/original.script`.

The amadev code is rewritten to be object oriented 
classes within a module - with added functionality.

Uses [VueJS](https://vuejs.org/) to create the UI around the game.

## Quick start
### Live Demo
Try it here:
https://ellvtr.github.io/game2048a/

### Run locally
Requires [NodeJS](https://nodejs.org/en/), install if you don't have it.
Then clone this repo. In a terminal, go to this repo directory and type:
```bash
npm install --production
npm run serve
```

If you prefer docker, run this docker image:
```bash
docker run --name game2048 -d -p 8080:8080 ellvtr/game2048a
# Or with this script:
./run_docker.sh
```

The app will run by default on http://localhost:8080/

