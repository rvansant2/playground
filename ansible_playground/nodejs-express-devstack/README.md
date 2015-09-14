NodeJS Express Devstack
============
## This is a full JavaScript devstack. ##
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
====================================
- NodeJS v0.10.25
- Express
- MongoDB
- Gulp
- Sass

## Run ##
====================================

- Clone repo using `git clone ...` command
- Go into the repo directory via `cd nodejs-express-devstack`
- Then run `vagrant up` or you can run `./scripts/rebuild_server.sh`
- Go to vagrant via `vagrant ssh` and check stack `node -v`, `mongo --version`, `gulp -v`, `sass -v`, `ruby -v`

## Additional features ##
====================================
- Bootstrap sytem script to add listed "Requirements" above
- Add default database and possible seeding