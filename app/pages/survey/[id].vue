<template>
  <div class="max-w-2xl mx-auto">
    <template v-if="loading">
      <Card>
        <p class="text-center text-gray-600">Loading survey...</p>
      </Card>
    </template>

    <template v-else-if="error">
      <Card>
        <div class="text-center">
          <h2 class="text-2xl font-bold text-gray-800 mb-2">Survey Not Found</h2>
          <p class="text-gray-600 mb-4">{{ error }}</p>
          <Button variant="secondary" @click="$router.push('/')">
            <- Return to Home
          </Button>
        </div>
      </Card>
    </template>

    <template v-else-if="survey">
      <Card>
        <h1 class="text-2xl font-bold text-gray-800 mb-2">{{ survey.title }}</h1>
        <p v-if="survey.description" class="text-gray-600 mb-6">
          {{ survey.description }}
        </p>

        <form @submit.prevent="submitSurvey" class="space-y-6">
          <div v-for="(question, index) in (survey.questions as any[])" :key="index" class="space-y-3">
            <h3 class="font-medium text-gray-800">{{ question.text }}</h3>
            <div class="space-y-2">
              <label v-for="option in question.options" :key="option.value" class="flex items-center">
                <input
                  type="radio"
                  :name="`question-${index}`"
                  :value="option.value"
                  v-model.number="responses[index as number]"
                  :required="true"
                  class="mr-3"
                />
                <span class="text-sm">{{ option.label }}</span>
              </label>
            </div>
          </div>

          <div class="flex space-x-4">
            <Button type="submit" :disabled="submitting">
              {{ submitting ? 'Submitting...' : 'Submit Survey' }}
            </Button>
            <Button variant="secondary" @click="$router.back()">
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </template>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const router = useRouter()
const supabase = useSupabaseClient()

const loading = ref(true)
const submitting = ref(false)
const error = ref<string | null>(null)
const survey = ref<any>(null)
const responses = ref<Record<number, number>>({})

onMounted(async () => {
  const surveyId = route.params.id as string

  try {
    const { data, error: fetchError } = await supabase
      .from('surveys')
      .select()
      .eq('id', surveyId)
      .single()

    if (fetchError || !data) {
      error.value = 'Survey not found or has been deleted.'
      loading.value = false
      return
    }

    survey.value = data
  } catch (err) {
    error.value = 'An error occurred while loading the survey.'
  } finally {
    loading.value = false
  }
})

const submitSurvey = async () => {
  if (!survey.value) return

  submitting.value = true

  try {
    // Convert responses object to array format while preserving order
    const responsesArray = Object.keys(responses.value)
      .sort((a, b) => Number(a) - Number(b))
      .map(key => responses.value[Number(key)])

    const result: any = await (supabase as any)
      .from('survey_responses')
      .insert([
        {
          survey_id: survey.value.id,
          responses: responsesArray
        }
      ])

    if (result.error) throw result.error

    await router.push('/survey/thank-you')
  } catch (err) {
    alert('Failed to submit survey. Please try again.')
    console.error(err)
  } finally {
    submitting.value = false
  }
}
</script>
