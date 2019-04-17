## Dotscience roadsigns

A Jupyter notebook used to train a tensorflow model to recognize german roadsigns.

### instructions

Create a GPU enabled runner and install Dotscience on it. To skip installing `nvidia-runtime` on a GCP runner, search for the VM `NVIDIA GPU Cloud Image for Deep Learning and HPC`. This comes with `nvidia-runtime` installed. Then follow the instructions on the [Dotscience GCP runner setup page](https://docs.dotscience.com/setup/set-up-google-cloud-vm/). 

Create a new dotscience project.

Upload the two files:

 * `roadsigns.ipynb`
 * `signnames.csv`

Launch Jupyter on a runner.

Run through each cell in the notebook.

It will download the dataset to `/tmp` - this is to avoid the 200mb dataset being added to the dot.  You can change the location it downloads to if you want the dataset to be added to the dot.

It will output the model into the `roadsigns/1` folder and annotate dotscience with `roadsigns` being the model folder.

This is because Tensorflow serving requires there to be a version folder under the model name folder.  We have fixed this to `1` for the demo.

### retraining

To re-train the model - goto the third before last cell and edit these variables:

```
# increase this to improve the accuracy
# decrease to train faster
EPOCHS = 2
# how many images to train on as a percentage of the total set
# increase this to improve the accuracy
# decrease to train faster
USE_IMAGE_PERCENT = 1
```

Increasing `EPOCHS` will loop more times over the training data.

Increasing `USE_IMAGE_PERCENT` will increase the percentage of the training images it will use when training.

Adjusting these variables will affect the accuracy of the final model.

### running the app

If you have the tensorflow server app running on the docker or k8s hostname `roadsigns-tensorflow` - here is how to build and run the app.

#### build

```
cd app
docker build -t roadsignsapp .
```

#### run

```
docker run -d \
  -p 8000:80 \
  --link roadsigns-tensorflow:roadsigns-tensorflow \
  -e TENSORFLOW_HOST=roadsigns-tensorflow:8501 \
  --name roadsignsapp \
  roadsignsapp 
```

If you are using Kubernetes - you don't need the link but the `TENSORFLOW_HOST` should be set to the service name of the tensorflow serving service.

#### App proxy

To get around CORS - the app will proxy any requests to `/v1` onto the tensorflow container - for ingress you only need to foward traffic to the app container and it will look after getting data to the tensorflow serving container.

#### image data

The image data we are sending is prebuilt into `app/www/appdata.json`

This data has 3 top level fields:

 * `image_filenames` - the filenames of the images to view
 * `image_labels` - the corresponding labels for those images
 * `tensorflow_images` - the data structure of the image we send to tensorflow

The `tensorflow_images` property was JSON exported from the data passed to the model in the notebook.

#### adjusting payload

In the file `app/www/js/init.js` is this code at the top:

```
var TENSORFLOW_URL = '/v1/models/roadsigns_model:predict'
var appData = null

function loadResult(label, imageData) {
  $('#results-label').text(label)
  $('#results-data').hide()
  $('#results-error').hide()
  $('#results-loading').show()

  var requestPayload = {
    inputs: {
      keep_prob: [1], 
      keep_prob_conv: [1],
      x: [imageData]
    },
  }

  $.ajax({
    method: 'POST',
    url: TENSORFLOW_URL,
    data: JSON.stringify(requestPayload),
    dataType: 'json',
    contentType: "application/json; charset=utf-8",
    success: function(response) {
      $('#results-loading').hide()
      var data = JSON.parse(response.responseText)
      var dataString = JSON.stringify(data, null, 4)
      $('#results-data').show()
      $('#results-json').text(dataString)
    },
    error: function(response) {
      var errorMessage = response.status + ' ' + response.statusText
      $('#results-error').text(errorMessage)
      $('#results-loading').hide()
      $('#results-error').show()
      $('#results-data').show()
      $('#results-json').text(response.responseText)
    }
  })
}
```

You can adjust the `requestPayload` accordingly.

The output is shown as raw JSON in the model window that appears.

