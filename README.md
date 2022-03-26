# do-pl-k8s 🚀

Q: What's this?
A: an attempt to teach myself typscript and pulumi at the same time 


Q: I thought you don't like javascript? 
A: True but I like types 

Q: So what does this do?
A: This project provisons a kubernetes cluster on digitalocean and deploy Ingress-Nginx using the helm provider 


## Usage ⚙️

clone this project 
```bash
git clone https://github.com/s1ntaxe770r/do-pl-k8s.git
```

Install dependencies
```bash
cd do-pl-k8s && npm install
```

Set your digital ocean token 
```bash
pulumi config set digitalocean:token <insert token here> --secret
```

(Optional) Configure number of nodes 
```bash
pulumi config set node_count 2  
```

## Running ⌛️

```bash
pulumi up
```

## Output your kubeconfig 

```bash
pulumi stack output kubeconf --show-secrets > kubeconfig.yaml    
```

## Inspect the deployment 🔎

```bash
export KUBECONFIG=kubeconfig.yaml && kubectl get deployments -A
```

output:
```bash
NAMESPACE     NAME                       READY   UP-TO-DATE   AVAILABLE   AGE
default       ingress-nginx-controller   1/1     1            1           21m
kube-system   cilium-operator            1/1     1            1           64m
kube-system   coredns                    2/2     2            2           64m
```

## Clean up 
because I'm not made out of money all good things must come to an end 
```bash
pulumi destroy
```

Probably going to update this in the future , but then again i say that about a lot of projects but lets find out. 
