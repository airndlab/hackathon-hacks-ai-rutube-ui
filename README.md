# TODO

Replace:

- `appName` with application name
- `appDescription` with application description.

Do `TODO` blocks and remove this block.

# appName

appDescription.

## Development

[//]: # (TODO: add links)

Install:

- node
- yarn

## Bootstrap CI/CD with GitHub Actions

### Create secrets

Use [official doc](https://docs.github.com/ru/actions/security-guides/using-secrets-in-github-actions#creating-secrets-for-a-repository).

```properties
YC_SERVICE_ACCOUNT_KEY_FILE={content of sa-key.json}
YC_CONTAINER_REGISTRY_ID={cr_id}
```

- `cr_id` - id of container registry from Yandex Cloud
- `sa-key.json` - authorized key of service account from Yandex Cloud
