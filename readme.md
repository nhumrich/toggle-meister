# Toggle Meister!

## current endpoints

`http :8445/api/envs/Production/toggles`

`http :8445/api/toggles`

`http PATCH :8445/api/toggles toggle:='{"env": "Production", "feature": "foo", "state": "ON"}'`

`http :8445/api/features`

`http POST :8445/api/features name=test_feature`

`http DELETE :8445/api/features/test_feature`

`http :8445/api/envs`

`http POST :8445/api/envs name=my_env`

`http DELETE :8445/api/envs/my_env`
