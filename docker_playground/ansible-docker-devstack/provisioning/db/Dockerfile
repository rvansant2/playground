FROM ubuntu:14.04
MAINTAINER rvansant2 "rvansant2@gmail.com"

RUN apt-get update
RUN apt-get -y upgrade
# set mysql password
COPY build/mysqlpasswd /root/mysqlpasswd
RUN debconf-set-selections /root/mysqlpasswd

RUN apt-get -y install mysql-client mysql-server

ADD build/my.cnf    /etc/mysql/my.cnf
RUN sed -i -e"s/^bind-address\s*=\s*127.0.0.1/bind-address = 0.0.0.0/" /etc/mysql/my.cnf

RUN /usr/sbin/mysqld & \
    sleep 10s &&\
    echo "GRANT ALL ON *.* TO admin@'%' IDENTIFIED BY 'mysql1' WITH GRANT OPTION; FLUSH PRIVILEGES" | mysql -u root --password=mysql1 &&\
    echo "create database test" | mysql -u root --password=mysql1

EXPOSE 3306

RUN /bin/bash -c "/usr/bin/mysqld_safe &"

CMD service mysql start