install:
	@echo "Installing dependencies..."
	npm install

dev:
	@echo "Starting development server..."
	npm run dev

build:
	@echo "Building the app..."
	npm run build

docker-build:
	@echo "Building Docker image..."
	docker-compose build

docker-up:
	@echo "Starting Docker container..."
	docker-compose up -d

docker-down:
	@echo "Stopping Docker container..."
	docker-compose down
