clear:
	rm -rf ./js-dist

dev: clear
	./node_modules/webpack/bin/webpack.js --watch

prod: clear

	NODE_ENV=production npm run production
	git add .
	git commit . -m "build version"
	git tag -a v$(shell cat version.txt) -m "new release"
	git push
	git push origin v$(shell cat version.txt)
