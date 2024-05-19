<template>
    <div id="editor" ref="editor_ref"></div>
</template>
<style scoped>
#editor {
    width: 100%;
    height: 350px;

}
</style>
<script setup>

import { ref, onMounted } from "vue";
import Iblize from "iblize";

const editor_ref = ref(null);
var editor = null;
onMounted(() => {
    editor = new Iblize(editor_ref.value, {
        language: "javascript",
    });
})

</script>