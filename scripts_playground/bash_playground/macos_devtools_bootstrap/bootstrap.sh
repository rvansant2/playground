#!/usr/bin/env bash

# Scripts for Mac automation based off of the following blog post:
# https://www.moncefbelyamani.com/how-to-install-xcode-homebrew-git-rvm-ruby-on-mac/

. ./helpers.sh --source-only

install_command_line_tools() {
    if pkgutil --pkg-info=com.apple.pkg.CLTools_Executables &> /dev/null; then
        return
    fi
    log_info "Installing Command Line Tools (CLTools) for OS X"
    log_info "To install CLTools, click on the install button in dialogue."
    prompt "Press enter to continue..."

    xcode-select --install

    prompt "Press enter when installation is complete."

    if pkgutil --pkg-info=com.apple.pkg.CLTools_Executables &> /dev/null; then
        log_info "Done with the installation of CLTools."
    else
        log_error "CLTools was not found."
    fi
}

install_homebrew() {
    log_info "Checking if Homebrew is installed..."
    if ! hash brew &> /dev/null; then
        log_info "Installing Homebrew..."
        (cd ~; log_info "" | ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)" &> /dev/null)
        log_info "Done with installing Homebrew."
    fi

    log_info "Running doctor and updating Homebrew packages."
    brew doctor &> /dev/null
    brew update &> /dev/null
}

install_virutal_box() {
    if hash vboxmanage &> /dev/null; then
        VIRTBOX_VERSION_FULL=$( cd ~; vboxmanage --version)
        VIRTBOX_VERSION=${VIRTBOX_VERSION_FULL:0:6}
    fi
    VIRTBOX_VERSION_MINIMUM=$(cat .virtualbox-version)

    if hash vboxmanage &> /dev/null && (( $(vercomp $VIRTBOX_VERSION $VIRTBOX_VERSION_MINIMUM) < 2)); then
        return
    fi

    if hash vboxmanage &> /dev/null; then
        log_error "Your VirtualBox is out of date."
    else
        log_error "VirtualBox is not installed."
    fi

    prompt "Please install VirtualBox version $VIRTBOX_VERSION_MINIMUM or greater\n\tPress enter to open download VirtualBox page..."

    open "https://encrypted.google.com/search?hl=en&q=virtualbox+version+$VIRTBOX_VERSION_MINIMUM#hl=en&q=virtualbox+download+version&btnI=745"

    prompt "Once installed, press enter to continue..."

    if hash vboxmanage &> /dev/null && (( $(vercomp $VIRTBOX_VERSION $VIRTBOX_VERSION_MINIMUM) < 2)); then
        log_info "Done installing VirtualBox."
    else
        log_error "VirtualBox version $VIRTBOX_VERSION_MINIMUM or greater was not installed."
        exit 1
    fi
}

install_vagrant() {
  VAGRANT_VERSION=$( cd ~; vagrant --version 2> /dev/null | awk '{ print $2 }')
  VAGRANT_VERSION_MINIMUM=$(cat .vagrant-version)
  if hash vagrant &> /dev/null && (( $(vercomp $VAGRANT_VERSION $VAGRANT_VERSION_MINIMUM) < 2 )); then
    return
  fi

  local vagrant_url="https://releases.hashicorp.com/vagrant/$VAGRANT_VERSION_MINIMUM/vagrant_$VAGRANT_VERSION_MINIMUM.dmg"
  local vagrant_dmg=$( strip_url "${vagrant_url}" )
  local vagrant_pkg="Vagrant.pkg"

  log_info "Installing Vagrant"

  log_info "Downloading Vagrant"
  curl -sOL "$vagrant_url"

  local vagrant_path=''

  attach_volume "${vagrant_dmg}" vagrant_path

  if hash vagrant &> /dev/null; then
    log_info "Uninstalling previous Vagrant"
    echo -e "Yes\n\n" | "${vagrant_path}/uninstall.tool" >> /dev/null
  fi
  rm -rf "${HOME}/.vagrant.d"

  install_pkg "${vagrant_path}" "${vagrant_pkg}"
  detach_volume "${vagrant_path}"

  rm -f "${vagrant_dmg}"

  log_info "Done installing Vagrant"
}

install_ruby_dependencies() {
    RUBY_VERSION_MINIMUM=$(cat .ruby-version)
    if ! hash rvm &> /dev/null; then
        log_info "Installing rvm (ruby version manager)..."
        echo "gem: --no-document" >> ~/.gemrc
        curl -L https://get.rvm.io | bash -s stable --auto-dotfiles --autolibs=enable --ruby
    fi

    rvm install $RUBY_VERSION_MINIMUM &> /dev/null
    log_info "sourcing bash_profile and rvm command"
    source ~/.bash_profile
    source ~/.rvm/scripts/rvm
    rvm use $RUBY_VERSION_MINIMUM --default
    log_info "Installing and setting ruby (version $RUBY_VERSION_MINIMUM) as default"

    if ! hash bundle &> /dev/null; then
    log_info "Installing bundler"
    gem install bundler &> /dev/null
  fi

  log_info "Making sure gems are up to date."
  bundle install &> /dev/null
}


install_vagrant_berkshelf() {
    if vagrant plugin list | grep "vagrant-berkshelf" &> /dev/null; then
        return
    fi

    log_info "Installing Vagrant Berkshelf"

    vagrant plugin install vagrant-berkshelf &> /dev/null
    log_info "Done installing Vagrant Berkshelf"
}

install_vagrant_hostmanager() {
    if vagrant plugin list | grep "vagrant-hostmanager" &> /dev/null; then
        return
    fi

    log_info "Installing Vagrant Hostmanager"

    vagrant plugin install vagrant-hostmanager &> /dev/null
    log_info "Done installing Vagrant Hostmanager"
}

install_node() {
    NODE_VERSION=$(cat .node-version)
    if ! hash nvm &> /dev/null; then
        log_info "Installing nvm (node version manager)..."
        brew install nvm

        echo "source $(brew --prefix nvm)/nvm.sh" >> ~/.bash_profile
    fi

    if hash nvm &> /dev/null; then
        log_info "Done with installing nvm."
    fi

    nvm install -s v$NODE_VERSION &> /dev/null
}

install_git() {
    if hash git &> /dev/null; then
        return
    fi
    log_info "Installing git..."
    brew install git

    if hash git &> /dev/null; then
        log_info "Done with installing git."
    fi
}

install_ansible() {
    if hash ansible &> /dev/null; then
        return
    fi
    log_info "Installing ansible..."
    brew install ansible

    if hash ansible &> /dev/null; then
        log_info "Done with installing ansible."
    fi
}

#function test {
#    log_info "test info"
#    log_error "test error"
#    log_warn "test warning"
#    prompt "Press enter to continue..."
#    install_ruby
#}

main() {
    install_command_line_tools
    install_homebrew
    install_virutal_box
    install_vagrant
    install_ruby_dependencies
    install_vagrant_berkshelf
    install_vagrant_hostmanager
    install_git
    install_node
    install_ansible

#    test
}

main