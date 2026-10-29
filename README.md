# apprentice-tests

HTTP checks for the apprentice exercise web app, packaged as a GitHub Action.

```yaml
- uses: liatrio/apprentice-tests@main
  with:
    url: http://172.17.0.1:80/
```

Requires Node 20 or later on the runner.

## Running locally

```sh
node example/server.mjs &
APP_URL=http://localhost:8080/ node run-tests.mjs
```
