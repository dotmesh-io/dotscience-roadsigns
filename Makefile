
IMAGE_NAME=quay.io/dotmesh/dotscience-roadsigns
IMAGE_TAG=latest

APP_NAME=roadsigns-app

clean:
	docker stop $(APP_NAME) || true && docker rm $(APP_NAME) || true

run: clean
	cd app && docker build -t $(IMAGE_NAME):$(IMAGE_TAG) . && docker run -d --name $(APP_NAME) -p 8888:80 $(IMAGE_NAME):$(IMAGE_TAG)

image:
	docker login -u ${QUAY_USER} -p ${QUAY_PASSWORD} quay.io
	cd app && docker build -t $(IMAGE_NAME):$(IMAGE_TAG) .
	docker push $(IMAGE_NAME):$(IMAGE_TAG)