<script setup>
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

import { ref, onMounted } from "vue";
import KeyValue from "./components/KeyValue.vue"
import JsEdit from "./components/JsEdit.vue"
import Authorisation from "./components/Authorisation.vue"
import Body from "./components/Body.vue"

const data = ref({
  "name": "Hello",
  "params": [{ name: "action", value: "start" }],
  headers: [{ name: "Application-Type", value: "contern" }],
  auth: [{ type: "noauth", username: "", password: "" }],
  prescript: [""],
  postscript: [""],
  body: [{ type: "raw", mimeType: "", text: [""], keyValues: [], filepath: "" }]
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
      <vscode-panel-tab id="tab-5">Pre Script</vscode-panel-tab>
      <vscode-panel-tab id="tab-6">Post Script</vscode-panel-tab>

      <vscode-panel-view id="view-1">
        <div class="tab-content">
          <KeyValue title="Param" :input="data.params"></KeyValue>
        </div>

      </vscode-panel-view>
      <vscode-panel-view id="view-2">
        <div class="tab-content">
          <Authorisation :input="data.auth"></Authorisation>
        </div>
      </vscode-panel-view>
      <vscode-panel-view id="view-3">
        <div class="tab-content">
          <KeyValue title="Header" :input="data.headers"></KeyValue>
        </div>
      </vscode-panel-view>
      <vscode-panel-view id="view-4">

        <div class="tab-content">

          <Body :input="data.body"></Body>
        </div>
      </vscode-panel-view>
      <vscode-panel-view id="view-5">
        <div class="tab-content">
          <JsEdit :input="data.prescript" />
        </div>
      </vscode-panel-view>
      <vscode-panel-view id="view-6">
        <div class="tab-content">
          <JsEdit :input="data.postscript" />
        </div>
      </vscode-panel-view>


    </vscode-panels>
  </div>
  <div>
    {{ JSON.stringify(data, null, 4) }}
  </div>
  <div class="row2">
    <vscode-panels>
      <vscode-panel-tab id="tab-1">Body</vscode-panel-tab>
      <vscode-panel-tab id="tab-2">Cookies</vscode-panel-tab>
      <vscode-panel-tab id="tab-3">Headers</vscode-panel-tab>
      <vscode-panel-tab id="tab-4">Result</vscode-panel-tab>

      <vscode-panel-view id="view-1">
        Body
      </vscode-panel-view>
      <vscode-panel-view id="view-2">
        Cookies
      </vscode-panel-view>
      <vscode-panel-view id="view-3">
        Headers
      </vscode-panel-view>
      <vscode-panel-view id="view-4">
        Result

      </vscode-panel-view>



    </vscode-panels>
  </div>
</template>
<style scoped>
.row1 {
  width: 100%;

  

}

 

.tab-content {
  width: 100%;
  margin-top: 5px;
  height: 300px;
  min-height: 300px;
  padding: 10px;
  border-radius: 4px;

}


.toolbar {
  display: flex;
  flex-direction: row;
  gap: 10px;
}

.urltext {
  flex-grow: 1;
}
</style>
