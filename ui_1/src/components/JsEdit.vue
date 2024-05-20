<template>
    <div id="editor" ref="editor_ref" ></div>
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
const props = defineProps({
    input:Array
})
const editor_ref = ref(null);
var editor = null;
const code = ref(props.input);
 
onMounted(() => {
    editor = new Iblize(editor_ref.value, {
        language: "javascript",
    });
    editor.setValue(code.value[0])
    editor.onUpdate((value) => {
        console.log(value)
        code.value.splice(0,1,value);
        return value;
   });
})

</script>