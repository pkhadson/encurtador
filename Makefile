ifeq ($(APP_NAME_KEY),)
	include .dev/.env
endif

up:
	docker-compose -f src/devops/docker-compose.yml if [ $NODE_ENV==='dedvelopment' ];then --env-file .dev/.env;fi; up -d
run:
	docker-compose
test:
	docker exec -it encurtador_app npm run test