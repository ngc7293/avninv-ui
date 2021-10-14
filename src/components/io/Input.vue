<template>
    <div>
        <input v-if="edit" v-model.lazy="localValue" @blur="update"/>
        <span v-if="!edit">{{ modelValue }}</span>
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
        edit: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        update(_: any) {
            this.$emit('update:modelValue', this.localValue);
        },
    },
    mounted() {
        this.$nextTick(() => {
            this.localValue = this.modelValue;
        });
    }
});
</script>

<style>
</style>