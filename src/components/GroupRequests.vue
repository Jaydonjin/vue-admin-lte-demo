<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">Group Requests</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body no-padding">
          <table class="table table-condensed">
            <tbody>
            <tr>
              <th style="width: 10px">#</th>
              <th>Group/Type</th>
              <th>IsPublic</th>
              <th>IsSpecial</th>
              <th>Request User</th>
              <th>Request Date</th>
              <th>Request Reason</th>
              <th>Status</th>
              <th>Last Edit User</th>
              <th>Last Edit Date</th>
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
        <!-- /.box-body -->
      </div>
    </div>

    <!-- Group Form-->
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
    <!-- ./Group Form-->
  </div>
</template>

<script>
  import VaBox from 'va/widgets/VABox'
  import VaFormGroup from 'va/components/VAFormGroup.vue'
  import Modal from '@/components/Modal.vue'
  import {groupRequest} from '@/api'

  export default {
    name: 'GroupRequests',
    data () {
      return {
        modal: {
          shown: false,
          title: ''
        },
        request: {
          Id: 0,
          Comment: '',
          index: 0
        },
        requests: []
      }
    },
    components: {
      VaBox,
      VaFormGroup,
      Modal
    },
    mounted () {
      this.all()
    },
    methods: {
      all () {
        let vm = this
        groupRequest.all()
          .then(response => {
            vm.requests = response.results
          })
      },
      onSaveRequest () {
        console.log('save')
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
      }
    }
  }
</script>
