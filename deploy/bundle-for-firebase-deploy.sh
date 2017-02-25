#!/bin/bash
STATICS_LOCATION="build/*.js build/*.css build/*.ico build/*.html"
PRODUCTION_OUTPUT="deploy/production"
STAGING_OUTPUT="deploy/staging"
APP_BUNDLE_LOCATION=$(ls build/app.*.js)
if [ -z $APP_BUNDLE_LOCATION ]; then
  echo "Could not find app.[hash].js in `pwd`/build/, exiting."
  exit
fi
APP_BUNDLE_NAME=${APP_BUNDLE_LOCATION/build\//}
APP_BUNDLE_HASH=${APP_BUNDLE_NAME/app\./}
APP_BUNDLE_HASH=${APP_BUNDLE_HASH/\.js/}
ENV_JS="env.${APP_BUNDLE_HASH}.js"

echo "Releasing with $APP_BUNDLE_NAME, cleaning $STAGING_OUTPUT and $PRODUCTION_OUTPUT"
echo "/ **    Built on     ** \\"
stat -f "%Sm" -t "  %Y/%b/%d %H:%M:%S" $APP_BUNDLE_LOCATION
echo "\ **                  **/"
echo "Cleaning output folders $STAGING_OUTPUT and $PRODUCTION_OUTPUT"
rm -Rf $STAGING_OUTPUT
rm -Rf $PRODUCTION_OUTPUT

echo "Copying $APP_BUNDLE_LOCATION and $STATICS_LOCATION to $STAGING_OUTPUT and $PRODUCTION_OUTPUT changing app.js to for firebase deploy"
echo ""
mkdir -p $STAGING_OUTPUT
cp -v $STATICS_LOCATION $STAGING_OUTPUT
sed -i'' -e "s/app.js/${APP_BUNDLE_NAME}/" $STAGING_OUTPUT/index.html
sed -i'' -e "s/env.js/${ENV_JS}/" $STAGING_OUTPUT/index.html
cp -v $APP_BUNDLE_LOCATION $STAGING_OUTPUT/
cp -v deploy/env-staging.js $STAGING_OUTPUT/$ENV_JS

echo ""
mkdir -p $PRODUCTION_OUTPUT
cp -v $STATICS_LOCATION $PRODUCTION_OUTPUT
sed -i'' -e "s/app.js/${APP_BUNDLE_NAME}/" $PRODUCTION_OUTPUT/index.html
sed -i'' -e "s/env.js/${ENV_JS}/" $PRODUCTION_OUTPUT/index.html
cp -v $APP_BUNDLE_LOCATION $PRODUCTION_OUTPUT/
cp -v deploy/env-production.js $PRODUCTION_OUTPUT/$ENV_JS

echo "Modified app.js reference in index.html to ${APP_BUNDLE_NAME} and env.js to ${ENV_JS}"

echo ""
echo "Deploy output folders updated, ready to run firebase deploy"
