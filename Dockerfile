FROM node:22-alpine

# Create app directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install production dependencies only
RUN npm install -g pnpm && pnpm install --prod

# Copy the compiled JavaScript files
COPY dist ./dist


EXPOSE 8080
CMD [ "node", "index.js" ]

USER node