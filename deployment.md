# Deploying Toggle Meister

Canopy currently runs toggle meister in production, and at the end of this readme is an example kubernetes deployment yaml.

If you are running outside of kubernetes, there are a couple key things you will need.

1) A postgres database
2) a google oauth key-pair


## Postgres

This project has been tested on postgres 10+. It should be safe to run on 9.5+
You will need to provide the following environment variables to toggle meister:

```
DATABASE_URL
DATABASE_USER
DATABASE_PASS
DATABASE_DB_NAME
```

## Google oauth key-pair


This project uses google auth for authentication. It currently doesn't support anything else,
but you could pull request another method for authentication if you have a need.

You can get the oauth credentials via the google cloud console: https://console.cloud.google.com/apis/credentials

Then provide the following environment variables:

GOOGLE_ID
GOOGLE_SECRET
GOOGLE_ORG


# Supported environment variables

Toggle meister supports the following environment variables for configuration

```
DEBUG = whether the service should run in debug mode
IS_LOCAL = Marking the service as local, this bypases authentication
GOOGLE_ID = google oauth client id
GOOGLE_SECRET = google oauth secret key
GOOGLE_ORG = the gsuite organization all users need to be apart of for access
COOKIE_NAME = The name of the cookie in the browser. Default is tmeister-auth.
COOKIE_KEY = The cookie key that cookies are signed with. Can be a random string
DATABASE_URL = URL of the postgres database
DATABASE_USER = Username for logging into the database
DATABASE_PASS = password for logging into the database
DATABASE_DB_NAME = name of the postgres database. defaults to 'postgres'
DATABASE_MIN_POOL_SIZE = Minimum number of connections to hold onto for the database. defaults to 2
DATABASE_MAX_POOL_SIZE = Maximum number of connections to hold onto for the database. defaults to 4
SENTRY_URL = sentry DSN if you want errors to be sent to sentry
ENV_NAME = environment name for logs (useful only if you have more than one toggle meister and events go to sentry)
SKIP_MIGRATIONS = True or False, if True, then migrations will not be ran automatically at startup
DATABASE_MIGRATION_USER = username for running database migrations
DATABASE_MIGRATION_PASS = password for running database migrations
SLACK_WEBHOOK_URL = webhook URL for slack notifications on stale toggles
SLACK_CHANNEL = slack channel for notifications. Defaults to the setting in slack when you setup the webhook
SLACK_USERNAME = username slack notifications show up as. Defaults to the setting in slack when you setup the webhook
SLACK_REMINDER_DAY = Day to send slack reminders. Defaults to 'wednesday'
SLACK_REMINDER_TIME = Time that slack reminders go out. Defaults to '16:00'
ICON_URL = URL for the logo that slack shows on messages. Defaults to the setting in slack when you setup the webhook
```

# Running Toggle meister

Other than setting the above environment variables, there are two pieces to toggle meister,
the web-tier and the cron-tier. The cron tier is needed for rolling deployments and slack "shaming".

The webtier is ran by running the `startup.sh` file, and the worker is ran by running the `cron.sh` file.

`startup.sh` is the default docker startup, but for the cron tier you will need to override the command with `tini cron.sh`

The first time you run toggle meister or upgrade it, you will need to run a database migration which you can do by execing into the container and running:

```
alembic upgrade head
```

or you can just set the envvar `SKIP_MIGRATIONS` to False, and they will run at startup everytime.

You can reference the cnpy-deployment.yaml file for all settings we set in production. This file is somewhat specific to canopy, but the main ideas should be there.

# Example kubernetes yaml

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  annotations:
    deployment.kubernetes.io/revision: "83"
    kubernetes.io/change-cause: 'canopy-k8s-auto-deploy on toggle-meister with image:
      canopytax/toggle-meister:be16ac5c6d2959e40b2d5f0c29153f568adb331b'
  creationTimestamp: "2018-02-26T19:53:35Z"
  generation: 227
  labels:
    app: toggle-meister
    squad: black
    stack: python
    web: "true"
  name: toggle-meister
  namespace: stage
  resourceVersion: "18126039"
  selfLink: /apis/extensions/v1beta1/namespaces/stage/deployments/toggle-meister
  uid: bb2f5376-1b2e-11e8-b0f0-06f0d5d2d2dc
spec:
  progressDeadlineSeconds: 2147483647
  replicas: 3
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: toggle-meister
      squad: black
      stack: python
      web: "true"
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
    type: RollingUpdate
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: toggle-meister
        squad: black
        stack: python
        web: "true"
    spec:
      affinity:
        podAntiAffinity:
          preferredDuringSchedulingIgnoredDuringExecution:
          - podAffinityTerm:
              labelSelector:
                matchExpressions:
                - key: app
                  operator: In
                  values:
                  - toggle-meister
              topologyKey: kubernetes.io/hostname
            weight: 100
      containers:
      - env:
        - name: DATADOG_HOST
          valueFrom:
            fieldRef:
              apiVersion: v1
              fieldPath: spec.nodeName
        - name: NODE_NAME
          valueFrom:
            fieldRef:
              apiVersion: v1
              fieldPath: spec.nodeName
        - name: GOOGLE_ORG
          value: canopytax.com
        - name: DATABASE_MAX_POOL_SIZE
          value: "12"
        - name: DATABASE_USER
          value: tmeister_app
        - name: DATABASE_DB_NAME
          value: tmeisterdb
        - name: SKIP_MIGRATIONS
          value: "True"
        - name: ENV_LOCATION
          value: stage
        - name: COOKIE_NAME
          value: canopytogglemeister
        - name: CANOPY_HASH
          value: 9099c95d-c188-4e7a-bf70-edaaebac861c
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              key: database_hostname
              name: tmeister
        - name: DATABASE_PASS
          valueFrom:
            secretKeyRef:
              key: database_password
              name: tmeister
        - name: GOOGLE_ID
          valueFrom:
            secretKeyRef:
              key: google_id
              name: tmeister
        - name: GOOGLE_SECRET
          valueFrom:
            secretKeyRef:
              key: google_secret
              name: tmeister
        - name: COOKIE_KEY
          valueFrom:
            secretKeyRef:
              key: cookie_key
              name: tmeister
        - name: SENTRY_URL
          valueFrom:
            secretKeyRef:
              key: sentry_dsn
              name: tmeister
        - name: SLACK_WEBHOOK_URL
          valueFrom:
            secretKeyRef:
              key: slack_webhook_url
              name: tmeister
        image: canopytax/toggle-meister:be16ac5c6d2959e40b2d5f0c29153f568adb331b
        imagePullPolicy: Always
        lifecycle:
          preStop:
            exec:
              command:
              - sleep
              - "10"
        livenessProbe:
          failureThreshold: 3
          httpGet:
            path: /heartbeat
            port: 8445
            scheme: HTTP
          initialDelaySeconds: 30
          periodSeconds: 5
          successThreshold: 1
          timeoutSeconds: 10
        name: toggle-meister
        ports:
        - containerPort: 8445
          protocol: TCP
        readinessProbe:
          failureThreshold: 3
          httpGet:
            path: /heartbeat
            port: 8445
            scheme: HTTP
          initialDelaySeconds: 20
          periodSeconds: 10
          successThreshold: 1
          timeoutSeconds: 10
        resources: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
        volumeMounts:
        - mountPath: /secrets
          name: keys
          readOnly: true
      dnsPolicy: ClusterFirst
      imagePullSecrets:
      - name: dockerhubkey
      nodeSelector:
        web-tier: "true"
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
      volumes:
      - name: keys
        secret:
          defaultMode: 420
          items:
          - key: publickey
            path: canopycert.der
          secretName: authkeys
status:
  availableReplicas: 3
  conditions:
  - lastTransitionTime: "2019-04-25T20:26:17Z"
    lastUpdateTime: "2019-04-25T20:26:17Z"
    message: Deployment has minimum availability.
    reason: MinimumReplicasAvailable
    status: "True"
    type: Available
  observedGeneration: 227
  readyReplicas: 3
  replicas: 3
  updatedReplicas: 3

---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  annotations:
    deployment.kubernetes.io/revision: "51"
    kubernetes.io/change-cause: 'canopy-k8s-auto-deploy on toggle-meister-worker with
      image: canopytax/toggle-meister:be16ac5c6d2959e40b2d5f0c29153f568adb331b'
  creationTimestamp: "2019-04-17T21:58:44Z"
  generation: 143
  labels:
    app: toggle-meister-worker
    squad: black
    stack: python
    worker: "true"
  name: toggle-meister-worker
  namespace: stage
  resourceVersion: "18611177"
  selfLink: /apis/extensions/v1beta1/namespaces/stage/deployments/toggle-meister-worker
  uid: f7f9a40e-615b-11e9-a967-063ca6569d58
spec:
  progressDeadlineSeconds: 2147483647
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: toggle-meister-worker
      squad: black
      stack: python
      worker: "true"
  strategy:
    rollingUpdate:
      maxSurge: 1
      maxUnavailable: 0
    type: RollingUpdate
  template:
    metadata:
      creationTimestamp: null
      labels:
        app: toggle-meister-worker
        squad: black
        stack: python
        worker: "true"
    spec:
      containers:
      - command:
        - tini
        - ./cron.sh
        env:
        - name: DATADOG_HOST
          valueFrom:
            fieldRef:
              apiVersion: v1
              fieldPath: spec.nodeName
        - name: NODE_NAME
          valueFrom:
            fieldRef:
              apiVersion: v1
              fieldPath: spec.nodeName
        - name: GOOGLE_ORG
          value: canopytax.com
        - name: DATABASE_MAX_POOL_SIZE
          value: "12"
        - name: DATABASE_USER
          value: tmeister_app
        - name: DATABASE_DB_NAME
          value: tmeisterdb
        - name: SKIP_MIGRATIONS
          value: "True"
        - name: ENV_LOCATION
          value: stage
        - name: COOKIE_NAME
          value: canopytogglemeister
        - name: CANOPY_HASH
          value: 8dcf2307-b99a-4879-b146-f07da75c7d68
        - name: DATABASE_URL
          valueFrom:
            secretKeyRef:
              key: database_hostname
              name: tmeister
        - name: DATABASE_PASS
          valueFrom:
            secretKeyRef:
              key: database_password
              name: tmeister
        - name: GOOGLE_ID
          valueFrom:
            secretKeyRef:
              key: google_id
              name: tmeister
        - name: GOOGLE_SECRET
          valueFrom:
            secretKeyRef:
              key: google_secret
              name: tmeister
        - name: COOKIE_KEY
          valueFrom:
            secretKeyRef:
              key: cookie_key
              name: tmeister
        - name: SENTRY_URL
          valueFrom:
            secretKeyRef:
              key: sentry_dsn
              name: tmeister
        - name: SLACK_WEBHOOK_URL
          valueFrom:
            secretKeyRef:
              key: slack_webhook_url
              name: tmeister
        image: canopytax/toggle-meister:be16ac5c6d2959e40b2d5f0c29153f568adb331b
        imagePullPolicy: Always
        lifecycle:
          preStop:
            exec:
              command:
              - sleep
              - "10"
        name: toggle-meister-worker
        resources: {}
        terminationMessagePath: /dev/termination-log
        terminationMessagePolicy: File
        volumeMounts:
        - mountPath: /secrets
          name: keys
          readOnly: true
      dnsPolicy: ClusterFirst
      imagePullSecrets:
      - name: dockerhubkey
      nodeSelector:
        worker-tier: "true"
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 120
      volumes:
      - name: keys
        secret:
          defaultMode: 420
          items:
          - key: publickey
            path: canopycert.der
          secretName: authkeys
status:
  availableReplicas: 1
  conditions:
  - lastTransitionTime: "2019-07-03T16:00:04Z"
    lastUpdateTime: "2019-07-03T16:00:04Z"
    message: Deployment has minimum availability.
    reason: MinimumReplicasAvailable
    status: "True"
    type: Available
  observedGeneration: 143
  readyReplicas: 1
  replicas: 1
  updatedReplicas: 1

```