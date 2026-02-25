<template>
  <div class="max-w-2xl mx-auto">
    <Card>
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Take Survey</h1>
      <p class="text-gray-600 mb-6">
        This feature will allow players to complete preference surveys
        and provide feedback to their GM.
      </p>
      <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <p class="text-blue-800">
          <strong>Coming Soon:</strong> Interactive survey interface with multiple question types.
        </p>
      </div>
      <div class="mt-6">
        <Button variant="secondary" @click="$router.back()">
          ← Back to Home
        </Button>
      </div>
    </Card>
  </div>
</template>

<script setup lang="ts">
// Placeholder page for taking surveys
</script>