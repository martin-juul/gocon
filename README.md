# GoCon

## Docs

Project specific documentation is located in the [docs](/docs) directory.

+ [Angular](https://angular.io/docs)
+ [Capacitor](https://capacitorjs.com/docs)
+ [Ionic](https://ionicframework.com/docs)

Platform docs

+ [Android](https://developer.android.com/docs)
+ [Electron](https://www.electronjs.org/docs)
+ [iOS](https://developer.apple.com/documentation/)

## Branding

Search and replace `GoCon` in the project.

## License

A license agreement will have been arranged prior to you receiving this project.
In any other case the rights remain to the original author:

Copyright Martin Juul
All rights reserved

## Requirements

+ *nix environment
+ Node 12
    + yarn

### Global packages

```shell script
yarn global add @angular/cli @ionic/cli
ng config -g cli.packageManager yarn
```

### Android

For android development you should install Android Studio. Make sure to launch it, and install the sdk, platform tools and intel HAXM.

```shell script
brew cask install android-studio
```

### iOS

First install xcode from the App Store. If you haven't installed [homebrew](https://brew.sh), then do that first.

To avoid polluting the system ruby install, you should use rbenv to install cocoapods.

```shell script
brew install openssl rbenv ruby-build
```

Then in your .zshrc you should add these lines:

```shell script
export RUBY_CONFIGURE_OPTS="--with-openssl-dir=/usr/local/opt/openssl@1.1"
eval "$(rbenv init - zsh)"
```

Afterwards we install a recent version of ruby and cocoapods

```shell script
rbenv install 2.7.1
rbenv global 2.7.1
gem install cocoapods
```
