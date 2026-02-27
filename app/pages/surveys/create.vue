<template>
  <div class="max-w-2xl mx-auto">
    <Card>
      <h1 class="text-2xl font-bold text-gray-800 mb-6">Create New Survey</h1>

      <div v-if="errors.submit" class="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
        <p class="text-red-800">{{ errors.submit }}</p>
      </div>

      <form @submit.prevent="handleSubmit" class="space-y-6">
        <FormInput
          id="title"
          label="Campaign Title"
          v-model="form.title"
          placeholder="e.g., Curse of Strahd Campaign"
          required
          :error="errors.title"
        />

        <div>
          <label for="description" class="block text-sm font-medium text-gray-700 mb-1">
            Campaign Description (Optional)
          </label>
          <textarea
            id="description"
            v-model="form.description"
            rows="3"
            class="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="Brief description of your campaign..."
          ></textarea>
        </div>

        <div>
          <h3 class="text-lg font-medium text-gray-800 mb-3">Survey Questions</h3>
          <p class="text-sm text-gray-600 mb-4">
            These questions will help identify your players' campaign preferences.
          </p>

          <div class="space-y-4">
            <div v-for="(question, index) in form.questions" :key="index" class="border border-gray-200 rounded-lg p-4">
              <h4 class="font-medium text-gray-800 mb-2">{{ question.text }}</h4>
              <div class="space-y-2">
                <label v-for="option in question.options" :key="option.value" class="flex items-center">
                  <input
                    type="radio"
                    :name="`question-${index}`"
                    :value="option.value"
                    class="mr-2"
                    disabled
                  />
                  <span class="text-sm">{{ option.label }}</span>
                </label>
              </div>
            </div>
          </div>
        </div>

        <div class="flex space-x-4">
          <Button type="submit" :disabled="loading" variant="primary">
            {{ loading ? 'Creating Survey...' : 'Create Survey' }}
          </Button>
          <Button variant="secondary" @click="$router.back()">
            Cancel
          </Button>
        </div>
      </form>
    </Card>
  </div>
</template>

<script setup lang="ts">
const form = ref({
  title: '',
  description: '',
  questions: [
    {
      text: "How much combat do you enjoy in RPG campaigns?",
      options: [
        { value: 1, label: "I prefer story-focused campaigns with minimal combat" },
        { value: 2, label: "Some combat is okay, but not the main focus" },
        { value: 3, label: "I enjoy a good balance of combat and story" },
        { value: 4, label: "Combat is exciting and I want plenty of it" },
        { value: 5, label: "I love tactical combat-heavy campaigns" }
      ]
    },
    {
      text: "What's your preferred campaign style?",
      options: [
        { value: 1, label: "Open sandbox where players can go anywhere" },
        { value: 2, label: "Guided story with some player freedom" },
        { value: 3, label: "Mix of story and exploration" },
        { value: 4, label: "Structured plot with key events" },
        { value: 5, label: "Railroad story with predetermined outcomes" }
      ]
    },
    {
      text: "How important is character drama and relationships?",
      options: [
        { value: 1, label: "Not important - focus on action and adventure" },
        { value: 2, label: "Some character development is nice" },
        { value: 3, label: "Character relationships are important to me" },
        { value: 4, label: "I love deep character-driven stories" },
        { value: 5, label: "Character drama is the most important element" }
      ]
    },
    {
      text: "Do you enjoy complex tactical challenges?",
      options: [
        { value: 1, label: "I prefer simple, fast-paced gameplay" },
        { value: 2, label: "Some tactics are fun but not too complex" },
        { value: 3, label: "I enjoy moderate tactical challenges" },
        { value: 4, label: "I love complex tactical combat and puzzles" },
        { value: 5, label: "Tactical depth is what I crave in RPGs" }
      ]
    }
  ]
})

const errors = ref<Record<string, string>>({})
const loading = ref(false)
const router = useRouter()

const handleSubmit = async () => {
  errors.value = {}

  // Client-side validation
  if (!form.value.title.trim()) {
    errors.value.title = 'Campaign title is required'
    return
  }

  loading.value = true

  try {
    const response = await fetch('/api/surveys', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        title: form.value.title.trim(),
        description: form.value.description.trim() || null,
        questions: form.value.questions
      })
    })

    if (!response.ok) {
      const error = await response.json()
      throw new Error(error.statusMessage || 'Failed to create survey')
    }

    // Success - redirect to surveys management page
    await router.push('/surveys')
  } catch (error: any) {
    console.error('Error creating survey:', error)
    errors.value.submit = error.message || 'Failed to create survey. Please try again.'
  } finally {
    loading.value = false
  }
}
</script>