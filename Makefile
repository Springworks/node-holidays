default: lint

.PHONY: lint
lint:
	gjslint -r . --strict --max_line_length 100 -e ".idea, coverage, node_modules"
