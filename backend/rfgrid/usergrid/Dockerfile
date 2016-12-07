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

# build usergrid from source

FROM rfjava8

WORKDIR /root
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/jre

COPY apache-tomcat-7.0.73.tar.gz /root/apache-tomcat-7.0.73.tar.gz
#COPY create_tomcat_admin_user.sh /root/create_tomcat_admin_user.sh
COPY ROOT-apache-usergrid-2.1.0-binary.tar.war /root/ROOT.war

RUN echo "+++ install tomcat and packages required for compilation" && \
  cd /root && \
  tar zxf apache-tomcat-7.0.73.tar.gz && \
  mv apache-tomcat-7.0.73 apache-tomcat-7 && \
  rm -rf apache-tomcat-7/webapps/ROOT && \
  mv ROOT.war apache-tomcat-7/webapps


COPY usergrid-custom.properties /root/apache-tomcat-7/lib/usergrid-deployment.properties
CMD /root/run.sh
COPY initialize-usergrid.sh /root/initialize-usergrid.sh
COPY run.sh /root/run.sh

# exposed ports:
#  8080 usergrid http interface
#  8443 usergrid https interface
EXPOSE 8080 8443
