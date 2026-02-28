<script setup lang="ts">
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
      :title="copied ? 'Copied!' : 'Copy survey link'"
    >
      <Icon v-if="copied" name="material-symbols:check" class="w-5 h-5" />
      <Icon v-else name="material-symbols:content-copy-outline" class="w-5 h-5" />
    </Button>
  </div>
</template>