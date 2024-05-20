<template>
    <div style="min-height: 280px;width: 100%;">
        <div>
            <div class="options">
                <vscode-radio-group  >
                    <vscode-radio @click="changeValue('none')">none</vscode-radio>
                    <vscode-radio @click="changeValue('form-data')">form-data</vscode-radio>
                    <vscode-radio @click="changeValue('x-www-form-urlencoded')">x-www-form-urlencoded</vscode-radio>
                    <vscode-radio @click="changeValue('raw')">raw</vscode-radio>
                    <vscode-radio @click="changeValue('binary')">binary</vscode-radio>
                </vscode-radio-group>
               
                

 

            </div>
            <div style="width: 98%;margin-top: 5px; border: 1px solid #8888;padding: 10px; border-radius: 4px;">
                <KeyValue title="Form Field" :input="input[0].keyValues" v-show="input[0].type == 'form-data' || input[0].type == 'x-www-form-urlencoded'"/>
   
                <vscode-radio-group  v-show="input[0].type == 'raw'">
                    <vscode-radio @click="changeValue1('text')">Text</vscode-radio>
                    <vscode-radio @click="changeValue1('json')">JSON</vscode-radio>
                    <vscode-radio @click="changeValue1('xml')">XML</vscode-radio>
                    <vscode-radio @click="changeValue1('javascript')">Javascript</vscode-radio>
                    <vscode-radio @click="changeValue1('html')">HTML</vscode-radio>
                </vscode-radio-group>
                <JsEdit v-show="input[0].type == 'raw'" :input="input[0].text" ></JsEdit>
                <vscode-text-field type="text"  v-model="input[0].filepath"   placeholder="c:\User\a.txt" v-show="input[0].type== 'binary'"  >File path</vscode-text-field>
            </div>
        </div>
    </div>

</template>
<script setup>
import { ref } from "vue";
import KeyValue from "./KeyValue.vue";
import JsEdit from "./JsEdit.vue";

const props = defineProps({
    input:Array
})
const input = ref(props.input)
 
const changeValue = (v) => {
 
    input.value[0].type=v;
}
const changeValue1 = (v) => {
    input.value[0].mimeType=v;
}
</script>
<style scoped>
.options {
    display: flex;
    flex-direction: row;
    align-items: center;
}
</style>