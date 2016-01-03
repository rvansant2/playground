#!/usr/bin/env bash

BLUE='\033[0;34m'
YELLOW='\033[0;33m'
GREEN='\033[1;32m'
RED='\033[0;31m'
NC='\033[0m' # Show no Color

function log_info {
    echo -e "\n${GREEN}Info: ${1}${NC}"
}

function log_error {
    echo -e "\n${RED}Error: ${1}${NC}"
}

function log_warn {
    echo -e "\n${YELLOW}Warning: ${1}${NC}"
}

function prompt {
    echo -en "\n${BLUE}${1}${NC}"
    read
}

function PROJECT_NAME {
  # Grab project Name from Vagrantfile
  project_name_regex='project_name = "([^"]*)"'
  [[ $(cat Vagrantfile) =~ $project_name_regex ]]
  echo "${BASH_REMATCH[1]}"
}

# Params:
#   url ending in dmg name
function strip_url {
  echo $( sed "s/^.*\///" <(echo "${1}"))
}

# Params:
#   dmg file path
#   varaible for return volume path
function attach_volume {
  log_info "Attaching ${1}"
  volume="$(sudo hdiutil attach "${1}" | grep "Volumes" | cut -f 3- )"
  eval "${2}=\"${volume}\""
  log_info "\tAttached to ${volume}"
}

# Params:
#   volume path
function detach_volume {
  log_info "Detaching ${1}"
  sudo hdiutil detach "${1}" >> /dev/null
  log_info "\tDetached"
}
# Params:
#   volume path
#   pkg file name
function install_pkg {
  log_info "Installing '${1}/${2}'. Do not run the .pkg file that may pop up."
  sudo installer -pkg "${volume}/${2}" -target / >> /dev/null
  log_info "\tInstalled ${2}"
}

# Params:
#   dmg file path
#   pkg file name
function install_dmg {
  volume_path=''

  attach_volume "${1}" volume_path
  install_pkg "${volume_path}" ${2}
  detach_volume "${volume_path}"
}

function vercomp () {
    if [[ $1 == $2 ]]
    then
        echo 0
        return
    fi
    local IFS=.
    local i ver1=($1) ver2=($2)
    # fill empty fields in ver1 with zeros
    for ((i=${#ver1[@]}; i<${#ver2[@]}; i++))
    do
        ver1[i]=0
    done
    for ((i=0; i<${#ver1[@]}; i++))
    do
        if [[ -z ${ver2[i]} ]]
        then
            # fill empty fields in ver2 with zeros
            ver2[i]=0
        fi
        if ((10#${ver1[i]} > 10#${ver2[i]}))
        then
            echo 1
            return
        fi
        if ((10#${ver1[i]} < 10#${ver2[i]}))
        then
            echo 2
            return
        fi
    done
    echo 0
}

function run_script () {
  local path=$1
  echo -e "\tRunning $(basename $path)"
  source $path
}



####### TESTS for helpers.sh
#tests
#log_info "test info"
#log_error "test error"
#log_warn "test warning"
#prompt "Press enter to continue..."