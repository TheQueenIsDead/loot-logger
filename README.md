[![GitHub Release](https://img.shields.io/github/release/TheQueenIsDead/loot-logger.svg?style=flat)]() 
[![Conventional Commits](https://img.shields.io/badge/Conventional%20Commits-1.0.0-%23FE5196?logo=conventionalcommits&logoColor=white)](https://conventionalcommits.org)

# 🚽 LootLogger 💩

LootLogger is an application that allows you to track how much money you get paid for taking a poop at work.

It is built using the [Ionic Framework](https://ionicframework.com/) backed by [React](https://react.dev/), 
and utilises [MongoDB Realm](https://www.mongodb.com/developer/products/realm/) for backend persistence and authentication.

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

Debug artifacts are built via CI after a release has been cut. Many thanks to [Nottaram04](https://github.com/Narottam04) for
their functional workflow example in the [action-capacitor-android](https://github.com/Narottam04/action-capacitor-android) 
repository.

To download, navigate to the [latest release](https://github.com/TheQueenIsDead/loot-logger/releases/latest) and retrieve `LootLogger.apk`.

To develop locally, generate the latest version of the assets and android code by running

```bash
npx capacitor-assets generate
npx cap sync
```

Then in Android Studio, import a new project by opening the `build.gradle` file located at `app/android/build.gradle`.
