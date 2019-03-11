## Dotscience roadsigns

A Jupyter notebook used to train a tensorflow model to recognize german roadsigns.

### instructions

Create a new dotscience project.

Update the two files:

 * `Traffic_Sign_Classifier.ipynb`
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


