# Smart TV Link Opener
Application for fast opening links on TV. Current version needs a running server on static IP/domain.
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
```
### Install app on TV
```bash
# Build application into *.ipk file
# You can specify output path with -o flag
./ares-package ../../tvApp
# Install it on TV
./ares-install -d kitchen_tv link-opener_0.0.1_all.ipk
```
Launch it manually after installation.
## Launch on simulator
Keep in mind that you can't launch browser on simulator by using js code
```bash
./ares-launch -s 23 ../../tvApp
```
## Server start
From server folder.

Node v18.17.1 is used.
```bash
# Only on first run
npm install
# Start server
node main
```
This starts nodejs server, necessary for most of the application functionality, can be replased by any other, static ip preffered though.
## Server API
You can access changing link on ```GET /``` path in browser.

Set new link with ```POST /``` with json ```{newLink: <newValue>}```

Check current stored link on ```GET /getLink```