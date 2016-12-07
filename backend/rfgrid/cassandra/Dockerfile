#
FROM rfjava8
ENV JAVA_HOME /usr/lib/jvm/java-8-openjdk-amd64/jre

WORKDIR /root

COPY apache-cassandra-1.2.9-bin.tar.gz /root/apache-cassandra-1.2.9-bin.tar.gz

RUN echo "+++ install tomcat and packages required for compilation" && \ 
  cd /root && \
  tar zxf apache-cassandra-1.2.9-bin.tar.gz && \ 
  mv apache-cassandra-1.2.9 cassandra && \
  mkdir -p /var/log/cassandra && \
  mkdir -p /var/lib/cassandra

CMD /root/run.sh

#  9042 cassandra native transport (cassandra query language, cql)
#  9160 cassandra thrift interface (legacy)
EXPOSE 9042 9160

COPY run.sh /root/run.sh 
