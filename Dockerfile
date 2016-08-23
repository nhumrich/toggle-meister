FROM canopytax/python-base

RUN apk --update add nodejs && \
    cd /app/tmeister/static && \
    npm install && \
    npm run build && \
    apk del nodejs && \
    cd /app && \
    rm -rf /var/cache/apk/*


EXPOSE 8445