(function($){

  var TENSORFLOW_URL = '/v1/models/model:predict'
  var appData = null
  var classes = null

  var chart = null
  var chartId = 'results-chart-1'

  function loadResult(label, imageData) {
    $('#results-label').text(label)
    $('#results-data').hide()
    $('#results-error').hide()
    $('#results-loading').show()
    // $('#results-chart').hide()

    var requestPayload = {
      inputs: {
        keep_prob: [1], 
        keep_prob_conv: [1],
        input_image: [imageData]
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
        
        var transformed = []
        response.outputs[0].map(function(output, i) {         
          transformed.push({
            // 'probability': (output * 100).toFixed(2),
            'probability': output,
            'class': classes[i],            
          })
        })

        transformed.sort((a, b) => (a.probability < b.probability) ? 1 : -1)

        transformed = transformed.slice(0, 5)

        var yAxis = []
        var xAxis = []

        transformed.map(function(entry, i) {
          xAxis.push(entry.probability)
          yAxis.push(entry.class)
        })

        var options = {
          chart: {
            id: chartId,
            height: 350,
            type: 'bar'
          },
          plotOptions: {
            bar: {
              horizontal: true,
              dataLabels: {
                position: 'top'
              }              
            }            
          },
          legend: {
            show: true,
            showForSingleSeries: false,
            showForNullSeries: true,
            showForZeroSeries: true,
            position: 'bottom',
            horizontalAlign: 'center', 
            floating: false,
            fontSize: '17px',
          },
          dataLabels: {
            enabled: true,
          },
          series: [{
            name: 'Probability',
            data: xAxis, 
            title: {
              text: 'Class'
            },        
          }],
          xaxis: {
            categories: yAxis, // xaxis gets yAxis because we have a horizontal chart
            title: {
              text: 'Probability'
            },
            labels: {
              show: true,
              rotate: -45,
              rotateAlways: false,
              hideOverlappingLabels: true,
              showDuplicates: false,
              trim: true,
              minHeight: undefined,
              maxHeight: 120,
              style: {
                  colors: [],
                  fontSize: '15px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  cssClass: 'apexcharts-xaxis-label',
              },
              offsetX: 0,
              offsetY: 0,
              format: undefined,
              formatter: undefined
             },
          },
          yaxis: {         
            labels: {
              minWidth: 0,
              maxWidth: 300,
              style: {               
                  fontSize: '16px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  cssClass: 'apexcharts-yaxis-label',
              }                      
            },
          },
          animations: {
            enabled: true,
            easing: 'easeinout',
            speed: 300,
            animateGradually: {
                enabled: true,
                delay: 150
            },
            dynamicAnimation: {
                enabled: true,
                speed: 350
            }
          }
        }
               
        chart = new ApexCharts(document.querySelector("#results-chart"), options)        
        chart.render()

        var dataString = JSON.stringify(transformed, null, 4)
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

  function renderImages() {
    appData.image_filenames.map(function(filename, i) {
      var label = appData.image_labels[i]
      var imageData = appData.tensorflow_images[i]
      var elem = $([
        '<div class="card">',
          '<div class="card-image">',
            '<a class="modal-trigger" href="#resultsmodel"><img src="' + filename + '"></a>',
          '</div>',
          '<div class="card-content"><a class="modal-trigger" href="#resultsmodel"><p>' + label + '</p></a></div>',
          '<div class="card-action"><a class="modal-trigger button buttonSecondary waves-effect" href="#resultsmodel">Predict</a></div>',
        '</div>',
      ].join("\n"))

      elem.click(function() {
        if (chart) {
          chart.destroy()
        }
        loadResult(label, imageData)
      })

      $('#image-cards').append(elem)
    })
  }

  function loadAppData() {
    $.getJSON('/appdata.json', function(data) {
      appData = data
      renderImages()
    })
  }

  function loadClasses() {
    $.getJSON('/classes.json', function(data) {
      classes = data      
    })
  }

  $(function(){

    $('.sidenav').sidenav()
    $('.modal').modal()

    $('#results-data').hide()
    
    loadAppData()
    loadClasses()

  })
})(jQuery)
