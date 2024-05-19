<script setup >
import {
  provideVSCodeDesignSystem,
  vsCodeButton,
  vsCodePanelTab,
  vsCodePanels,
  vsCodePanelView,
  vsCodeDivider,
  vsCodeDataGridRow,
  vsCodeDataGridCell,
  vsCodeTextField,
  vsCodeCheckbox,
  vsCodeDataGrid,
  vsCodeTextArea,
  vsCodeDropdown,
  vsCodeOption,
  vsCodeRadio,
  vsCodeRadioGroup
} from "@vscode/webview-ui-toolkit";
provideVSCodeDesignSystem().register(
  vsCodeButton(),
  vsCodePanelTab(),
  vsCodePanels(),
  vsCodePanelView(),
  vsCodeDivider(),
  vsCodeDataGridRow(),
  vsCodeDataGridCell(),
  vsCodeDataGrid(),
  vsCodeTextField(),
  vsCodeCheckbox(),
  vsCodeTextArea(),
  vsCodeDropdown(),
  vsCodeOption(),
  vsCodeRadio(),
  vsCodeRadioGroup()
);

import {ref,onMounted} from "vue";
import KeyValue from "./components/KeyValue.vue"
import JsEdit from "./components/JsEdit.vue"
import Authorisation from "./components/Authorisation.vue"
import Body from "./components/Body.vue"
import Iblize from "iblize";

const preeditor = ref(null);
const posteditor = ref(null);
var preeditor_obj = null;
var posteditor_obj = null;
onMounted(()=>{
  preeditor_obj = new Iblize(preeditor.value, {
    language: "javascript",
  });
  posteditor_obj = new Iblize(posteditor.value, {
    language: "javascript",
  });
})

</script>

<template>
  <div class="toolbar">
    <vscode-dropdown value="GET">
      <vscode-option>GET</vscode-option>
      <vscode-option>POST</vscode-option>
      <vscode-option>PUT</vscode-option>
      <vscode-option>PATCH</vscode-option>
      <vscode-option>DELETE</vscode-option>
      <vscode-option>HEAD</vscode-option>
      <vscode-option>OPTIONS</vscode-option>
    </vscode-dropdown>
    <vscode-text-field type="text" ref="host" class="urltext" placeholder="http://www.google.com"></vscode-text-field>
    <vscode-button appearance="primary">SEND</vscode-button>
    <vscode-button appearance="primary">SAVE</vscode-button>
  </div>

  <div class="row1">
    <vscode-panels>
      <vscode-panel-tab id="tab-1">Params</vscode-panel-tab>
      <vscode-panel-tab id="tab-2">Authorisation</vscode-panel-tab>
      <vscode-panel-tab id="tab-3">Headers</vscode-panel-tab>
      <vscode-panel-tab id="tab-4">Body</vscode-panel-tab>
      <vscode-panel-tab id="tab-5">
        Pre Script
      </vscode-panel-tab>
      <vscode-panel-tab id="tab-6">
        Post Script
      </vscode-panel-tab>
      <vscode-panel-view id="view-1">
        <KeyValue></KeyValue>
      </vscode-panel-view>
      <vscode-panel-view id="view-2"><Authorisation></Authorisation></vscode-panel-view>
      <vscode-panel-view id="view-3">
        <KeyValue></KeyValue>
      </vscode-panel-view>
      <vscode-panel-view id="view-4"><Body></Body></vscode-panel-view>
      <vscode-panel-view id="view-5">
        <JsEdit />
      </vscode-panel-view>
      <vscode-panel-view id="view-6">
        <JsEdit />
      </vscode-panel-view>
    </vscode-panels>
  </div>
  <vscode-divider></vscode-divider>

</template>
<style scoped>
#preeditor,#posteditor{
    width: 100%;
      height: 350px;

}
</style>

 
