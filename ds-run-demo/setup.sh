#!/bin/bash -xe
apt-get update
apt-get install -y libsm6 libxext6 libxrender-dev
pip3 install dotscience
pip3 install opencv-python
pip3 install scikit-image
