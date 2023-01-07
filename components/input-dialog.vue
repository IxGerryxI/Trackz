<template>
    <v-dialog v-model="open" transition="v-scroll-x-reverse-transition" :close-on-back="false">
        <v-card>
            <v-card-title>{{ question.prompt }}</v-card-title>
            <v-card-text>
                <v-text-field ref="inputfield" v-model="value" :type="question.type"
                    :label="question.name"></v-text-field>
            </v-card-text>
            <v-card-actions>
                <v-btn @click="cancel">cancel</v-btn>
                <v-btn @click="confirm">continue</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>
<script setup>
const inputfield = ref(null); //reference to the input field element
const value = ref();
const question = ref({});
const resolve = ref(null);
const reject = ref(null);
const open = ref(false);

function ask(q) {
    return new Promise((res, rej) => {

        question.value = q;
        resolve.value = res;
        reject.value = rej;
        open.value = true;
        value.value = null; //reset the value in the input element
        nextTick(() => {
            inputfield.value.focus();
        })
    })
}

function cancel() {
    console.log('cancel', reject.value);
    closeDialog();
    reject.value();
}

function confirm() {
    console.log('confirm');
    closeDialog();
    resolve.value(value.value);
}

function closeDialog() {
    open.value = false;
}

defineExpose({
    ask,
});
</script>
<style scoped>

</style>