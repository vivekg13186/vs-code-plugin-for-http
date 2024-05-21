<template>

    <div class="root">
        <div class="panel1">
            <vscode-dropdown v-model="input[0].type" style="width: 200px;">
                <vscode-option value="none">none</vscode-option>
                <vscode-option value="form-data">form-data</vscode-option>
                <vscode-option value="x-www-form-urlencoded">x-www-form-urlencoded</vscode-option>
                <vscode-option value="raw">raw</vscode-option>
                <vscode-option value="binary">binary</vscode-option>
            </vscode-dropdown>
            <vscode-dropdown v-model="input[0].mimeType" style="width: 200px;" v-show="input[0].type == 'raw'">
                <vscode-option value="text">Text</vscode-option>
                <vscode-option value="json">JSON</vscode-option>
                <vscode-option value="xml">XML</vscode-option>
                <vscode-option value="javascript">Javascript</vscode-option>
                <vscode-option value="html">HTML</vscode-option>

            </vscode-dropdown>
        </div>
        <div class="panel2">
            <KeyValue title="Form Field" :input="input[0].keyValues"
                v-show="input[0].type == 'form-data' || input[0].type == 'x-www-form-urlencoded'" />


            <JsEdit v-show="input[0].type == 'raw'" :input="input[0].text"></JsEdit>
            <vscode-text-field type="text" v-model="input[0].filepath" placeholder="c:\User\a.txt"
                v-show="input[0].type == 'binary'">File path</vscode-text-field>
        </div>
    </div>


</template>
<script setup>
import { ref } from "vue";
import KeyValue from "./KeyValue.vue";
import JsEdit from "./JsEdit.vue";

const props = defineProps({
    input: Array
})
const input = ref(props.input)


</script>
<style scoped>
.root {
    display: flex;
    flex-direction: row;
    height: 100%;
}

.panel1 {
    display: flex;
    flex-direction: column;
    margin-right: 10px;
    padding-right: 10px;
    gap: 10px;
    border-right: 1px solid #888;
}


.panel2 {
    display: flex;
    flex-direction: row;

    flex-grow: 1;
}
</style>