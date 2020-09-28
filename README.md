# setup-bin

[![Actions Status](https://github.com/supplypike/setup-bin/workflows/build-test/badge.svg)](https://github.com/supplypike/setup-bin/actions)

This action sets up a binary in \$PATH for use in actions

```yaml
steps:
  - uses: actions/checkout@v2
  - uses: supplypike/setup-bin@v1
    with:
      uri: 'https://github.com/docker/compose/releases/download/1.27.4/docker-compose-Linux-x86_64'
      name: 'docker-compose'
      version: '1.27.4'
```

You can also run install scripts:

```yaml
steps:
  - uses: actions/checkout@v2
  - uses: supplypike/setup-bin@v1
    with:
      uri: 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64-2.0.30.zip'
          name: 'aws'
          version: '2.0.30'
          command: sudo ./aws/install
```
