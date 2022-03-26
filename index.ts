import * as pulumi from "@pulumi/pulumi";
import * as kubernetes from "@pulumi/kubernetes";
import * as digitalocean from "@pulumi/digitalocean";

const config = new pulumi.Config();
const node_count = config.getNumber("node_count") || 1;
const cluster_name = `gophertests-${pulumi.getStack()}`;

const cluster = new digitalocean.KubernetesCluster(cluster_name, {
  region: digitalocean.Region.NYC1,
  version: digitalocean.getKubernetesVersions().then((p) => p.latestVersion),
  nodePool: {
    name: "default",
    size: digitalocean.DropletSlug.DropletS2VCPU2GB_AMD,
    nodeCount: node_count,
  },
});

export const kubeconf = cluster.kubeConfigs[0].rawConfig;
const provider = new kubernetes.Provider("do-k8s", { kubeconfig: kubeconf });

let NginxChartOpts: kubernetes.helm.v3.ChartOpts = {
  chart: "ingress-nginx",
  fetchOpts: {
    repo: "https://kubernetes.github.io/ingress-nginx",
  },
};

const Ingress = new kubernetes.helm.v3.Chart("ingress-nginx", NginxChartOpts,{provider});

export const resources = Ingress.resources;
