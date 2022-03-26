import * as pulumi from "@pulumi/pulumi";
import * as kubernetes from "@pulumi/kubernetes"; 
import * as digitalocean from "@pulumi/digitalocean";


const config = new pulumi.Config();
const node_count = config.getNumber("node_count") || 1;
const cluster_name = `gophertests-${pulumi.getStack()}`


const cluster = new digitalocean.KubernetesCluster(cluster_name,{
    region: digitalocean.Region.NYC1,
    version: "latest",
    nodePool: {
        name: "default",
        size:digitalocean.DropletSlug.DropletS2VCPU2GB_AMD,
        nodeCount: node_count,
    },
});


export const kubeconf = cluster.kubeConfigs[0].rawConfig;


