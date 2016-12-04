ADMIN_USER=rf
ADMIN_PASS=rf
ADMIN_MAIL=admin@example.com
ORG_NAME=rfgrid
APP_NAME=octopussy

echo "+++ usergrid database setup $ADMIN_USER:$ADMIN_PASS"
curl --user ${ADMIN_USER}:${ADMIN_PASS} -X PUT http://localhost:8080/system/database/setup

echo "+++ usergrid database bootstrap"
curl --user ${ADMIN_USER}:${ADMIN_PASS} -X PUT http://localhost:8080/system/database/bootstrap

echo "+++ usergrid superuser setup"
curl --user ${ADMIN_USER}:${ADMIN_PASS} -X GET http://localhost:8080/system/superuser/setup

echo "+++ create organization and corresponding organization admin account"
curl -D - \
     -X POST  \
     -d "organization=${ORG_NAME}&username=${ORG_NAME}admin&name=${ORG_NAME}admin&email=${ORG_NAME}admin@example.com&password=${ORG_NAME}admin" \
     http://localhost:8080/management/organizations

echo "+++ create admin token with permissions"

export ADMINTOKEN=$(curl -X POST --silent "http://localhost:8080/management/token" -d "{ \"username\":\"${ORG_NAME}admin\", \"password\":\"${ORG_NAME}admin\", \"grant_type\":\"password\"} " | cut -f 1 -d , | cut -f 2 -d : | cut -f 2 -d \")
echo ADMINTOKEN=$ADMINTOKEN

# curl -X POST --silent "http://localhost:8080/management/token" -d '{ "username":"rfgridadmin", "password":"rfgridadmin", "grant_type":"password"}'

echo "+++ create app"
curl -D - \
     -H "Authorization: Bearer ${ADMINTOKEN}" \
     -H "Content-Type: application/json" \
     -X POST -d "{ \"name\":\"${APP_NAME}\" }" \
     http://localhost:8080/management/orgs/${ORG_NAME}/apps

echo "+++ delete guest permissions"
curl -D - \
     -H "Authorization: Bearer ${ADMINTOKEN}" \
     -X DELETE "http://localhost:8080/${ORG_NAME}/${APP_NAME}/roles/guest"

echo "+++ delete default permissions which are too permissive"
curl -D - \
     -H "Authorization: Bearer ${ADMINTOKEN}" \
     -X DELETE "http://localhost:8080/${ORG_NAME}/${APP_NAME}/roles/default"


echo "+++ create new guest role"
curl -D - \
     -H "Authorization: Bearer ${ADMINTOKEN}" \
     -X POST "http://localhost:8080/${ORG_NAME}/${APP_NAME}/roles" \
     -d "{ \"name\":\"guest\", \"title\":\"Guest\" }"

echo "+++ create new default role, applied to each logged in user"
curl -D - \
     -H "Authorization: Bearer ${ADMINTOKEN}" \
     -X POST "http://localhost:8080/${ORG_NAME}/${APP_NAME}/roles" \
     -d "{ \"name\":\"default\", \"title\":\"User\" }"


echo "+++ create guest permissions required for login"
curl -D - \
     -H "Authorization: Bearer ${ADMINTOKEN}" \
     -X POST "http://localhost:8080/${ORG_NAME}/${APP_NAME}/roles/guest/permissions" \
     -d "{ \"permission\":\"post:/token\" }"

curl -D - \
     -H "Authorization: Bearer ${ADMINTOKEN}" \
     -X POST "http://localhost:8080/${ORG_NAME}/${APP_NAME}/roles/guest/permissions" \
     -d "{ \"permission\":\"post:/users\" }"

curl -D - \
     -H "Authorization: Bearer ${ADMINTOKEN}" \
     -X POST "http://localhost:8080/${ORG_NAME}/${APP_NAME}/roles/guest/permissions" \
     -d "{ \"permission\":\"get:/auth/facebook\" }"

curl -D - \
     -H "Authorization: Bearer ${ADMINTOKEN}" \
     -X POST "http://localhost:8080/${ORG_NAME}/${APP_NAME}/roles/guest/permissions" \
     -d "{ \"permission\":\"get:/auth/googleplus\" }"

echo "+++ create plumbingorders collection"
 curl -D - \
      -H "Authorization: Bearer ${ADMINTOKEN}" \
      -X POST "http://localhost:8080/${ORG_NAME}/${APP_NAME}/plumbingorders" \
      -d "{\"name\": \"first-order\"}"

echo "+++ create default permissions for a logged in user to access plumbingorders"
curl -D - \
     -H "Authorization: Bearer ${ADMINTOKEN}" \
     -X POST "http://localhost:8080/${ORG_NAME}/${APP_NAME}/roles/default/permissions" \
     -d "{ \"permission\":\"get,put,post,delete:/users/\${user}/**\" }"

curl -D - \
     -H "Authorization: Bearer ${ADMINTOKEN}" \
     -X POST "http://localhost:8080/${ORG_NAME}/${APP_NAME}/roles/default/permissions" \
     -d "{ \"permission\":\"post:/notifications\" }"

 curl -D - \
      -H "Authorization: Bearer ${ADMINTOKEN}" \
      -X POST "http://localhost:8080/${ORG_NAME}/${APP_NAME}/roles/default/permissions" \
      -d "{ \"permission\":\"get,put,post,delete:/plumbingorders\" }"

echo "+++ create user"
curl -D - \
     -H "Authorization: Bearer ${ADMINTOKEN}" \
     -X POST "http://localhost:8080/${ORG_NAME}/${APP_NAME}/users" \
     -d "{ \"username\":\"${ORG_NAME}user\", \"password\":\"${ORG_NAME}user\", \"email\":\"${ORG_NAME}user@example.com\" }"

echo
echo "+++ done"
