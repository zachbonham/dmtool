<template>
  <div class="min-h-screen bg-gray-100">
    <header class="bg-white shadow-sm">
      <div class="container mx-auto px-4 py-4">
        <div class="flex items-center justify-between">
          <NuxtLink to="/" class="text-2xl font-bold text-gray-800">
            GM Campaign Tool
          </NuxtLink>
          <nav class="space-x-6">
            <NuxtLink to="/" class="text-gray-600 hover:text-gray-800 transition-colors">
              Home
            </NuxtLink>
            <NuxtLink to="/surveys" class="text-gray-600 hover:text-gray-800 transition-colors">
              My Surveys
            </NuxtLink>
           
          </nav>
        </div>
      </div>
    </header>

    <main class="container mx-auto px-4 py-8">
      <slot />
    </main>

    <footer class="bg-white border-t mt-16">
      <div class="container mx-auto px-4 py-6">
        <p class="text-center text-gray-600">
          © 2025 GM Campaign Preference Tool. Helping GMs align their tables.
        </p>
      </div>
    </footer>
  </div>
</template>