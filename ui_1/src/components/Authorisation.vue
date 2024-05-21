<template>
    <div class="root">
        <div class="panel1"><vscode-dropdown v-model="data[0].type" style="width: 200px;">
            <vscode-option value="noauth">No Auth</vscode-option>
            <vscode-option value="basic">Basic Authentication</vscode-option>
        </vscode-dropdown></div>
        <div class="panel2"  v-if="data[0].type =='basic'"  >  
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
    flex-direction: column;
    gap: 10px;
    flex-grow: 1;
}
</style>