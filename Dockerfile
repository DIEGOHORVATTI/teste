# Use the official Bun image to build the app
FROM oven/bun:latest

# Set the working directory inside the container
WORKDIR /app

# Instalar curl apenas no Linux, não no macOS
RUN if [ "$(uname -s)" = "Linux" ]; then \
        apt-get update && apt-get install -y curl && rm -rf /var/lib/apt/lists/*; \
    fi

# Copy package.json and bun.lockb files first (for caching dependencies)
COPY package.json bun.lockb ./

# Install the dependencies
RUN bun install

# Copy the rest of your app's code
COPY . .

# Expose the port your app will run on
EXPOSE 3000

# Run the application
CMD ["bun", "run", "start"]
