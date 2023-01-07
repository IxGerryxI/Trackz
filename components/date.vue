<template>
    <span>{{ formatted }}</span>
</template>

<script setup>
const props = defineProps({
    "value": {
        type: Date,
    },
    "time": {
        type: Boolean,
        default: false,
    },
    "datetime": {
        type: Boolean,
        default: false,
    },
    "date": {
        type: Boolean,
        default: false,
    },
    "includeseconds": {
        type: Boolean,
        default: false,
    }
});

const formatted = computed({
    get() {
        if (props.datetime) return formattedDateTime.value;
        if (props.time) return formattedTime.value;
        return formattedDate.value;
    },
})
/**
 * formats a Date into a String dd.MM.yyyy HH:mm[:ss]
 * @returns {String}
 */
const formattedDateTime = computed({
    get() {
        return `${formattedDate} ${formattedTime}`;
    }
})

/**
 * formats a Date into a String dd.MM.yyyy
 * @returns {String}
 */
const formattedDate = computed({
    get() {
        let y = props.value.getFullYear().toString();
        let m = props.value.getMonth() + 1 + "";
        m = m.length < 2 ? 0 + m : m;
        let d = props.value.getDate().toString();
        d = d.length < 2 ? 0 + d : d;

        const dateString = `${d}.${m}.${y}`;
        console.log(dateString)
        return dateString; //`${d}.${m}.${y}`;
    }
})
/**
 * formats a Date into a String HH:mm[:ss]
 * @returns {String}
 */
const formattedTime = computed({
    get() {
        let h = props.value.getHours() + "";
        h = h.length < 2 ? 0 + h : h;
        let min = props.value.getMinutes() + "";
        min = min.length < 2 ? 0 + min : min;

        if (props.includeseconds) {
            let s = props.value.getSeconds() + "";
            s = s.length < 2 ? 0 + s : s;
            return `${h}:${min}:${s}`;
        }

        return `${h}:${min}`;
    }
})
</script>