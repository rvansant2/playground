FROM ubuntu:14.04
MAINTAINER rvansant2 "rvansant2@gmail.com"
# Install nginx
RUN apt-get update
RUN apt-get -y upgrade
RUN apt-get -y install nginx
RUN echo "daemon off;" >> /etc/nginx/nginx.conf
RUN mv /etc/nginx/sites-available/default /etc/nginx/sites-available/default.bak
COPY build/nginx-sites-available-default /etc/nginx/sites-available/default

# install PHP
RUN apt-get -y install php5-common php5-curl php5-intl php5-imagick php5-gd php5-mcrypt php5-memcache php5-fpm php5-mysql php5-cli curl git
COPY build/fpm-php-ini /etc/php5/fpm/php.ini
COPY build/fpm-php-conf /etc/php5/fpm/php-fpm.conf
COPY build/fpm-www-conf /etc/php5/fpm/pool.d/www.conf
COPY docroot/*.* /usr/share/nginx/html/
RUN sed -i s/\;cgi\.fix_pathinfo\s*\=\s*1/cgi.fix_pathinfo\=0/ /etc/php5/fpm/php.ini
# install Composer
RUN curl -sS https://getcomposer.org/installer | sudo php -- --install-dir=/usr/local/bin --filename=composer

# add volumes for debug and file manipulation
VOLUME ["/var/log/", "/usr/share/nginx/html/"]

EXPOSE 80

CMD service php5-fpm start && nginx