redeploy:
	docker build -t lesson .
	heroku container:push web -a vodyanov-app
	heroku container:release web -a vodyanov-app
	heroku open	-a vodyanov-app

