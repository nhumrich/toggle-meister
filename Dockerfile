FROM python:alpine

RUN apk --no-cache add curl-dev bash postgresql-dev \
    gcc make libffi-dev musl-dev musl-utils

COPY requirements.txt /app/
WORKDIR /app

RUN export PYCURL_SSL_LIBRARY=openssl && \
    pip3 install -r requirements.txt --user -U

COPY tmeister/static /app/tmeister/static

RUN apk --no-cache add nodejs git && \
    cd /app/tmeister/static && \
    npm install && \
    npm run build && \
    apk --no-cache del nodejs git && \
    rm -rf node_modules spec src bin &&  \
    cd /app

COPY . /app


EXPOSE 8445