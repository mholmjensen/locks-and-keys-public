#!/bin/bash

echo "+++ Cassandra will have broadcast_rpc_address on "
hostname --ip-address
echo "+++"

# default values for configuration variables
if [ -z "${CASSANDRA_RPC_ADDRESS}" ] ; then
  # accept rpc requests from this address
  CASSANDRA_RPC_ADDRESS=0.0.0.0
fi
if [ -z "${CASSANDRA_BROADCAST_RPC_ADDRESS}" ] ; then
  # if rpc address is set to 0.0.0.0, broadcast rpc address has to be different from 0.0.0.0
  CASSANDRA_BROADCAST_RPC_ADDRESS=$(hostname --ip-address)
fi

CONFIG_FILE=/root/cassandra/conf/cassandra.yaml

sed -i -e "s/cluster_name: 'Test Cluster'/cluster_name: 'usergrid'/" ${CONFIG_FILE}
sed -i -e "s/^\(listen_address:\).*/\1 ${CASSANDRA_BROADCAST_RPC_ADDRESS}/" ${CONFIG_FILE}
sed -i -e "s/^\(rpc_address:\).*/\1 ${CASSANDRA_RPC_ADDRESS}/" ${CONFIG_FILE}
sed -i -e "s/^\(# \)\(broadcast_rpc_address:\).*/\2 ${CASSANDRA_BROADCAST_RPC_ADDRESS}/" ${CONFIG_FILE}
sed -i -e "s/^\([ ]*- seeds:\).*/\1 ${CASSANDRA_BROADCAST_RPC_ADDRESS}/" ${CONFIG_FILE}
#sed -i -e "s/^\(start_rpc:\).*/\1 true/" ${CONFIG_FILE}

ENV_FILE=/root/cassandra/conf/cassandra-env.sh
sed -i -e "s/JVM_OPTS -Xss180k/JVM_OPTS -Xss256k/" ${ENV_FILE}

/root/cassandra/bin/cassandra -f
