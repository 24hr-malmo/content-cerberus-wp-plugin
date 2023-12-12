clear:
	rm -rf ./js-dist

dev: clear
	./node_modules/webpack/bin/webpack.js --watch

prod: clear

	NODE_ENV=production npm run production
	git add .
	git commit . -m "build version"
	git push
	git tag -a v$(shell cat version.txt) -m "new release"
	git push origin v$(shell cat version.txt)
