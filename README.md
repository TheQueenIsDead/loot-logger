[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

# Loo-t-Logger

Loo-t-Logger is a application that allows you to track how much money you get paid for taking a poop at work.

It is built using the [Ionic Framework](https://ionicframework.com/) backed by [React](https://react.dev/).

## Web

The `main` branch of the app is hosted on Cloudflare Pages at [lootlogger.app](https://lootlogger.app)

To start developing, clone the repository and follow the below steps

```bash
# Install the ionic CLI
npm i -g @ionic/cli
# Navigate to the app directory
cd app
# Install dependencies
npm install
# Run the development server
ionic serve
```

## Android

Debug artifacts are built via CI on push to main. Many thanks to [Nottaram04](https://github.com/Narottam04) for
their functional workflow example in the [action-capacitor-android](https://github.com/Narottam04/action-capacitor-android) 
repository.

To download, navigate to the [Build Android](https://github.com/TheQueenIsDead/loo-t-logger/actions/workflows/android.yml)
workflow, select a workflow run, and download the `debug` artifact.

Once downloaded, the `.apk` can be extracted, and installed on your Android device.
