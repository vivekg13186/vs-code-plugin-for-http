<template>
    <div class="container">
        <div class="tools">
            <vscode-button appearance="primary" @click="toogleEdit">{{btnLabel}}</vscode-button>
        </div>

        <vscode-data-grid aria-label="Basic" v-if="edit == false">
            <vscode-data-grid-row row-type="header">
                <vscode-data-grid-cell cell-type="columnheader" grid-column="1">{{ title }}</vscode-data-grid-cell>
                <vscode-data-grid-cell cell-type="columnheader" grid-column="2">Value</vscode-data-grid-cell>
            </vscode-data-grid-row>
            <vscode-data-grid-row v-for="item in data" v-bind:key="item.name">
                <vscode-data-grid-cell grid-column="1">{{ item.name }}</vscode-data-grid-cell>
                <vscode-data-grid-cell grid-column="2">{{ item.value }}</vscode-data-grid-cell>
            </vscode-data-grid-row>
        </vscode-data-grid>
        <vscode-text-area class="editor" rows="10" v-show="edit == true" v-model="textValue"> </vscode-text-area>
    </div>

</template>
<script setup>
import { ref } from "vue";

const props = defineProps({
    title: String,
    input:Array
})

const title = ref(props.title)

const data = ref(props.input)
const edit = ref(false)
const textValue = ref("")
const btnLabel = ref("Edit")

function split(str, c) { var index = str.indexOf(c); return index == -1 ? [] : [str.substring(0, index), str.substr(index + 1)] }

const toObj = () => {
    try {
        var result = [];
        textValue.value.split("\n").map(i => {
            var t = split(i, ":")
            if (t.length > 0)
                result.push({ name: t[0], value: t[1] })
        })
        data.value.splice(0, data.value.length, ...result)
    } catch (e) {
        return data.value.splice(0, data.value.length);
    }
}


const toText = () => {
    try {
        var text = data.value.map(i => {
            return `${i.name}:${i.value}`
        }).join("\n")
        console.log(text)
        textValue.value = text;
    } catch (e) {
        textValue.value = ""
    }

}
const toogleEdit = () => {

    edit.value = !edit.value;
    if (edit.value == true) {
        btnLabel.value ='Save'
        toText()
    } else {
        btnLabel.value='Edit'
        toObj()
    }
}
</script>
<style scoped>
.tools {
    display: flex;
    width: 100%;
    align-items: flex-end;
}

.container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    gap: 10px;

}

.editor {
    width: 100%;
 
}
</style>