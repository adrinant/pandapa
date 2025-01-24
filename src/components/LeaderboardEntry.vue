<template>
    <div class="border-b py-2">
      <div class="flex items-center justify-between">
        <div class="flex items-center space-x-4">
          <span class="font-bold w-10">{{ rank }}</span>
          <div>
            <div class="flex items-center">
              <span class="font-semibold mr-2">{{ teamName }}</span>
              <button
                v-if="teamMembers.length > 0"
                @click="toggleExpanded"
                class="text-gray-500"
              >
                <component :is="expanded ? ChevronDown : ChevronRight" :size="16" />
              </button>
            </div>
            <span class="text-gray-600">{{ institution }}</span>
          </div>
        </div>
        <span class="font-bold">{{ currentScore }} pts</span>
      </div>
      <div v-if="expanded && teamMembers.length > 0" class="ml-14 mt-2 text-sm text-gray-700">
        <strong>Team Members:</strong>
        <ul class="list-disc list-inside">
          <li v-for="(member, index) in teamMembers" :key="index">{{ member }}</li>
        </ul>
      </div>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { ChevronDown, ChevronRight } from 'lucide-vue-next';
  
  // Destructure props directly
  const { rank, teamName, institution, currentScore, teamMembers } = defineProps<{
    rank: number;
    teamName: string;
    institution: string;
    currentScore: number;
    teamMembers: string[];
  }>();
  
  const expanded = ref(false);
  
  function toggleExpanded() {
    expanded.value = !expanded.value;
  }
  </script>
  
  <style scoped>
  /* Add custom styles here if needed */
  </style>