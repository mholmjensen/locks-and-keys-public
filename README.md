# Locks and keys
Full stack for 2016/2017 locks-and-keys project.

## Prerequisites
* node.js 6 or later
* docker and docker-compose
* (Opt) Nuclide (Atom extension)

## Development
* Clone this repo
```
cd locks-and-keys/
npm i
npm run build
```
Boot up backend stack, see instructions in backend/README.md directory. Once running, start up a local webpack dev server
```
npm run dev
```
and enter `http://localhost:8082`. Changes made to files inside src/ will be propagated to your browser (tested in Chrome).

### Linting
```
npm run lint
```

## Production
To be done
