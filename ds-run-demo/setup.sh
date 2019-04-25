#!/bin/bash -xe
apt-get update
apt-get install -y libsm6 libxext6 libxrender-dev
pip install dotscience
pip install opencv-python
pip install scikit-image
