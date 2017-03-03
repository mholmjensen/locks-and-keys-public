# Locks and keys
Full stack for 2016/2017 locks-and-keys project.

## Prerequisites
* nix like system
* `node.js` 7.4 or later, `npm`
* `docker`, `docker-compose`
* særbestilling/el stack running (https://github.com/rfit/el)
* (Opt) Nuclide (Atom extension)

## Development
* Clone this repo
```
cd locks-and-keys/
npm i
npm run build
```
Boot up særbestilling/el stack and update reference in `build/env.js` to the IP this stack receives. Then, start up a local webpack dev server
```
npm run dev
```
and visit `http://localhost:8082`. Changes made to files inside src/ will be propagated to your browser (tested in Chrome).

### Linting
Please lint before any pull request
```
npm run lint
```

## Deployment
### Prerequisites
  * `npm install -g firebase-tools`
###
  * `cd <project-root>`
  * `./prepare-deploy.sh`
  * `firebase deploy` defaulting to staging
