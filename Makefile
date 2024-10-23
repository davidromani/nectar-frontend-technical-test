# Variables
DOCKER = docker
DOCKER_COMPOSE = docker-compose
COMPOSE_FILE = docker-compose.yaml

# Commands
## Start the containers in detached mode
up:
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) up -d

## Stop and remove the containers
down:
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) down

## Build or rebuild the services
build:
	$(DOCKER_COMPOSE) -f $(COMPOSE_FILE) build

## Restart the services
restart: down up
