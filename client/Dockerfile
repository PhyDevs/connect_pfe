# Build Stage
from node:19-alpine AS build
WORKDIR /app

COPY package*.json .
RUN npm ci --silent

COPY . ./
RUN npm run build


# Serve Stage
FROM nginx:1.23.4-alpine AS final

COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
