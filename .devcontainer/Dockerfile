# .devcontainer/Dockerfile
FROM node:18-bullseye

# Adicionar repositório do MongoDB e instalar
RUN apt-get update && apt-get install -y gnupg curl
RUN curl -fsSL https://pgp.mongodb.com/server-6.0.asc | \
    gpg -o /usr/share/keyrings/mongodb-server-6.0.gpg --dearmor

RUN echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-6.0.gpg] http://repo.mongodb.org/apt/debian bullseye/mongodb-org/6.0 main" | \
    tee /etc/apt/sources.list.d/mongodb-org-6.0.list

# Instalar ferramentas essenciais
RUN apt-get update && apt-get install -y \
    git \
    curl \
    wget \
    vim \
    postgresql-client \
    mongodb-org-shell \
    mongodb-org-tools

WORKDIR /workspace