# NCAT World

Created in `Angular 11.1.1`

## Development server
Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build
Run `ng build --prod` to build the project. The build artifacts will be stored in the `dist/` directory.


# Top level concept
## World Building and Tokenomics
- its giong to be a MMO sandbox game, like mine-craft
- player burn token to get credits, and when they place Tile in the world credits deducted
- the tiles placed by one player can be replaced by anoother player, but the person have to spend extra credits to replace it (the amount they need to spend is equal to the amount the current tile is worth), so a tile become more and more expensive to be replaced
- user can also spend more credit on a tile to simply up the value without making changes to the tile (ie: to protect their land)
- we will start with a common world for now, but players can open new "WORLD" by burning a big sum of NCATS. eg: 100billion NCAT to make a new WORLD.

## User Interface
Assuming size of each world is 2048x2048 tiles (not sure if tats big enough LOL), now u can only reach the edge of your screen and the map won't scroll or move.

- each map tile consists of 4 layers. background, terrain, object
    - ground = render at the bottom (grass, dirt, dungeon, wood, swamp, cobble, ...)
    - terrain = render on on top of ground (water, mountain, wall, jungle, castle)
    - floor = render on top of terrain (grass, bridges..)
    - object = interactable objects (eg NPC, Chest, etc)
- tile attributes
    - blocking,cost,animated(no of frames)
    - objects have x,y coordinates, server API for interaction (dialogs etc)

- we need to make the map scroll as player walk around, player is always at the center of screen unless u reached the edge of the world

- each time player move, we need to stream the viewable map area from backend, plus any changes made on the map by one player have to be broadcasted via websocket so everyone update , including player movement

- press a "chat" button, a chat window open. you can type message and it will appear on top of your avatar , the chat window will only show messages by other players visible on your screen.

## AVATAR Editor
we need an avatar editor, u have few template to choose from (different type of cats, fat / thin / big / small etc), and you can paint your cat

- actually we need a "sign up" process, where u link your wallet , your address will become your user-id.
- then we bring you to avatar editor.
- after save avatar, only we launch game
- user can go back to Avatar editor anytime to change their look



## Future plans
NPC, Quest, Loots (treasure chests linekd to NFC), so on
