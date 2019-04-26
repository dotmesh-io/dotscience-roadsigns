# ds run demo

To run this using `ds run`, try the following:

## setup

Make a new project in Dotscience.

Find your project id in the dotscience UI - by uploading a script (python or shell) and then expanding the "Run script" instructions - the project id is after the sample `ds run .` command and looks like `project-23d1a936-default-workspace`

```
export PROJECT=<your project id>
cd dotscience-roadsigns/ds-run-demo
```

## upload signnames.csv

Using the Dotscience web UI, drag and drop the signnames.csv file from the root of this repo into the project resources in Dotscience.

## fetching data

```
ds run --verbose --nvidia . $PROJECT nvcr.io/nvidia/tensorflow:19.02-py3 -- bash -c "bash get-data.sh"
```

## train model

```
ds run --verbose --nvidia . $PROJECT nvcr.io/nvidia/tensorflow:19.02-py3 -- bash -c "bash setup.sh && python train.py"
```

