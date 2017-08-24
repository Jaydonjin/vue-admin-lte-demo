<template>

  <div class="row">
    <div class="col-md-4">
      <va-box title="Types" theme="box-success" :isOpen="true">
        <div slot="content">
          <ul class="nav nav-stacked">
            <li v-for="(item, index) in types" @click="onSelectGroupType(item, index)">
              <a href="#">{{item.Name}}
                <span class="pull-right badge bg-red" @click="onEditGroupType(item)">Edit</span>
              </a>
            </li>
          </ul>
        </div>
        <div slot="footer">
          <div class="row">
            <div class="col-md-6">
              <button type="button"
                      class="btn btn-block btn-primary"
                      @click="onNewGroupType">New
              </button>
            </div>
          </div>
        </div>
      </va-box>
    </div>
    <div class="col-md-8">
      <va-box :title="type.Name" theme="box-success" :isOpen="true">
        <div slot="content">
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
                            icon="ion ion-ios-gear-outline"></lte-info-box>
            </div>
          </div>
        </div>
        <div slot="footer">
          <div class="row">
            <div class="col-md-6">
              <button type="button"
                      class="btn btn-block btn-primary"
              >New
              </button>
            </div>
          </div>
        </div>
      </va-box>
    </div>
    <!-- Group Form-->
    <modal v-model="typeModal.shown" :title="typeModal.title"
           @ok="onSaveGroupType">
      <va-form-group>
        <label for="inputName">Name</label>
        <input id="inputName"
               class="form-control"
               :readonly="editType.ID != 0"
               placeholder="Group Name"
               v-model="editType.Name">
      </va-form-group>

    </modal>
    <!-- ./Group Form-->
  </div>
</template>

<script>
  import VaBox from 'va/widgets/VABox'
  import { message } from '@/common'
  import { groupInfo } from '@/api'
  import Modal from './Modal.vue'
  import LteInfoBox from './LteInfoBox.vue'

  export default {
    name: 'group',
    data () {
      return {
        message: 'group information',
        types: [{Name: 'DFIS'}],
        typeModal: {
          shown: false,
          title: ''
        },
        editType: {
          ID: 0,
          Name: '',
          ParentID: 0
        },
        type: {
          ID: 0,
          Name: '',
          LastEditDate: new Date(),
          LastEditUser: ''
        }
      }
    },
    components: {
      VaBox,
      Modal,
      LteInfoBox
    },
    mounted () {
      this.getTypes()
    },
    methods: {
      getTypes () {
        let vm = this
        let groupId = vm.$router.currentRoute.params.id
        if (!groupId) {
          message.error('Required Group Id')
          return
        }
        vm.editType.ParentID = groupId
        groupInfo.getGroupTypes(groupId)
          .then(response => {
            vm.types = response.results
          })
      },
      onSelectGroupType (type, index) {
        let vm = this
        vm.type = Object.assign({}, type)
      },
      onEditGroupType (type) {
        let vm = this
        vm.editType = Object.assign(vm.editType, type)
        vm.typeModal.shown = true
        vm.typeModal.title = 'Edit Group Type'
      },
      onNewGroupType (type) {
        let vm = this
        vm.editType.ID = 0
        vm.editType.editName = ''
        vm.typeModal.shown = true
        vm.typeModal.title = 'New Group Type'
      },
      onSaveGroupType () {
        let vm = this
        groupInfo.newGroup(vm.editType)
          .then(type => {
            vm.types.push(type)
            message.success('Add new group type')
          })
      }
    }
  }
</script>
