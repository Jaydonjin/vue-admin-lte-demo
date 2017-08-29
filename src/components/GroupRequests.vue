<template>
  <div>
    <div class="row">
      <div class="col-md-12">
        <!-- Search Panel-->
        <div class="box box-primary">
          <div class="box-header with-border">
            <h3 class="box-title">Search</h3>
            <div class="box-tools pull-right">
              <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-minus"></i>
              </button>
            </div>
          </div>
          <form class="form-horizontal">
            <div class="box-body">
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <label for="inputUserName" class="col-sm-4 control-label">User Name</label>
                    <div class="col-sm-8">
                      <input v-model="searchParam.name" class="form-control" id="inputUserName"
                             placeholder="Short Login Name">
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label for="selectStatus" class="col-sm-4 control-label">Status</label>
                    <div class="col-sm-8">
                      <select v-model="searchParam.status" class="form-control" id="selectStatus">
                        <option value="-1">All</option>
                        <option value="0">Applying</option>
                        <option value="1">Approved</option>
                        <option value="2">Reject</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div class="col-md-6">
                  <div class="form-group">
                    <label for="dtRequestDate" class="col-sm-2 control-label">Date</label>
                    <div class="col-sm-10">
                      <lte-date-range-picker id="dtRequestDate"
                                             v-model="searchRange">

                      </lte-date-range-picker>
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                <div class="col-md-3">
                  <div class="form-group">
                    <label class="col-sm-4 control-label">Group</label>
                    <div class="col-sm-8">
                      <input v-model="searchParam.group" class="form-control"
                             placeholder="Group Name">
                    </div>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="form-group">
                    <label class="col-sm-4 control-label">Type</label>
                    <div class="col-sm-8">
                      <input v-model="searchParam.type" class="form-control"
                             placeholder="Type Name">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div class="box-footer">
            <button type="button" class="btn btn-primary pull-right"
                    @click="onSearchClick">Search
            </button>
          </div>
        </div>
        <!-- ./Search Panel-->
      </div>
    </div>
    <div class="row">
      <div class="col-sm-12">
        <div class="box box-primary with-border">
          <div class="box-header">
            <h3 class="box-title">Group Requests</h3>
            <div class="box-tools pull-right">
              <button type="button" class="btn btn-success btn-sm" @click="onNewRequest"><i class="fa fa-plus"></i>
                New Request
              </button>
            </div>
          </div>
          <!-- /.box-header -->
          <div class="box-body">
            <table class="table table-condensed">
              <tbody>
              <tr>
                <th style="width: 10px">#</th>
                <th style="width: 200px">Group/Type</th>
                <th style="width: 50px">IsPublic</th>
                <th style="width: 50px">IsSpecial</th>
                <th style="width: 100px">Request User</th>
                <th style="width: 100px">Request Date</th>
                <th>Request Reason</th>
                <th style="width: 50px">Status</th>
                <th style="width: 100px">Last Edit User</th>
                <th style="width: 100px">Last Edit Date</th>
                <th style="width: 40px">Operations</th>
              </tr>
              <tr v-for="(req, index) in requests">
                <td>{{index + 1}}.</td>
                <td>{{req.GroupName}}/{{req.TypeName}}</td>
                <td>{{req.IsPublic}}</td>
                <td>{{req.IsSpecial}}</td>
                <td>{{req.RequestUser}}</td>
                <td>{{req.RequestDate | date}}</td>
                <td>{{req.RequestReason}}</td>
                <td>{{req.Status | status}}</td>
                <td>{{req.LastEditUser}}</td>
                <td>{{req.LastEditDate | date}}</td>
                <!-- Operation Column -->
                <td style="width: 200px">
                  <div class="btn-group" v-if="!req.Status">
                    <button type="button" class="btn btn-default btn-xs" @click="onRejectRequest(req)"><i
                      class="fa fa-edit"></i>
                      Reject
                    </button>
                    <button type="button" class="btn btn-default btn-xs" @click="onApproveRequest(req)"><i
                      class="fa fa-minus"></i> Approve
                    </button>
                  </div>
                </td>
                <!-- ./Operation Column -->
              </tr>
              </tbody>
            </table>
          </div>
          <div class="box-footer clearfix">
            <lte-pagination size="sm"
                            :pageSize="pagination.pageSize"
                            :totalCount="pagination.totalCount"
                            @page="onPage"></lte-pagination>
          </div>
          <!-- /.box-body -->
        </div>
      </div>
    </div>
    <!-- GroupRequest Form-->
    <modal v-model="modal.shown" :title="modal.title"
           @ok="onSaveGroupRequest">
      <va-form-group>
        <label for="inputReason">{{modal.title}} Reason</label>
        <input id="inputReason"
               class="form-control"
               placeholder="Reason"
               v-model="request.Comment">
      </va-form-group>
    </modal>
    <!-- ./GroupRequest Form-->

    <!-- New GroupRequest Form-->
    <modal v-model="newModal.shown" title="New Request"
           @ok="onSaveRequest">
      <form class="form-horizontal" data-vv-scope="newRequest">
        <div class="form-group">
          <label for="inputGroupName" class="col-md-2 control-label">Group</label>
          <div class="col-md-10">
            <input id="inputGroupName"
                   name="groupName"
                   class="form-control"
                   :class="{'input': true, 'is-danger': errors.has('newRequest.groupName') }"
                   placeholder="Group Name"
                   v-validate="'required|alpha_num'"
                   v-model="newRequest.GroupName">
            <span v-show="errors.has('newRequest.groupName')"
                  class="help is-danger">{{ errors.first('newRequest.groupName') }}</span>
          </div>
        </div>
        <div class="form-group">
          <label for="inputTypeName" class="col-md-2 control-label">Type</label>
          <div class="col-md-10">
            <input id="inputTypeName"
                   class="form-control"
                   name="typeName"
                   :class="{'input': true, 'is-danger': errors.has('newRequest.typeName') }"
                   placeholder="Type Name"
                   v-validate="'required|alpha_num'"
                   v-model="newRequest.TypeName">
            <span v-show="errors.has('newRequest.typeName')"
                  class="help is-danger">{{ errors.first('newRequest.typeName') }}</span>
          </div>
        </div>
        <div class="form-group">
          <div class="col-md-offset-2 col-md-3">
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="newRequest.IsSpecial"> Special
              </label>
            </div>
          </div>
          <div class="col-md-3">
            <div class="checkbox">
              <label>
                <input type="checkbox" v-model="newRequest.IsPublic"> Public
              </label>
            </div>
          </div>
        </div>
        <div class="form-group">
          <label for="inputRequestReason" class="col-md-2 control-label">Reason</label>
          <div class="col-md-10">
            <textarea id="inputRequestReason"
                      rows="3"
                      class="form-control"
                      name="reason"
                      placeholder="Group Name"
                      :class="{'textarea': true, 'is-danger': errors.has('newRequest.reason') }"
                      v-validate="'required'"
                      v-model="newRequest.RequestReason">
            </textarea>

            <span v-show="errors.has('newRequest.reason')" class="help is-danger">{{ errors.first('newRequest.reason')
              }}</span>
          </div>
        </div>
      </form>
    </modal>
    <!-- ./GroupRequest Form-->
  </div>
</template>

<script>
  import moment from 'moment'
  import VaBox from 'va/widgets/VABox'
  import VaFormGroup from 'va/components/VAFormGroup.vue'
  import Modal from '@/components/Modal.vue'
  import {groupRequest} from '@/api'
  import {message} from '@/common'
  import LtePagination from '@/components/pagination.vue'
  import LteDateRangePicker from '@/components/DateRangePicker.vue'

  export default {
    name: 'GroupRequests',
    data () {
      return {
        newModal: {
          shown: false
        },
        modal: {
          shown: false,
          title: ''
        },
        request: {
          Id: 0,
          Comment: '',
          index: 0
        },
        requests: [],
        newRequest: {
          Id: 0,
          GroupName: '',
          TypeName: '',
          IsSpecial: false,
          IsPublic: false,
          RequestReason: ''
        },
        pagination: {
          page: 1,
          totalCount: 0,
          pageSize: 20
        },
        searchParam: {
          name: '',
          status: -1,
          group: '',
          type: ''
        },
        searchRange: {
          start: null,
          end: null
        }
      }
    },
    components: {
      VaBox,
      VaFormGroup,
      Modal,
      LtePagination,
      LteDateRangePicker
    },
    created () {
      let start = new Date()
      this.searchRange.start = start = new Date(start.getFullYear(), start.getMonth())
      this.searchRange.end = moment(start).add(1, 'months')
        .subtract(1, 'd')
        .toDate()
    },
    mounted () {
      this.all()
    },
    methods: {
      all () {
        let vm = this
        let params = Object.assign({}, vm.pagination, vm.searchParam, vm.searchRange)
        groupRequest.all(params)
          .then(response => {
            vm.requests = response.results
            vm.pagination.totalCount = response.count
          })
      },
      onRejectRequest (group, index) {
        let vm = this
        vm.modal.shown = true
        vm.modal.title = 'Reject'
        vm.request.index = index
        vm.request.Id = group.Id
      },
      onApproveRequest (group, index) {
        let vm = this
        vm.modal.shown = true
        vm.modal.title = 'Approve'
        vm.request.index = index
        vm.request.Id = group.Id
      },
      onSaveGroupRequest () {
        let vm = this
        groupRequest.approve(vm.modal.title, vm.request)
          .then(response => {
            vm.requests.splice(vm.request.index, 1, response)
          })
      },
      onNewRequest () {
        let vm = this
        vm.newModal.shown = true
        vm.newRequest.GroupName = ''
        vm.newRequest.TypeName = ''
        vm.newRequest.IsPublic = false
        vm.newRequest.IsSpecial = false
        vm.newRequest.RequestReason = ''
        vm.errors.clear('newRequest')
      },
      onSaveRequest () {
        let vm = this
        vm.$validator.validateAll('newRequest').then((result) => {
          if (result) {
            groupRequest.add(vm.newRequest)
              .then(response => {
                message.success('Add request success')
                vm.all()
              })
          } else {
            message.error(vm.errors.all('newRequest'))
          }
        })
      },
      onPage (currentPage) {
        this.pagination.page = currentPage
        this.all()
      },
      onSelected (startDate, endDate) {
        console.log(startDate, endDate)
      },
      onSearchClick () {
        this.all()
      }
    }
  }
</script>
