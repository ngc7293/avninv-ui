<template>
    <div>
        <select v-if="editing" v-model="display" @blur="update">
            <option v-for="option in options" :key="option.id">{{ option.display }}</option>
        </select>
        <span v-if="!editing">{{ display }}</span>
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
        options: {
            type: Array,
            required: true
        },
        editing: {
            type: Boolean,
            required: true
        }
    },
    computed: {
        display: { 
            get() {
                for (let option of (this.options as Array<{id:string, display:string}>)) {
                    if (this.localValue == option.id) {
                        return option.display
                    }
                }
            },
            set(value: string) {
                for (let option of (this.options as Array<{id:string, display:string}>)) {
                    if (value == option.display) {
                        this.localValue = option.id;
                        break;
                    }
                }
            }
        }
    },
    methods: {
        update(_: any) {
            this.$emit('update:modelValue', this.localValue);
        }
    },
    mounted() {
        this.$nextTick(() => {
            this.localValue = this.modelValue;
            if (this.options) {
                this.display = (this.options[0] as {display: string}).display;
            }
        });
    }
});
</script>

<style>
</style>