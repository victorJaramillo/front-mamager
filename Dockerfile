FROM node:lts AS node-builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build --prod


FROM nginx as prod-stage
COPY --from=node-builder /app/dist/* /usr/share/nginx/html
COPY ./nginx-conf/nginx-custom.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]