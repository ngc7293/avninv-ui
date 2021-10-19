<template>
    <div>
        <input v-if="editing" v-model="localValue" @change="update" type="number" />
        <span v-if="!editing">{{ modelValue }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            localValue: 0
        }
    },
    props: {
        modelValue: {
            type: Number,
            required: true
        },
        editing: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        update(_: any) {
            this.localValue = +this.localValue;
            this.$emit('update:modelValue', this.localValue);

        },
    },
    watch: {
        modelValue(value, old) {
            this.localValue = value;
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.localValue = this.modelValue;
        })
    }
});
</script>

<style>
</style>