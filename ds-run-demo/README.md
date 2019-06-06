# ds run demo

**NOTE: This demo requires a runner with a GPU**

To run this using `ds run`, try the following:

## setup

Make a new project in Dotscience.

Find your project id in the dotscience UI - on the resource page there's a sample `ds run .` command and looks like `857bdca-14ab24d-143dba21`

```
export PROJECT=<your project id>
cd dotscience-roadsigns/ds-run-demo
```

## follow the instructions in the web ui

follow the instructions in the web interface from "Install the dotscience (ds) client" up to and including "Log into dotscience..."

## upload signnames.csv

Using the Dotscience web UI, drag and drop the signnames.csv file from the root of this repo into the project resources in Dotscience.

## fetching data

```
ds run --verbose --nvidia . $PROJECT quay.io/dotmesh/dotscience-tensorflow-opencv:19.02-py3 -- bash get-data.sh
```

## train model

```
ds run --verbose --nvidia . $PROJECT quay.io/dotmesh/dotscience-tensorflow-opencv:19.02-py3 -- python train.py
```

## check dotscience

You should see provenance & metrics data in Dotscience!
