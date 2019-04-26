#!/bin/bash
docker build -t quay.io/dotmesh/dotscience-tensorflow-opencv:19.02-py3 .
docker push quay.io/dotmesh/dotscience-tensorflow-opencv:19.02-py3
