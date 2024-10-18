
install:
	npm install

run:
	npm run dev

build:
	npm run build

test-unit:
	npm run test:unit

test-e2e:
	npx cypress open

test-e2e-headless:
	npx cypress run

lint:
	npm run lint
