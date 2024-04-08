# setup-bin

[![Actions Status](https://github.com/supplypike/setup-bin/workflows/build-test/badge.svg)](https://github.com/supplypike/setup-bin/actions)

This action sets up a binary in \$PATH for use in actions

```yaml
steps:
  - uses: actions/checkout@v4
  - uses: supplypike/setup-bin@v4
    with:
      uri: 'https://github.com/google/go-containerregistry/releases/download/v0.19.1/go-containerregistry_Linux_x86_64.tar.gz'
      name: 'crane'
      version: '0.19.1'
```

You can also run install scripts:

```yaml
steps:
  - uses: actions/checkout@v4
  - uses: supplypike/setup-bin@v4
    with:
      uri: 'https://awscli.amazonaws.com/awscli-exe-linux-x86_64-2.0.30.zip'
          name: 'aws'
          version: '2.0.30'
          command: sudo ./aws/install
```
