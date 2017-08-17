<template>
  <div class="row">
    <div class="col-md-4">
      <va-box title="Groups" theme="box-success">
        <div slot="content">
          <ul class="nav nav-stacked">
            <li v-for="group in groups"><a href="#">{{group.name}} <span
              class="pull-right badge bg-blue">{{group.types.length}}</span></a>
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
            <va-input title="Name" vaId="btnName"
                      :isFormControl="true"></va-input>
          </va-form-group>
          <va-form-group>
            <label for="btnOwner">Owners</label>
            <va-input title="Owners" vaId="btnOwner"
                      :isFormControl="true"></va-input>
          </va-form-group>
        </div>
        <div slot="footer">
          <va-button name="Save" theme="primary"
                     :isBlock="false"></va-button>
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

  export default {
    name: 'Groups',
    data () {
      return {
        groups: [{
          name: 'DFIS',
          types: [{
            name: 'DFIS_Portal'
          }]
        }, {
          name: 'EDI',
          types: [{
            name: 'ExtMarketing'
          }, {
            name: 'ExtMarketing'
          }]
        }, {
          name: 'PO',
          types: [{
            name: 'ExtMarketing'
          }, {
            name: 'ExtMarketing'
          }]
        }]
      }
    },
    components: {
      VaBox,
      VaButton,
      VaInput,
      VaFormGroup
    }
  }
</script>
