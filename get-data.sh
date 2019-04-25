#!/bin/bash
DATAFILE="https://d17h27t6h515a5.cloudfront.net/topher/2017/February/5898cd6f_traffic-signs-data/traffic-signs-data.zip"
if [ -d "/tmp/traffic-signs-data" ]; then
    echo "Data already downloaded"
else
    echo "Downloading data from $DATAFILE"
    mkdir /tmp/traffic-signs-data
    curl -s -o /tmp/traffic-signs-data/traffic-signs-data.zip $DATAFILE
    (cd /tmp/traffic-signs-data && unzip traffic-signs-data.zip && rm -f traffic-signs-data.zip)
    (mv /tmp/traffic-signs-data/* .)
fi
