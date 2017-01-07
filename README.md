# Locks and keys
Full stack for 2016/2017 locks-and-keys project.

## Prerequisites
* nix like system
* node.js 6 or later
* npm
* særbestilling/el stack running (https://github.com/rfit/el)
* (Opt) Nuclide (Atom extension)

## Development
* Clone this repo
```
cd locks-and-keys/
npm i
npm run build
```
Boot up særbestilling/el stack and update references to the IP this stack receives. Once running, start up a local webpack dev server
```
npm run dev
```
and enter `http://localhost:8082`. Changes made to files inside src/ will be propagated to your browser (tested in Chrome).

### Linting
Please lint before any pull request
```
npm run lint
```

## Production
To be done
