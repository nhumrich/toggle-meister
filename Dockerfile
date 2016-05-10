from canopytax/alpine

RUN apk add --update \
    nodejs \
    postgresql-dev gcc python3-dev musl-dev \
    python3 && \
    python3 -m ensurepip && \
    rm -rf /var/cache/apk/*

RUN npm install -g nodemon
COPY . /app/
RUN python3 -m pip install -r /app/requirements.txt


EXPOSE 8445
WORKDIR /app
CMD ["sh", "startup.sh"]