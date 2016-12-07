FROM nginx

COPY dev-build/ /usr/share/nginx/html/
COPY nginx.conf /etc/nginx/nginx.conf
COPY front-site /etc/nginx/sites-enabled/front

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"]
