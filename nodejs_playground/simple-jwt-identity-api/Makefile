clean_dirs = node_modules coverage npm-debug.log
node_env = development
services = api

tag = latest
opt = NODE_ENV=$(node_env) TAG=$(tag)
export opt
dcc = $(opt) docker-compose
.PHONY:	all	install	clean	distclean	TAGS	info	check
default: help

$(services): clean
	-$(dcc) build --force-rm $@
	-$(dcc) up --remove-orphans --force-recreate -d
clean:
	-@rm -rf $(clean_dirs)
	-@$(dcc) down
	-@$(dcc) rm --force
local:
	-$(dcc) up --remove-orphans --force-recreate -d
	-@npm install

help:
	@echo "Docker Compose Command Build tools"
	@echo "make"
	@echo "\tdefaults to 'make help'"
	@echo "make help"
	@echo "\tthis info"
	@echo "make api"
	@echo "\tbuilds and runs the 'api' service in docker-compose.yml"
	@echo "\tNote: also runs any defined linked services"
	@echo "make client"
	@echo "\tbuilds and runs the 'client' service in docker-compose.yml"
	@echo "\tNote: also runs any defined linked services"
	@echo "make local"
	@echo "\tbuilds and run using local nodejs and npm."
	@echo "\tNote: does NOT run any linked services (ex: mongodb)"
	@echo "make clean"
	@echo "\tremoves all build files and docker containers"
