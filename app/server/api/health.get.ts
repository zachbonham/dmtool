export default defineEventHandler(() => {
  return {
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'GM Campaign Preference Tool API is running'
  }
})