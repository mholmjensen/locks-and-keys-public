#!/bin/bash
STATICS_LOCATION="build/*.js build/*.css build/*.ico build/*.html"
PRODUCTION_OUTPUT="deploy/production"
STAGING_OUTPUT="deploy/staging"
APP_BUNDLE_LOCATION=$(ls build/app.*.js)
APP_BUNDLE_NAME=${APP_BUNDLE_LOCATION/build\//}

echo "Releasing with $APP_BUNDLE_NAME, cleaning $STAGING_OUTPUT and $PRODUCTION_OUTPUT"
echo "Timestamp: $(ls -la build/app.*.js)"
echo ""
rm -Rf $STAGING_OUTPUT
rm -Rf $PRODUCTION_OUTPUT

echo "Copying $APP_BUNDLE_LOCATION and $STATICS_LOCATION to $STAGING_OUTPUT and $PRODUCTION_OUTPUT changing app.js to for firebase deploy"
mkdir -p $STAGING_OUTPUT
cp -v $STATICS_LOCATION $STAGING_OUTPUT
sed -i '' "s/app.js/${APP_BUNDLE_NAME}/" $STAGING_OUTPUT/index.html
cp -v $APP_BUNDLE_LOCATION $STAGING_OUTPUT/
cp -v deploy/env-staging.js $STAGING_OUTPUT/env.js

echo ""
mkdir -p $PRODUCTION_OUTPUT
cp -v $STATICS_LOCATION $PRODUCTION_OUTPUT
sed -i '' "s/app.js/${APP_BUNDLE_NAME}/" $PRODUCTION_OUTPUT/index.html
cp -v $APP_BUNDLE_LOCATION $PRODUCTION_OUTPUT/
cp -v deploy/env-production.js $PRODUCTION_OUTPUT/env.js

echo "Modified app.js reference in index.html to ${APP_BUNDLE_NAME} and set env.js"

echo "Deploy output folders updated, ready to run `firebase deploy`"
