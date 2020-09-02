# Asus Merlin simple VPN client setup

Simpler UI for setting on/off VPN clients on Asus Merlin. Designed to be used in local network only.

## [Check out online demo](https://ariperkkio.github.io/asus-merlin-simple-vpn-client-setup)

![demo](https://github.com/AriPerkkio/asus-merlin-simple-vpn-client-setup/blob/master/resources/demo.png)

## Installation

```bash
# Specify version in URL
$ curl -L \
    https://github.com/AriPerkkio/asus-merlin-simple-vpn-client-setup/files/4050830/asus-merlin-simple-vpn-client-setup-0.0.2.zip \
    --output asus-merlin-simple-vpn-client-setup.zip

$ unzip -q asus-merlin-simple-vpn-client-setup.zip
$ cd asus-merlin-simple-vpn-client-setup-*

# If ssh-key hasn't been generated yet
$ ssh-keygen -f ssh-key
$ ssh-copy-id -i ssh-key <USERNAME>@<HOST> -p PORT

# Next set same USERNAME, HOST and PORT to ./ssh-config
$ cat ssh-config
USERNAME=
HOST=
PORT=

# Run in background and generate logs
$ sh -c "yarn start >> logs" &
```

## Local development

```sh
# Run UI and API integration in watch mode
# UI is available at localhost:3000
# API is available at localhost:3001
$ cd <project root>
$ yarn dev

# Run UI only with MSW mock data
# UI is available at localhost:3000
$ cd <project root>/packages/ui
$ yarn start

# Run API only with mock router (ssh server) and MSW
# API is available at localhost:3001/api
$ cd <project root>/packages/api
$ yarn dev

# Run tests
$ cd <project root>
$ yarn test
```

## Building & packing release

```sh
$ cd <project root>

# Install dependencies
$ yarn

# Build UI and API
$ yarn build

# Pack release
$ yarn pack-release <version number>

# Release archive is generated to /release
$ ls release/
asus-merlin-simple-vpn-client-setup-<version>.zip
```
