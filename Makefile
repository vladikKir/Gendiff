install:
	npm ci
test:
	npm test
lint:
	npx eslint .
test-coverage:
	npx jest --coverage

