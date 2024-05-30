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

var value  = window.input ? window.input:{
  "name": "Hello",
  baseurl: "http://www.google.com",
  method: "GET",
  "params": [{ name: "action", value: "start" }],
  headers: [{ name: "Application-Type", value: "contern" }],
  auth: [{ type: "noauth", username: "", password: "" }],
  prescript: [""],
  postscript: [""],
  body: [{ type: "raw", mimeType: "", text: [""], keyValues: [], filepath: "" }]
};
const data = ref(value)

const output = ref({
  status: "",
  body: "",
  headers: [{ name: "", value: "" }],
  cookies: [{ name: "", value: "" }],
  result: ""
})

function runReq() {
  vscode.postMessage({
    command: 'runTestCase',
    text: JSON.stringify(data.value)
  });
}
function saveReq() {
  vscode.postMessage({
    command: 'saveTestCase',
    text: JSON.stringify(data.value)
  });
}
onMounted(() => {

  window.addEventListener('message', event => {
    const message =JSON.parse(event.data);
    console.log('received',message)
    output.value.body = message.body;
    output.value.headers.splice(0,output.value.headers,...message.headers);
    output.value.cookies.splice(0,output.value.cookies,...message.cookies);
  });
})
</script>

<template>
  <div class="toolbar">
    <vscode-dropdown value="GET" v-model="data.method">
      <vscode-option>GET</vscode-option>
      <vscode-option>POST</vscode-option>
      <vscode-option>PUT</vscode-option>
      <vscode-option>PATCH</vscode-option>
      <vscode-option>DELETE</vscode-option>
      <vscode-option>HEAD</vscode-option>
      <vscode-option>OPTIONS</vscode-option>
    </vscode-dropdown>
    <vscode-text-field type="text" v-model="data.baseurl" class="urltext" placeholder="http://www.google.com"></vscode-text-field>
    <vscode-button appearance="primary" @click="runReq">SEND</vscode-button>
    <vscode-button appearance="primary" @click="saveReq">SAVE</vscode-button>
  </div>

  <div class="row1">
    <vscode-panels>
      <vscode-panel-tab id="tab-1">Params</vscode-panel-tab>
      <vscode-panel-tab id="tab-2">Authorisation</vscode-panel-tab>
      <vscode-panel-tab id="tab-3">Headers</vscode-panel-tab>
      <vscode-panel-tab id="tab-4">Body</vscode-panel-tab>
    
      <vscode-panel-tab id="tab-7">Overview</vscode-panel-tab>
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
      
      <vscode-panel-view id="view-7">
        <div class="tab-content">
          {{ JSON.stringify(data) }}
        </div>
      </vscode-panel-view>

    </vscode-panels>
  </div>

  <div class="row2">
    <vscode-panels>
      <vscode-panel-tab id="tab-1">Body</vscode-panel-tab>
      <vscode-panel-tab id="tab-2">Cookies</vscode-panel-tab>
      <vscode-panel-tab id="tab-3">Headers</vscode-panel-tab>
      <vscode-panel-tab id="tab-4">Result</vscode-panel-tab>

      <vscode-panel-view id="view-1">
        <vscode-textarea readonly>{{ output.body }}</vscode-textarea>
      </vscode-panel-view>
      <vscode-panel-view id="view-2">
        <vscode-data-grid aria-label="Basic">
          <vscode-data-grid-row row-type="header">
            <vscode-data-grid-cell cell-type="columnheader" grid-column="1">Cookie</vscode-data-grid-cell>
            <vscode-data-grid-cell cell-type="columnheader" grid-column="2">Value</vscode-data-grid-cell>
          </vscode-data-grid-row>
          <vscode-data-grid-row v-for="item in output.cookies" v-bind:key="item.name">
            <vscode-data-grid-cell grid-column="1">{{ item.name }}</vscode-data-grid-cell>
            <vscode-data-grid-cell grid-column="2">{{ item.value }}</vscode-data-grid-cell>
          </vscode-data-grid-row>
        </vscode-data-grid>
      </vscode-panel-view>
      <vscode-panel-view id="view-3">
        <vscode-data-grid aria-label="Basic">
          <vscode-data-grid-row row-type="header">
            <vscode-data-grid-cell cell-type="columnheader" grid-column="1">Headers</vscode-data-grid-cell>
            <vscode-data-grid-cell cell-type="columnheader" grid-column="2">Value</vscode-data-grid-cell>
          </vscode-data-grid-row>
          <vscode-data-grid-row v-for="item in output.headers" v-bind:key="item.name">
            <vscode-data-grid-cell grid-column="1">{{ item.name }}</vscode-data-grid-cell>
            <vscode-data-grid-cell grid-column="2">{{ item.value }}</vscode-data-grid-cell>
          </vscode-data-grid-row>
        </vscode-data-grid>
      </vscode-panel-view>

      <vscode-panel-view id="view-4">
        <vscode-textarea readonly>{{ output.result }}</vscode-textarea>

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
