<template>
  <div class="row">
    <div class="col-md-4">
      <div class="box box-success">
        <div class="box-header">
          <h3 class="box-title">Groups</h3>

        </div>
        <!-- /.box-header -->
        <div class="box-body no-padding">
          <ul class="nav nav-stacked">
            <li v-for="(group, index) in groups">
              <a href="#" @click="selectGroup(group)">{{group.FileGroup}}/{{group.FileType}}</a>
            </li>
          </ul>
        </div>
        <!-- /.box-body -->
        <div class="box-footer">
          <lte-pagination size="sm"
                          :pageSize="pagination.pageSize"
                          :totalCount="pagination.totalCount"
                          :maxPage="6"
                          @page="onPage"></lte-pagination>
        </div>
      </div>
    </div>
    <div class="col-md-8">
      <div class="box box-success">
        <div class="box-header">
          {{group.FileGroup}}/{{group.FileType}}
        </div>
        <div class="box-body">
          <div class="row">
            <div class="col-sm-4">
              <lte-info-box text="total capacity"
                            color="bg-purple"
                            number="100022123"
                            icon="fa fa-archive"></lte-info-box>
            </div>
            <div class="col-sm-4">
              <lte-info-box text="total file count"
                            color="bg-red"
                            number="100022123"
                            icon="fa fa-file"></lte-info-box>
            </div>
            <div class="col-sm-4">
              <lte-info-box text="cpu traffic"
                            color="bg-aqua"
                            number="100022123"
                            icon="fa fa-archive"></lte-info-box>
            </div>
          </div>
          <!-- navigator content -->
          <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
              <li class="active"><a href="#tab_3" data-toggle="tab" aria-expanded="true">Content</a></li>
              <li class=""><a href="#tab_4" data-toggle="tab" aria-expanded="false">Settings</a></li>
            </ul>
            <div class="tab-content" style="min-height: 590px;">
              <!-- /.tab-pane -->
              <div class="tab-pane active" id="tab_3">
                <div class="row">
                  <div class="col-md-2">
                    <a href="#" class="btn btn-primary btn-block btn-flat"><b>Upload</b></a>
                  </div>
                  <div class="input-group col-md-6">
                    <input type="text" name="q" class="form-control" placeholder="Search...">
                    <span class="input-group-btn">
                                    <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i
                                      class="fa fa-search"></i>
                                    </button>
                                </span>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12">
                    <p class="lead" style="margin-top: 10px;">File Object Information</p>

                    <div class="table-responsive">
                      <table class="table">
                        <tbody>
                        <tr>
                          <th style="width:20%">File Name:</th>
                          <td>89-356-314-S02.jpg</td>
                        </tr>
                        <tr>
                          <th>Full Path:</th>
                          <td>/NeweggImage/ProductImage/89-356-314-S02.jpg</td>
                        </tr>
                        <tr>
                          <th>File Size:</th>
                          <td>12,321 K</td>
                        </tr>
                        <tr>
                          <th>File Type:</th>
                          <td>Application/json</td>
                        </tr>
                        <tr>
                          <th>Last Modified Time:</th>
                          <td>2016-06-21 12:30:00</td>
                        </tr>
                        <tr>
                          <th>Cached In Squid:</th>
                          <td>Yes</td>
                        </tr>
                        <tr>
                          <th>Cached In Varnish:</th>
                          <td>Yes</td>
                        </tr>
                        <tr>
                          <th>Cached In Akamai:</th>
                          <td>Yes</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
              <!-- /.tab-pane -->
              <div class="tab-pane" id="tab_4">
                Settings
              </div>
              <!-- /.tab-pane -->
            </div>
            <!-- /.tab-content -->
          </div>
          <!-- ./navigator content -->
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import LtePagination from '@/components/pagination.vue'
  import LteInfoBox from './LteInfoBox.vue'
  import {groups} from '@/api'

  export default {
    name: 'Groups3',
    data () {
      return {
        groups: [],
        group: {
          FileGroup: '',
          FileType: ''
        },
        pagination: {
          page: 1,
          totalCount: 0,
          pageSize: 12
        }
      }
    },
    components: {
      LtePagination,
      LteInfoBox
    },
    mounted () {
      this.all()
    },
    methods: {
      all () {
        let vm = this
        let params = Object.assign({}, vm.pagination)
        groups.all(params)
          .then(response => {
            vm.groups = response.results
            vm.pagination.totalCount = response.count
            if (vm.groups) {
              vm.selectGroup(vm.groups[0])
            }
          })
      },
      selectGroup (group) {
        let vm = this
        vm.group.FileGroup = group.FileGroup
        vm.group.FileType = group.FileType
      },
      // events
      onPage (currentPage) {
        this.pagination.page = currentPage
        this.all()
      }
    }
  }
</script>
