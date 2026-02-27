<template>
  <div class="max-w-2xl mx-auto">
    <Card>
      <div class="text-center">
        <h1 class="text-3xl font-bold text-green-600 mb-2">Thank You!</h1>
        <p class="text-lg text-gray-700 mb-4">
          Your survey response has been recorded successfully.
        </p>
        <p class="text-gray-600 mb-6">
          Your feedback will help shape the campaign experience your GM creates.
        </p>

        <Button variant="primary" @click="$router.push('/')">
          Return to Home
        </Button>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
// Thank you page for survey completion
</script>
