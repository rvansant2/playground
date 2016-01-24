[ ![Codeship Status for rvansant2/unicorn-nodeapp](https://codeship.com/projects/184dc6b0-a563-0132-c797-6e676e1a86e3/status?branch=master)](https://codeship.com/projects/66673)

NodeJS Express Devstack
============
## This is a full JavaScript devstack. ##
-------------------
 - Requirements:
    - Ansible [Install](https://docs.ansible.com/ansible/intro_installation.html)
    - Vagrant [Download](https://www.vagrantup.com/downloads.html)
    - Ruby
        ..* [Ruby](http://victorleungtw.com/ruby-gems/)
        ⋅⋅* berkshelf `gem install berkshelf`
        ⋅⋅* vagrant-berkshelf `gem install berkshelf`
        ⋅⋅* vagrant-hostmanager `gem install vagrant-hostmanager`
 - Provisioned devstack by Ansible on a Vagrant
 - Provisioning specs are listed below.
   - No templating has been set, but you could use Jade, Hogan or EJS, just modify the package.json and run "npm install"
   - ReactJS could be used as well

# Devstack setup #
-------------------
- NodeJS v0.10.25
- Express
- MongoDB (2.6.9 or 3.0.6)
- Gulp
- Sass
- rvm to upgrade ruby version
- WebPack (coming soon)
- ReactJS (coming soon)

## Run ##
-------------------
- Clone repo using `git clone ...` command
- Go into the repo directory via `cd nodejs-express-devstack`
- Then run `vagrant up` or you can run `./scripts/rebuild_server.sh`
- Go to vagrant via `vagrant ssh` and check stack `node -v`, `mongo --version`, `gulp -v`, `sass -v`, `ruby -v`

## Additional features ##
-------------------
- Bootstrap sytem script to add listed "Requirements" above - see [bootstrap script](https://github.com/rvansant2/playground/tree/master/scripts_playground/bash_playground/macos_devtools_bootstrap)
- Add default database and possible seeding

## Todo ##
-------------------
- Upgrade nodejs version to option 4.x/5.x
- Add support for Hapi and possibly Koa

## Updated ##
-------------------
- Updated code to work on Ansible 2.0, also works with Ansible 1.9.1 or lower - refer to comments in devstack.yml
