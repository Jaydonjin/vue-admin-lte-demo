<template>
  <div>
    <!-- Content Header (Page header) -->
    <section class="content-header">
      <h1>
        Dashboard
      </h1>
    </section>
    <section class="content">
      <div class="row">
        <div class="col-md-3 col-sm-6 col-xs-12">
          <va-info-box
            bgColor="bg-aqua"
            bgIcon="fa fa-archive"
            text="TOTAL BUCKET"
            :number="totalBucket">
          </va-info-box>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <va-info-box
            bgColor="bg-red"
            bgIcon="fa fa-google-plus"
            text="Total Files"
            :number="totalFiles">
          </va-info-box>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <va-info-box
            bgColor="bg-green"
            bgIcon="fa fa-cogs"
            text="Total capacity"
            :number="totalCapacity">
          </va-info-box>
        </div>
        <div class="col-md-3 col-sm-6 col-xs-12">
          <va-info-box
            bgColor="bg-yellow"
            bgIcon="fa fa-cloud-download"
            text="API requests"
            :number="apiRequests">
          </va-info-box>
        </div>
      </div>
      <!-- /.row -->
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <va-box
            title="Monthly Report">
            <div slot="content">
              <div class="row">
                <div class="col-md-12">
                  <p class="text-center">
                    <strong>Sales: 1 Jan, 2014 - 30 Jul, 2014</strong>
                  </p>
                  <va-chart :chart-config="chartConfig"></va-chart>
                </div>
              </div>
            </div>
          </va-box>
        </div>
      </div>
      <!-- /.row -->
      <div class="row">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <va-box
            title="Activity">
            <div slot="content" class="box-comments" style="margin: -10px; padding: 10px;">
              <va-box-comment v-for="activity in activities" :name="activity.name"
                              :text="activity.text"
                              :profile-image="activity.avatar"
                              :date="activity.date"></va-box-comment>
            </div>
          </va-box>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import VaInfoBox from 'va/widgets/VAInfoBox'
  import VaBox from 'va/widgets/VABox'
  import VaChart from 'va/components/VAChart'
  import VaBoxComment from 'va/widgets/VASocialBoxComment'
  import { mapGetters } from 'vuex'

  export default {
    name: 'dashboard',
    data () {
      return {
        msg: 'hello world',
        activities: [{
          name: 'Edison.W.Zhang',
          text: 'Upload file into EIMS/Invoice bucket',
          date: new Date(),
          avatar: 'http://apis.newegg.org/common/v1/domain/user/ez17/avatar'
        }, {
          name: 'Edison.W.Zhang',
          text: 'Upload file into EIMS/Invoice bucket',
          date: new Date(),
          avatar: 'http://apis.newegg.org/common/v1/domain/user/ez17/avatar'
        }, {
          name: 'Edison.W.Zhang',
          text: 'Upload file into EIMS/Invoice bucket',
          date: new Date(),
          avatar: 'http://apis.newegg.org/common/v1/domain/user/ez17/avatar'
        }],
        chartConfig: {
          type: 'line',
          data: {
            labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
            datasets: [
              {
                label: 'Bucket',
                fillColor: '#a64848',
                backgroundColor: ['rgba(146,109,222,1)', 'rgba(87,199,212,1)', 'rgba(242,166,84,1)'],
                data: [65, 59, 80, 81, 56, 55, 40, 55, 40, 55, 40, 55]
              },
              {
                label: 'Files',
                backgroundColor: ['rgba(146,109,222,1)', 'rgba(87,199,212,1)', 'rgba(242,166,84,1)'],
                strokeColor: ['rgba(146,109,222,1)', 'rgba(87,199,212,1)', 'rgba(242,166,84,1)'],
                pointColor: '#3b8bba',
                pointStrokeColor: 'rgba(60,141,188,1)',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
                data: [28, 48, 40, 19, 86, 27, 90, 212, 213, 11, 21, 3]
              },
              {
                label: 'Capacity',
                fillColor: 'rgba(13,31,75,0.9)',
                strokeColor: 'rgba(60,141,188,0.8)',
                pointColor: '#3b8bba',
                pointStrokeColor: 'rgba(60,141,188,1)',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
                data: [28, 27, 90, 212, 213, 48, 40, 19, 86, 11, 21, 3]
              },
              {
                label: 'API requests',
                fillColor: 'rgba(13,11,58,0.9)',
                strokeColor: 'rgba(60,141,188,0.8)',
                pointColor: '#3b8bba',
                pointStrokeColor: 'rgba(60,141,188,1)',
                pointHighlightFill: '#fff',
                pointHighlightStroke: 'rgba(60,141,188,1)',
                data: [28, 48, 19, 86, 212, 213, 11, 27, 90, 40, 21, 3]
              }]
          },
          options: {
            // Boolean - If we should show the scale at all
            showScale: true,
            // Boolean - Whether grid lines are shown across the chart
            scaleShowGridLines: false,
            // String - Colour of the grid lines
            scaleGridLineColor: 'rgba(0,0,0,.05)',
            // Number - Width of the grid lines
            scaleGridLineWidth: 1,
            // Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,
            // Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,
            // Boolean - Whether the line is curved between points
            bezierCurve: true,
            // Number - Tension of the bezier curve between points
            bezierCurveTension: 0.3,
            // Boolean - Whether to show a dot for each point
            pointDot: false,
            // Number - Radius of each point dot in pixels
            pointDotRadius: 4,
            // Number - Pixel width of point dot stroke
            pointDotStrokeWidth: 1,
            // Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius: 20,
            // Boolean - Whether to show a stroke for datasets
            datasetStroke: true,
            // Number - Pixel width of dataset stroke
            datasetStrokeWidth: 2,
            // Boolean - Whether to fill the dataset with a color
            datasetFill: true,
            // String - A legend template
            legendTemplate: '<ul class=\'<%=name.toLowerCase()%>-legend\'><% for (var i=0; i<datasets.length; i++){%><li><span style=\'background-color:<%=datasets[i].lineColor%>\'></span><%=datasets[i].label%></li><%}%></ul>',
            legend: {
              position: 'right',
              display: true
            },
            // Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
            maintainAspectRatio: true,
            // Boolean - whether to make the chart responsive to window resizing
            responsive: true
          }
        }
      }
    },
    components: {
      VaInfoBox,
      VaBox,
      VaChart,
      VaBoxComment
    },
    computed: {
      ...mapGetters([
        'totalBucket',
        'totalFiles',
        'totalCapacity',
        'apiRequests'])
    }
  }
</script>
