<template>
  <div class="row">
    <div class="col-sm-12">
      <div class="box">
        <div class="box-header">
          <h3 class="box-title">Groups</h3>
          <div class="box-tools pull-right">
            <button type="button" class="btn btn-danger btn-sm" @click="onNewGroup"><i class="fa fa-plus"></i> Add Group
            </button>
          </div>
        </div>
        <!-- /.box-header -->
        <div class="box-body no-padding">
          <table class="table table-condensed">
            <tbody>
            <tr>
              <th style="width: 10px">#</th>
              <th>Group Name</th>
              <th>Owners</th>
              <th>Last Edit Date</th>
              <th>Last Edit User</th>
              <th style="width: 40px">Operations</th>
            </tr>
            <tr v-for="(group, index) in groups">
              <td>{{index + 1}}.</td>
              <td>{{group.Name}}</td>
              <td>
                Owners
              </td>
              <td style="width: 200px">Last Edit Date</td>
              <td style="width: 200px">Last Edit User</td>
              <!-- Operation Column -->
              <td style="width: 200px">
                <div class="btn-group">
                  <button type="button" class="btn btn-default btn-xs" @click="onEditGroup(group)"><i
                    class="fa fa-edit"></i>
                    Edit
                  </button>
                  <button type="button" class="btn btn-default btn-xs" @click="onDeleteGroup(group)"><i
                    class="fa fa-minus"></i> Delete
                  </button>
                  <button type="button" class="btn btn-default btn-xs" @click="onInfoGroup(group)"><i
                    class="fa fa-info"></i> Detail
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
    <modal v-model="groupModal.shown" :title="groupModal.title"
           @ok="onSaveGroup">
      <va-form-group>
        <label for="inputName">Name</label>
        <input id="inputName"
               class="form-control"
               :readonly="group.ID != 0"
               placeholder="Group Name"
               v-model="group.Name">
      </va-form-group>
      <va-form-group>
        <label for="inputOwners">Owners</label>
        <input id="inputOwners"
               class="form-control"
               v-model="group.owners">
      </va-form-group>
    </modal>
    <!-- ./Group Form-->
  </div>
</template>
<script>
  import VaBox from 'va/widgets/VABox'
  import VaButton from 'va/components/VAButton.vue'
  import VaInput from 'va/components/VAInput.vue'
  import VaFormGroup from 'va/components/VAFormGroup.vue'
  import { groupInfo } from '@/api'
  import { message } from '@/common'
  import Modal from './Modal.vue'

  export default {
    name: 'Groups2',
    data () {
      return {
        groups: [],
        groupModal: {
          shown: false,
          title: 'Add Group'
        },
        group: {
          Id: 0,
          Name: '',
          Owners: []
        }
      }
    },
    components: {
      Modal,
      VaBox,
      VaButton,
      VaInput,
      VaFormGroup
    },
    mounted () {
      this.getAll()
    },
    methods: {
      getAll () {
        let vm = this
        groupInfo.all()
          .then(groups => {
            vm.groups = groups.results
            if (vm.groups) {
              vm.selectGroup(vm.groups[0])
            }
          })
      },
      saveGroup () {
        let vm = this
        groupInfo.newGroup({Name: this.groupName})
          .then(group => {
            vm.groups.push(group)
            message.success('Add new group')
          })
      },
      selectGroup (group) {
        let vm = this
        vm.groupName = group.Name
        vm.groupId = group.ID
      },
      onSaveGroup () {
        let vm = this
        groupInfo.newGroup(vm.group)
          .then(group => {
            vm.groups.push(group)
            message.success('New group ' + vm.group.Name + ' has been added.')
          })
      },
      onNewGroup () {
        this.groupModal.shown = true
        this.groupModal.title = 'New Group'
        this.group.ID = 0
        this.group.Name = ''
        this.group.Owners = []
      },
      onEditGroup (group) {
        this.groupModal.shown = true
        this.groupModal.title = 'Edit Group'
        Object.assign(this.group, group)
      },
      onDeleteGroup (group, index) {
        let vm = this
        vm.isNew = true
        groupInfo.deleteGroup(group.ID)
          .then(response => {
            vm.groups.splice(index, 1)
            message.success('Delete Group ' + group.Name)
          })
      },
      onInfoGroup (group) {
        this.$router.push({name: 'Group', params: {id: group.ID}})
      }
    }
  }
</script>
