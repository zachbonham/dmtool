<template>
  <div class="max-w-4xl mx-auto">
    <div class="mb-6">
      <Button variant="secondary" @click="$router.back()">
        ← Back to Surveys
      </Button>
    </div>

    <template v-if="loading">
      <Card>
        <p class="text-center text-gray-600">Loading results...</p>
      </Card>
    </template>

    <template v-else-if="error">
      <Card>
        <p class="text-center text-red-600">{{ error }}</p>
      </Card>
    </template>

    <template v-else-if="survey">
      <Card>
        <div class="mb-6">
          <h1 class="text-2xl font-bold text-gray-800">{{ survey.title }}</h1>
          <p v-if="survey.description" class="text-gray-600 mt-2">
            {{ survey.description }}
          </p>
          <div class="mt-4 text-sm text-gray-500">
            <p>Total Responses: <span class="font-semibold">{{ responses.length }}</span></p>
            <p>Created: {{ formatDate(new Date(survey.created_at)) }}</p>
          </div>
        </div>

        <div class="mb-6">
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Survey Link</h2>
          <SurveyLinkShare
            :survey-url="`${baseUrl}/survey/${survey.id}`"
            :copied="copied"
            @copy="copySurveyLink"
          />
        </div>

        <div v-if="responses.length === 0" class="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p class="text-blue-800">No responses yet. Share the survey link with your players to start collecting feedback.</p>
        </div>

        <template v-else>
          <h2 class="text-lg font-semibold text-gray-800 mb-4">Responses</h2>
          <div class="space-y-4">
            <Card v-for="(response, index) in responses" :key="response.id" class="bg-gray-50">
              <h3 class="font-medium text-gray-800 mb-3">Response {{ index + 1 }}</h3>
              <dl class="space-y-2">
                <div v-for="(answer, qIndex) in response.responses as number[]" :key="qIndex" class="flex">
                  <dt class="text-sm font-medium text-gray-700 min-w-max mr-4">
                    Q{{ Number(qIndex) + 1 }}:
                  </dt>
                  <dd class="text-sm text-gray-600">
                    {{ getAnswerLabel(Number(qIndex), answer as number) }}
                  </dd>
                </div>
              </dl>
              <p class="text-xs text-gray-500 mt-3">
                {{ formatDate(new Date(response.submitted_at)) }}
              </p>
            </Card>
          </div>
        </template>
      </Card>
    </template>
  </div>
</template>

<script setup lang="ts">
type Survey = any
type SurveyResponse = any

const route = useRoute()
const supabase = useSupabaseClient()

const loading = ref(true)
const error = ref<string | null>(null)
const survey = ref<Survey | null>(null)
const responses = ref<SurveyResponse[]>([])
const copied = ref(false)
const baseUrl = ref(typeof window !== 'undefined' ? window.location.origin : '')

onMounted(async () => {
  const surveyId = route.params.id as string

  try {
    // Load survey
    const { data: surveyData, error: surveyError } = await supabase
      .from('surveys')
      .select()
      .eq('id', surveyId)
      .single()

    if (surveyError || !surveyData) {
      error.value = 'Survey not found'
      loading.value = false
      return
    }

    survey.value = surveyData

    // Load responses
    const { data: responsesData, error: responsesError } = await supabase
      .from('survey_responses')
      .select()
      .eq('survey_id', surveyId)
      .order('submitted_at', { ascending: false })

    if (responsesError) throw responsesError
    responses.value = responsesData || []

    loading.value = false
  } catch (err) {
    error.value = 'An error occurred while loading results'
    loading.value = false
  }
})

const copySurveyLink = async () => {
  if (!survey.value) return

  const url = `${baseUrl.value}/survey/${survey.value.id}`
  await navigator.clipboard.writeText(url)
  copied.value = true

  setTimeout(() => {
    copied.value = false
  }, 2000)
}

const getAnswerLabel = (questionIndex: number, answer: number) => {
  if (!survey.value) return `Answer: ${answer}`

  const questions = survey.value.questions as Array<{
    text: string
    options: Array<{ value: number; label: string }>
  }>

  const question = questions[questionIndex]
  const option = question?.options.find((o: any) => o.value === answer)

  return option?.label || `Answer: ${answer}`
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
}
</script>