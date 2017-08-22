<template>
  <div class="row">
    <div class="col-md-4">
      <va-box title="Groups" theme="box-success">
        <div slot="content">
          <ul class="nav nav-stacked">
            <li v-for="group in groups"><a href="#">{{group.Name}} <span
              class="pull-right badge bg-blue">3</span></a>
            </li>
          </ul>
        </div>
        <div slot="footer">
          <div class="row">
            <div class="col-md-6">
              <va-button name="New Group"
                         theme="primary"
                         :isFlat="true"></va-button>
            </div>
            <div class="col-md-6">
              <va-button name="New Group"
                         theme="primary"
                         :isFlat="true"></va-button>
            </div>
          </div>
        </div>
      </va-box>
    </div>
    <div class="col-md-8">
      <va-box title="New Group" theme="box-success">
        <div slot="content">
          <va-form-group>
            <label for="btnName">Name</label>
            <input id="inputName"
                   class="form-control"
                   v-model="current_group_name">
          </va-form-group>
          <va-form-group>
            <label for="btnOwner">Owners</label>
            <input id="inputOwner"
                   class="form-control"
                   v-model="current_group_owners">
          </va-form-group>
        </div>
        <div slot="footer">
          <va-button name="Save" theme="primary"
                     :isBlock="false"
                     v-on:click.native="addNewGroup"></va-button>
        </div>
      </va-box>
    </div>
  </div>
</template>
<script>
  import VaBox from 'va/widgets/VABox'
  import VaButton from 'va/components/VAButton.vue'
  import VaInput from 'va/components/VAInput.vue'
  import VaFormGroup from 'va/components/VAFormGroup.vue'
  import { groupInfo } from '@/api'

  export default {
    name: 'Groups',
    data () {
      return {
        groups: [],
        current_group_name: '',
        current_group_owners: []
      }
    },
    components: {
      VaBox,
      VaButton,
      VaInput,
      VaFormGroup
    },
    mounted () {
      let vm = this
      groupInfo.all()
        .then(groups => {
          vm.groups = groups.results
          debugger
          vm.$root.$children[0].$refs.toastr.e('this.$refs.toastr.e message', 'Error')
        })
    },
    methods: {
      addNewGroup: function () {
        let vm = this
        groupInfo.newGroup({Name: this.current_group_name})
          .then(group => {
            vm.groups.push(group)
          })
      }
    }
  }
</script>
