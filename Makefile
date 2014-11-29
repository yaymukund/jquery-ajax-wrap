.PHONY: all build lint setup

broccoli = ./node_modules/broccoli-cli/bin/broccoli
jshint = ./node_modules/jshint/bin/jshint

all: lint build

build:
	rm -rf dist
	$(broccoli) build dist

lint:
	$(jshint) lib

setup:
	npm install
