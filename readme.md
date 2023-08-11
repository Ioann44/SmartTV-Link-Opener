## TV connection
I don't think someone will do this, so scripts will be with my paths.

All these scripts are running from ./CLI/bin, it works without installation.
### Add TV
```bash
# Add device
./ares-setup-device
# See list of connected devices (optional)
./ares-setup-device --list
# Allows install apps on TV
./ares-novacom --device kitchen_tv --getkey
./ares-launch -s 23 ../../tvApp
```
### Install app on TV
```bash
# Build application into *.ipk file
# You can specify output path with -o flag
./ares-package ../../tvApp
# Install it on TV
./ares-install -d kitchen_tv link-opener_0.0.1_all.ipk
```
Launch it manually after installation
## Launch on simulator
Keep in mind that you can't launch browser on simulator by using js code
```bash
./ares-launch -s 23 ../../tvApp
```
## Server start
From server folder
```bash
node main
```
This starts nodejs server, necessary for most of the application functionality, can be replased by any other, static ip preffered though.