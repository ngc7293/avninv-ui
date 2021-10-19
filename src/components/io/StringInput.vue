<template>
    <div>
        <input v-if="editing" v-model="localValue" @change="update"/>
        <span v-if="!editing">{{ modelValue }}</span>
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
    data() {
        return {
            localValue: ''
        }
    },
    props: {
        modelValue: {
            type: String,
            required: true
        },
        editing: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        update(_: any) {
            this.$emit('update:modelValue', this.localValue);
        },
    },
    watch: {
        modelValue(value: string, old: string) {
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