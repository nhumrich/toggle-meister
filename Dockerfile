FROM python:alpine

# compile requirements for some python libraries
RUN apk --no-cache add curl-dev bash postgresql-dev \
    gcc make libffi-dev musl-dev musl-utils

# install python reqs
COPY requirements.txt /app/
WORKDIR /app

RUN export PYCURL_SSL_LIBRARY=openssl && \
    pip3 install -r requirements.txt --user -U


# build frontend
COPY tmeister/static /app/tmeister/static
RUN apk --no-cache add nodejs git && \
    cd /app/tmeister/static && \
    npm install && \
    npm run postinstall && \
    npm run build && \
    apk --no-cache del nodejs git && \
    rm -rf node_modules spec src bin &&  \
    cd /app


EXPOSE 8445
COPY . /app