#!/bin/bash
docker build -t quay.io/dotmesh-io/dotscience-tensorflow-opencv:19.02-py3 .
docker push quay.io/dotmesh-io/dotscience-tensorflow-opencv:19.02-py3
