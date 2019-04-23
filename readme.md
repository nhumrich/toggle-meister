# Toggle Meister!

![logo](https://raw.githubusercontent.com/canopytax/toggle-meister/master/ToggleLogo.png)

Toggle-Meister is a Feature toggle service gone awesome.

Why Feature toggles as a service? When you have many micro services,
sometimes a feature touches multiple services at a time.
A single source of truth is needed so that features can be released
all at once across services.

The main goal of this project is to provide a feature-toggle service
that doesnt suck by focusing on a couple key principles

* Do not allow customer based toggles
 * Customer toggles get out of hand and create an impossible test scenario
 * Toggles can only be switched on/off per environment, not per person
* Toggles must be short lived. 
 * After a toggle is stable on production it needs to be removed from the codebase

A stretch goal of this project is also to provide "rolling releases" 
of features, a percentage of the users at a time.

## Running

The easiest way to run is run

```
docker-compose up
```

If you have already ran it before, and there are some changes,
you might have to type

```
docker-compose build
docker-compose up
```


## current endpoints

`http :8445/api/envs/production/toggles`

`http :8445/api/toggles`

`http PATCH :8445/api/toggles toggle:='{"env": "production", "feature": "foo", "state": "ON"}'`

`http :8445/api/features`

`http POST :8445/api/features name=test_feature`

`http DELETE :8445/api/features/test_feature`

`http :8445/api/envs`

`http POST :8445/api/envs name=my_env`

`http DELETE :8445/api/envs/my_env`

`http :8445/api/auditlog`
