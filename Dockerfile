FROM canopytax/python-base

RUN apk --no-cache add curl-dev && \
    export PYCURL_SSL_LIBRARY=openssl && \
    pip3 install -r requirements.txt --user -U

RUN apk --no-cache add nodejs && \
    cd /app/tmeister/static && \
    npm install && \
    npm run build && \
    apk del nodejs && \
    cd /app


EXPOSE 8445