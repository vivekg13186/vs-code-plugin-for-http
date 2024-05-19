<template>
    <div style="min-height: 350px;">
        <vscode-dropdown>
            <vscode-option value="noauth">No Auth</vscode-option>
            <vscode-option value="basic">Basic Authentication</vscode-option>
        </vscode-dropdown>
        <div v-if="mode =='basic'">
            <vscode-text-field>User name</vscode-text-field>
            <vscode-text-field>Password</vscode-text-field>
        </div>
    </div>
</template>
<script setup>
import {ref} from "vue";
const mode = ref("noauth");
</script>