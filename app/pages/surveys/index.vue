<template>
  <div>
    <div class="mb-6 flex items-center justify-between">
      <h1 class="text-2xl font-bold text-gray-800">My Surveys</h1>
      <NuxtLink
        to="/surveys/create"
        class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center gap-2"
      >
        <Icon name="material-symbols:add" class="w-5 h-5" />
        New Survey
      </NuxtLink>
    </div>

    <template v-if="loading">
      <Card>
        <p class="text-center text-gray-600">Loading surveys...</p>
      </Card>
    </template>

    <template v-else-if="surveys.length === 0">
      <Card>
        <div class="text-center py-8">
          <h2 class="text-xl font-semibold text-gray-800 mb-2">No surveys yet</h2>
          <p class="text-gray-600 mb-4">
            Create your first survey to start gathering player preferences.
          </p>
          <NuxtLink
            to="/surveys/create"
            class="text-blue-600 hover:text-blue-700 font-medium"
          >
            Create a Survey →
          </NuxtLink>
        </div>
      </Card>
    </template>

    <template v-else>
      <div class="space-y-4">
        <Card 
          v-for="survey in surveys" 
          :key="survey.id" 
          class="cursor-pointer hover:shadow-lg transition-shadow"
          @click="viewResults(survey.id)"
        >
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-800">{{ survey.title }}</h3>
              <p v-if="survey.description" class="text-sm text-gray-600 mt-1">
                {{ survey.description }}
              </p>
              <div class="flex items-center space-x-4 mt-3 text-sm text-gray-500">
                <span>{{ getResponseCount(survey.id) }} responses</span>
                <span>{{ formatDate(new Date(survey.created_at)) }}</span>
              </div>
            </div>
            <div class="flex space-x-2 ml-4">
              <Button
                variant="secondary"
                size="sm"
                @click.stop="copySurveyLink(survey.id)"
                :title="copiedSurveyId === survey.id ? 'Copied!' : 'Copy survey link'"
              >
                <Icon v-if="copiedSurveyId === survey.id" name="material-symbols:check" class="w-5 h-5" />
                <Icon v-else name="material-symbols:content-copy-outline" class="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                @click.stop="viewResults(survey.id)"
                title="View results"
              >
                <Icon name="material-symbols:bar-chart" class="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                @click.stop="deleteSurvey(survey.id)"
                title="Delete survey"
              >
                <Icon name="material-symbols:delete-outline" class="w-5 h-5" />
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
type Survey = any

const supabase = useSupabaseClient()
const router = useRouter()

const loading = ref(false)
const surveys = ref<Survey[]>([])
const responseCounts = ref<Record<string, number>>({})
const copiedSurveyId = ref<string | null>(null)

/**
 * Convert UUID to URL-friendly base64 token
 */
function uuidToToken(uuid: string): string {
  // Remove hyphens from UUID
  const hex = uuid.replace(/-/g, '')
  
  // Convert hex to bytes
  const bytes = new Uint8Array(hex.match(/.{1,2}/g)!.map(byte => parseInt(byte, 16)))
  
  // Convert to base64
  const base64 = btoa(String.fromCharCode(...bytes))
  
  // Make URL-safe (base64url encoding)
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '')
}

onMounted(async () => {
  await loadSurveys()
})

const loadSurveys = async () => {
  loading.value = true
  try {
    const { data, error } = await supabase
      .from('surveys')
      .select()
      .order('created_at', { ascending: false })

    if (error) throw error
    surveys.value = data || []

    // Load response counts for each survey
    for (const survey of surveys.value) {
      const { count } = await supabase
        .from('survey_responses')
        .select('*', { count: 'exact' })
        .eq('survey_id', survey.id)

      responseCounts.value[survey.id] = count || 0
    }
  } catch (error) {
    console.error('Error loading surveys:', error)
  } finally {
    loading.value = false
  }
}

const getResponseCount = (surveyId: string) => {
  return responseCounts.value[surveyId] || 0
}

const copySurveyLink = async (surveyId: string) => {
  const token = uuidToToken(surveyId)
  const url = `${window.location.origin}/survey/${token}`
  await navigator.clipboard.writeText(url)
  copiedSurveyId.value = surveyId

  setTimeout(() => {
    copiedSurveyId.value = null
  }, 2000)
}

const viewResults = (surveyId: string) => {
  router.push(`/surveys/${surveyId}/results`)
}

const deleteSurvey = async (surveyId: string) => {
  if (!confirm('Are you sure you want to delete this survey? This cannot be undone.')) {
    return
  }

  try {
    const { error } = await supabase
      .from('surveys')
      .delete()
      .eq('id', surveyId)

    if (error) throw error
    await loadSurveys()
  } catch (error) {
    console.error('Error deleting survey:', error)
    alert('Failed to delete survey')
  }
}

const formatDate = (date: Date) => {
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
}
</script>