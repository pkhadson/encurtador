ifeq ($(APP_NAME_KEY),)
	include .dev/.env
endif

up:
	docker-compose -f src/devops/docker-compose.yml --env-file .dev/.env up -d
run:
	docker-compose
test:
	docker exec -it encurtador_app npm run test