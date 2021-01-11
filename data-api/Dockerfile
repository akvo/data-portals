FROM python:3.8.3-slim-buster

WORKDIR /usr/src/app/

RUN set -ex; apt-get update && \
    apt-get install -y --no-install-recommends --no-install-suggests \
    curl

# Install Poetry
RUN curl -sSL https://raw.githubusercontent.com/python-poetry/poetry/master/get-poetry.py | POETRY_HOME=/opt/poetry python && \
    cd /usr/local/bin && \
    ln -s /opt/poetry/bin/poetry && \
    poetry config virtualenvs.create false

COPY ./pyproject.toml ./poetry.lock* ./

ARG INSTALL_DEV=false

RUN pip install --upgrade pip

RUN bash -c "if [ $INSTALL_DEV == 'true' ] ; then pip install ipython ; fi"

RUN bash -c "if [ $INSTALL_DEV == 'true' ] ; then poetry install --no-root ; else poetry install --no-root --no-dev ; fi"

COPY . .

CMD ["./start.sh"]
