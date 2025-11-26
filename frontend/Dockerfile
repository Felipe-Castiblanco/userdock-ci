FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d/
COPY html/ /usr/share/nginx/html/
COPY assets/ /usr/share/nginx/html/assets/

RUN chmod -R 755 /usr/share/nginx/html

ARG API_URL
ENV API_URL=$API_URL

RUN sed -i "s|__API_URL__|$API_URL|g" /usr/share/nginx/html/*.html \
    && sed -i "s|__API_URL__|$API_URL|g" /usr/share/nginx/html/assets/*.js

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
