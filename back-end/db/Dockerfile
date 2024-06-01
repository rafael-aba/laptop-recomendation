FROM mcr.microsoft.com/mssql/server:2017-CU17-ubuntu

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app

RUN chmod +x /usr/src/app/run-initialization.sh

ENV SA_PASSWORD SenhaForteParaNinguemQuebrarNaSorte
ENV ACCEPT_EULA Y
ENV MSSQL_PID Express

EXPOSE 1433

CMD /bin/bash ./entrypoint.sh