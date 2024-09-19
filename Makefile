prepare:
	npm install
migrate:
	npm run migrator-v1
build:
	docker-compose build
dev:
	docker-compose up
stop:
	docker-compose stop
implode:
	docker-compose down -v
logs:
	docker-compose logs -f
start-prod:
	docker-compose -f docker-compose.prod.yml up
local-only-cleanup-database:
	npm run local-only-cleanup-database
	
.PHONY: prepare migrate build dev stop implode logs start-prod local-only-cleanup-database
