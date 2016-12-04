# use same ubuntu version as java container
FROM nginx

WORKDIR /

# portal.tar.gz obtained by tar'ing portal/ folder in usergrid distro
COPY portal.tar.gz /portal.tar.gz

RUN echo "+++ extract portal and install nginx conf" && \
  cd /usr/share/nginx/html && \
  tar zxf /portal.tar.gz --strip 1

EXPOSE 8081

COPY nginx.conf /etc/nginx/nginx.conf
COPY portal-site /etc/nginx/sites-enabled/portal

COPY run.sh /root/run.sh
CMD /root/run.sh
