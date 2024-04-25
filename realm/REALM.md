# Realm

Realm can be updated via [CICD](https://www.mongodb.com/docs/atlas/app-services/apps/cicd/) 
based on [configuration files](https://www.mongodb.com/docs/atlas/app-services/reference/config/#std-label-app-configuration)
in source control.

This allows us to keep the schema definition for our data in VCS, and deploy or rollback based on the `main` branch.



## CLI

To initially setup the configuration, install the [app services CLI](https://www.mongodb.com/docs/atlas/app-services/cli/#std-label-install-appservices-cli)

```bash
npm install -g atlas-app-services-cli
```

The config was initially retrieved by doing the following

```bash
mkdir realm && cd $_
appservices login
# Create an API token and enter your public and private key on the CLI after the browser opens
appservices pull --remote=application-0-vyzlwzl
```

And the CICD pipeline was setup as a Github app via the UI per the following documentation:

 - [Enable Automatic Deployment with GitHub](https://www.mongodb.com/docs/atlas/app-services/apps/deploy-github/)