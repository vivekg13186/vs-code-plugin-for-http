<template>
    <div class="container">
        <div class="tools">
            <vscode-button appearance="primary" @click="toogleEdit">Edit</vscode-button>
        </div>

        <vscode-data-grid aria-label="Basic" v-if="edit==false">
            <vscode-data-grid-row row-type="header">
                <vscode-data-grid-cell cell-type="columnheader" grid-column="1">Key</vscode-data-grid-cell>
                <vscode-data-grid-cell cell-type="columnheader" grid-column="2">Value</vscode-data-grid-cell>
            </vscode-data-grid-row>
            <vscode-data-grid-row>
                <vscode-data-grid-cell grid-column="1">Cell Data</vscode-data-grid-cell>
                <vscode-data-grid-cell grid-column="2">Cell Data</vscode-data-grid-cell>
            </vscode-data-grid-row>
            <vscode-data-grid-row>
                <vscode-data-grid-cell grid-column="1">Cell Data</vscode-data-grid-cell>

                <vscode-data-grid-cell grid-column="2">Cell Data</vscode-data-grid-cell>
            </vscode-data-grid-row>
            <vscode-data-grid-row>
                <vscode-data-grid-cell grid-column="1">Cell Data</vscode-data-grid-cell>

                <vscode-data-grid-cell grid-column="2">Cell Data</vscode-data-grid-cell>
            </vscode-data-grid-row>
        </vscode-data-grid>
        <vscode-text-area  class="editor" rows="10" v-if="edit==true"></vscode-text-area>
    </div>

</template>
<script setup>
import {ref} from "vue";

const edit = ref(false)
const toogleEdit = ()=>{
    edit.value = !edit.value;
}
</script>
<style scoped>
.tools{
    display: flex;
    width: 100%;
    align-items: flex-end;
}
.container{
    width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: flex-start;
        gap:10px;
}
.editor{
    width: 100%;
    height: 350px;
}
</style>