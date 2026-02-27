import { z } from 'zod'
import { createClient } from '@supabase/supabase-js'

const surveySchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().optional(),
  questions: z.array(z.object({
    text: z.string(),
    options: z.array(z.object({
      value: z.number(),
      label: z.string()
    }))
  }))
})

export default defineEventHandler(async (event) => {
  const method = event.node.req.method

  if (method === 'POST') {
    try {
      const body = await readBody(event)

      // Validate input
      const validatedData = surveySchema.parse(body)

      // Create Supabase client for server-side operations
      const supabaseUrl = process.env.SUPABASE_URL || ''
      const supabaseKey = process.env.SUPABASE_ANON_KEY || ''
      const supabase = createClient(supabaseUrl, supabaseKey)

      const { data, error } = await supabase
        .from('surveys')
        .insert({
          title: validatedData.title,
          description: validatedData.description || null,
          questions: validatedData.questions
        })
        .select()
        .single()

      if (error) {
        console.error('Database error:', error)
        throw createError({
          statusCode: 500,
          statusMessage: 'Failed to create survey'
        })
      }

      // Generate shareable URL
      const surveyUrl = `${getRequestURL(event).origin}/survey/${data.id}`

      return {
        success: true,
        survey: data,
        shareableUrl: surveyUrl
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw createError({
          statusCode: 400,
          statusMessage: 'Validation error',
          data: error.issues
        })
      }

      if (error instanceof Error) {
        throw createError({
          statusCode: 500,
          statusMessage: error.message || 'Internal server error'
        })
      }

      throw createError({
        statusCode: 500,
        statusMessage: 'Internal server error'
      })
    }
  }

  throw createError({
    statusCode: 405,
    statusMessage: 'Method not allowed'
  })
})
