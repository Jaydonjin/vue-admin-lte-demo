<template>
  <div class="row">
    <div class="col-md-4">
      <va-box title="Groups" theme="box-success" :isOpen="true">
        <div slot="content">
          <ul class="nav nav-stacked">
            <li v-for="(group, index) in groups" @click="selectGroup(group, index)">
              <a href="#">{{group.Name}}
                <span class="pull-right badge bg-blue">3</span>
                <span class="pull-right badge bg-red" @click="deleteGroup(group)">delete</span>
              </a>
            </li>
          </ul>
        </div>
        <div slot="footer">
          <div class="row">
            <div class="col-md-6">
              <button type="button"
                      class="btn btn-block btn-primary"
                      @click="newGroup">New Group
              </button>
            </div>
          </div>
        </div>
      </va-box>
    </div>

    <!-- Group Information -->
    <div class="col-md-8">
      <va-box :title="groupName" theme="box-success">
        <div slot="content">
          <va-form-group>
            <label for="inputOwner">Owners</label>
            <input id="inputOwner"
                   class="form-control"
                   v-model="groupOwners">
          </va-form-group>
        </div>
        <div slot="footer">
          <button type="button"
                  class="btn btn-primary"
                  @click="saveGroup">Save
          </button>
        </div>
      </va-box>
    </div>
    <!-- ./Group Information -->

    <!-- Group Form-->
    <modal v-model="groupModal.shown" :title="groupModal.title"
           @ok="onSaveGroup" @cancel="onCancelGroup">
      <va-form-group>
        <label for="inputName">Name</label>
        <input id="inputName"
               class="form-control"
               v-model="groupName">
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
    name: 'Groups',
    data () {
      return {
        groups: [],
        groupName: '',
        groupOwners: [],
        groupId: 0,
        isNew: true,
        groupModal: {
          shown: false,
          title: 'Add Group'
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
      newGroup () {
        this.groupModal.shown = true
      },
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
      deleteGroup (group, index) {
        let vm = this
        vm.isNew = true
        debugger
        groupInfo.deleteGroup(group.ID)
          .then(response => {
            vm.groups.splice(index, 1)
            message.success('Delete Group ' + group.Name)
          })
      },
      onSaveGroup () {
        let vm = this
        groupInfo.newGroup({Name: this.groupName})
          .then(group => {
            vm.groups.push(group)
            message.success('Add new group')
          })
      },
      onCancelGroup () {
        console.log('cancel')
      }
    }
  }
</script>
