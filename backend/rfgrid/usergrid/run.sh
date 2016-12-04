#!/bin/bash

# Copyright 2014-2015 Jahn Bertsch
# Copyright 2015 TOMORROW FOCUS News+ GmbH
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# this script is invoked after starting up the docker container.
# it allows for configuration at run time instead of baking all
# configuration settings into the container. you can set all configurable
# options using environment variables.
#
# overwrite any of the following default values at run-time like this:
#  docker run --env <key>=<value>

if [ -z "${CASSANDRA_CLUSTER_NAME}" ]; then
  CASSANDRA_CLUSTER_NAME='usergrid'
fi
if [ -z "${USERGRID_CLUSTER_NAME}" ]; then
  USERGRID_CLUSTER_NAME='usergrid'
fi

if [ -z "${TOMCAT_RAM}" ]; then
  TOMCAT_RAM=512m
fi

# start usergrid
# ==============

echo "+++ configure usergrid"
USERGRID_PROPERTIES_FILE=/root/apache-tomcat-7/lib/usergrid-deployment.properties

sed -i "s/cassandra.cluster=Test Cluster/cassandra.cluster=${CASSANDRA_CLUSTER_NAME}/g" $USERGRID_PROPERTIES_FILE
sed -i "s/usergrid.version.build=\${version}/usergrid.version.build=unknown/g" $USERGRID_PROPERTIES_FILE
# update tomcat's java options
# sed -i "s#\"-Djava.awt.headless=true -Xmx128m -XX:+UseConcMarkSweepGC\"#\"-Djava.awt.headless=true -XX:+UseConcMarkSweepGC -Xmx${TOMCAT_RAM} -Xms${TOMCAT_RAM} -verbose:gc\"#g" /etc/default/tomcat7

echo "+++ start usergrid"
/root/apache-tomcat-7/bin/catalina.sh start &
# database setup
# ==============

while [ -z "$(curl -s localhost:8080/status | grep '"cassandraAvailable" : true')" ] ;
do
   echo "+++ tomcat init log:"
   tail -n 300 /root/apache-tomcat-7/logs/catalina.out
done

./initialize-usergrid.sh& # Detach to watch logs

# log usergrid output do stdout so it shows up in docker logs
tail -f /root/apache-tomcat-7/logs/catalina.out /root/apache-tomcat-7/logs/localhost_access_log.20*.txt
