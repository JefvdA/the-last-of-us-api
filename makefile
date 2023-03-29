.DEFAULT_GOAL := help

.PHONY: help
help: ## Show this help menu
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-30s\033[0m %s\n", $$1, $$2}'

node_modules: ## (Re)install node modules
	@rm node_modules -r -f
	@docker-compose run --rm node-sidecar

start: ## Create and start all the docker containers
	@docker-compose up -d

stop: ## Stop and remove all the docker containers
	@docker-compose down

logs: ## Show and track all logs from the API container
	@docker-compose logs -f node-dev

shell: ## Open a shell in the API container (needs to be running)
	@docker-compose exec node-dev sh