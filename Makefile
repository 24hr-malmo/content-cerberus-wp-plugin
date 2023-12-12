clear:
	rm -rf ./js-dist

dev: clear
	./node_modules/webpack/bin/webpack.js --watch

prod: clear

	NODE_ENV=production npm run production
	git add .
	git commit . -m "build version"
	git tag -a v$(VERSION) -m "new release"
	git push origin v$(VERSION)
