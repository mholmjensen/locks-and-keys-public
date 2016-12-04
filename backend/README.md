# rfgrid: Backend for Locks and Keys based on Apache usergrid
Starts up rfgrid stack using `docker-compose` which contains

* Apache Usergrid exposed on `http://localhost:8080`
  * Depends on cassandra (distributed nosql data store) and elasticsearch
* Usergrid Portal exposed on `http://localhost:8081`
* Front server exposed on `http://localhost:80` serving `rfgrid/dev-build/`
  * Populate `rfgrid/dev-build/` using `npm run build`
  * webpack-dev-server proxies `localhost:8082/backend` -> `http://localhost:80/backend` to avoid CORS issues during development
  * Proxies `http://localhost:80/backend` -> `http://localhost:8080` (i.e. usergrid)

Stack based on [usergrid-docker](https://github.com/yep/usergrid-docker).

## Booting the stack
```
cd locks-and-keys
npm run build
cd rfgrid/
docker build -t rfjava8 java/
docker-compose up -d
```
Verify that system boots and that usergrid application is built by inspecting `data/usergrid-tomcat-logs/catalina.out` importing data.
## Importing from Særbestilling
Start up el vagrant stack
```
cd worker
npm run start
```
In case of errors, check and possibly modify host in `interim-import.js` to match host of your local el vagrant stack.

## Rebuilding the stack (wipes all data)
```
rm -Rf rfgrid/data/cassandra-lib # Purges data store
docker-compose up --build -d
```
