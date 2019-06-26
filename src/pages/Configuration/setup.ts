

export const script_code = `#!/bin/bash
# a tap device can be create by:
sudo ip tuntap add name {0} mode tap
sudo ip tuntap add name {2} mode tap
# ...
# a veth pair can be create by:
sudo ip link add {0} type veth peer name {1}
sudo ip link add {2} type veth peer name {3}

# OVS switch as SDN Adapter 
sudo ovs-vsctl add-br {7}
sudo ovs-vsctl set bridge {7} protocols=OpenFlow13 
sudo ovs-vsctl set bridge {7} other-config:datapath-id={8}
sudo ovs-vsctl set-controller {7} "tcp:127.0.0.1:{9}"
sudo ip link set {7} promisc on
# Add port
sudo ovs-vsctl add-port {7} {0}
sudo ovs-vsctl add-port {7} {1}
sudo ovs-vsctl add-port {7} {2}
sudo ovs-vsctl add-port {7} {3}

# for example, if the we want the IP/HW MAC of {0} to be {4}/{5} with mac address {6}
sudo ip addr add {4}/{5} dev {0}
sudo ip link set {0} {12} address {6} promisc on 
sudo ip link set {1} {12} promisc on
# Similarly, for server port
sudo ip addr add {10}/{11} dev {2}
sudo ip link set {2} {13} promisc on 
sudo ip link set {3} {13} promisc on 

`