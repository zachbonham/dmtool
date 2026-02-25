<template>
  <div class="max-w-4xl mx-auto">
    <div class="text-center mb-12">
      <h2 class="text-3xl font-bold text-gray-800 mb-4">Welcome to the GM Campaign Preference Tool</h2>
      <p class="text-xl text-gray-600 mb-8">
        Help your gaming group align on campaign expectations before session zero
      </p>
      <div class="space-x-4">
        <NuxtLink
          to="/survey/create"
          class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Create Survey
        </NuxtLink>
        <NuxtLink
          to="/survey/take"
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          Take Survey
        </NuxtLink>
      </div>
    </div>

    <div class="grid md:grid-cols-2 gap-8">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-3">For Game Masters</h3>
        <p class="text-gray-600">
          Create structured surveys to understand what your players want from the campaign.
          Get data-driven insights to guide your session zero discussions.
        </p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-xl font-semibold text-gray-800 mb-3">For Players</h3>
        <p class="text-gray-600">
          Express your campaign preferences clearly. Help your GM understand what
          kind of game you want to play.
        </p>
      </div>
    </div>
  </div>
</template>