# Toggle Meister!

![logo](https://raw.githubusercontent.com/canopytax/toggle-meister/master/ToggleLogo.png)

Toggle-Meister is a Feature toggle service that fights the man.

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

For running this service please see [deployment.md](/deployment.md)

## FAQ

* What is a feature toggle service?

A service that is the "source of truth" for if a service should be on or not.
The goal is to separate releases from deployments.

* Do you support environments? 

Yes, environments are an important part of a healthy pipeline. 
You can add as many environments as you want.

* What methods do you support for rolling out toggles?

There are only 4 states to a feature toggle. 
The feature is either on, off, in a rolling state or paused. On and off is pretty self explanatory,
rolling is a percentage rollout where the service rolls out the feature to a small percentage of users over time and ramps up to 100%.
Once a feature is at 100%, it's considered to be on. You can always go straight to ON at any time. 
Paused is a feature that is being rolled out, but you snooze the rollout for 48 hours. 
User id based rollouts is not and will likely never be supported. The idea is to "fight the man", and never
allow "customer based toggles", as it is a very bad practice. Other concepts for beta releases are worth discussing.

* How do rollouts work?

Phased rollouts use a hardcoded probability distribution, which is represented by the curve of "at 50% of time complete, 30% of the users have the feature".
This is represented in code by 24 distinct "points". These points are:
```
[1, 2, 3, 5, 8, 11, 14, 17, 20, 23, 26, 30, 35, 40, 45, 50, 55, 61, 67, 73, 79, 86, 93, 100]
```

The rollout increases every hour. In other words, this is the percentage you will get during each hour in a 24 hour period.
The user is able to set any number of "days", when doing a rollout. So this distribution is just stretched to the appropriate number of hours.
In other words, if you pick 14 days, there will simply be 14 hours in between every rollout increment. You will be on 1% for the first 14 hours.
The users are randomly selected based on `enrollment_id` passed in as a query string. If you do not provide the enrollment_id, then it is "off".
(The enrollment_id is saved, so once one user has it on, its always on)

* Can I "override" a toggle?

At Canopy, we use toggle overrides heavily for developing. We do this via client side logic however, and this service
doesn't actually support any type of authentication/overrides. In other words, it's not global.

## Running

The easiest way to run toggle meister is with docker-compose:

```
docker-compose up
```

If you have already ran it before, and there are some changes,
you might have to type

```
docker-compose build
docker-compose up
```

## client endpoints

To use this service, the only endpoint you really have to know about is this one:

`GET /api/envs/{environment}/toggles?feature={feature}`

This endpoint will tell you `true` or `false` for each toggle you want to know about. 
You can only get toggles for one environment at a time, and can list however many features you need.
For example, if you wanted to get the features `use_feature_toggles`, and the feature, `closed_source`,
 on the `production` environment you would make the following request:

`http mytoggleservice.example.com/api/envs/production/toggles?feature=use_feature_toggles&feature=open_source`.

You would get the following response:

```
{
    "open_source": false,
    "use_feature_toggles": true
}
```  

This endpoint requires no authentication at all. In order to support rolling releases, you will also need to include `enrollment_id={x}` in your query string.

There is also an endpoint to get release notes if you decide to use that feature:

`http mytoggleservice.example.com/api/envs/production/release_notes`

you would get the following response:

```
{
    "release_notes": [
        {
            "body": "Cool new feature!",
            "date": "2019-6-4",
            "feature": null,
            "id": 2,
            "title": "feature without toggle"
        },
        {
            "body": "Really sweet feature",
            "date": "2019-6-4",
            "feature": "open_source",
            "id": 1,
            "title": "that one thing"
        }
    ]
}
```

If you include the `enrollment_id` query string on this endpoint, it will include the release notes for features that are turned on for that enrollment id, much like the toggle api.

If you include the `all=true` query string on this endpoint, it will give you all features, making it so you dont have to specify which features you want.
Note that this will turn metrics off, and be slightly slower. 



## list of all current endpoints

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

`http :8445/api/metrics/myfeature`

`http :8445/api/release_notes`

`http :8445/api/envs/production/release_notes`

`http POST :8445/api/release_notes title=mynote body=awesome feature=test_feature`

`http PATCH :8445/api/release_notes/1 body='more awesome'`

`http DELETE :8445/api/release_notes/1`

`http :8445/api/employees`

`http PATCH :8445/api/employees/my.user name='new name' role=admin`
 
