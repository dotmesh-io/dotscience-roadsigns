# ds run demo

To run this using `ds run`, try the following:

## setup

find your project id in the dotscience UI - by uploading a python file and then expanding the python file's instructions :'(

```
export PROJECT=<your project id>
```

## train model

```
ds run --verbose --nvidia . $PROJECT nvcr.io/nvidia/tensorflow:19.03-py3 -- bash -c "bash get-data.sh"
```

## fetching data

```
ds run --verbose --nvidia . $PROJECT nvcr.io/nvidia/tensorflow:19.03-py3 -- bash -c "bash setup.sh && python train.py"
```

