<template>
    <div style="min-height: 350px;">
        <vscode-dropdown v-model="data[0].type" style="width: 200px;">
            <vscode-option value="noauth">No Auth</vscode-option>
            <vscode-option value="basic">Basic Authentication</vscode-option>
        </vscode-dropdown>
        <div v-if="data[0].type =='basic'" class="row">
            <vscode-text-field v-model="data[0].username">User name</vscode-text-field>
            <vscode-text-field v-model="data[0].password">Password</vscode-text-field>
        </div>
    </div>
</template>
<script setup>
import {ref} from "vue";
const props = defineProps({
    input:Array
})

const data = ref(props.input);
 
</script>
<style scoped>
.row{
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 20px;
}
</style>