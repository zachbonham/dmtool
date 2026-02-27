<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  surveyUrl: string
  copied?: boolean
}

defineProps<Props>()
defineEmits<{
  copy: []
}>()
</script>

<template>
  <div class="flex items-center space-x-2">
    <div class="flex-1">
      <input
        type="text"
        :value="surveyUrl"
        readonly
        class="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-sm"
      />
    </div>
    <Button
      variant="primary"
      size="sm"
      @click="$emit('copy')"
    >
      {{ copied ? '✓ Copied' : 'Copy Link' }}
    </Button>
  </div>
</template>