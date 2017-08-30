FROM docker.neg/nginx:1.12-alpine

MAINTAINER by46 Benjamin.C.Yan@newegg.com

COPY dist /opt/dist/dfis-portal-vue

COPY app.conf /etc/nginx/conf.d
