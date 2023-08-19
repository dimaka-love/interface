# Dimaka Interface

> Interface for Dimaka

Main wrapper for game, consists of all interface parts and input handlers. Written on React.

## Usage

All this React components published on npm: [@dimaka/interface](http://npmjs.com/@dimaka/interface).
API is still evolving. But you can see how we use it right in the game.

## UI Components

### HUD

These components are using React DOM for now. But for the better performance I have plans to render in some other way.

- [X] Rotate device overlay
- [ ] Inventory (almost here)
- ~~[ ] Players Tab~~
- [X] Touch controls
- [X] Hotbar
- [X] Waila
- [ ] Wearable armor state (such as jetpacks engine state)

### Other

Other components is a React DOM components that are not used in HUD:

- [ ] Main Menu, loading and other screens
- [X] Pause Menu
- [X] Basic settings Menu with localStorage (will be removed I guess)
- [ ] Settings Menu for controls

## Other Things to do

- [ ] forward refs
