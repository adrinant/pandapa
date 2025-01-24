<template>
  <div class="max-w-2xl mx-auto p-4 bg-white shadow-md rounded-lg mt-8">
    <h2 class="text-3xl font-bold text-center text-gray-800 mb-4">
      The Write to Educate: 30-Day Challenge Leaderboard
    </h2>
    <h3 class="text-l text-gray-600 text-center mb-8">
      Join the Movement to Transform Education Through Words – Daily Updates and Rankings!
    </h3>
    <LeaderboardEntry v-for="entry in leaderboardData" :key="entry.rank" :rank="entry.rank" :teamName="entry.teamName"
      :institution="entry.institution" :currentScore="entry.currentScore" :teamMembers="entry.teamMembers" />

    <h4 class="text-m text-gray-600 text-center mt-8">
      Find the detailed assessment
      <a href="https://docs.google.com/spreadsheets/d/1oCAoRqFwjoyyCWNMK5n9sagum0EGfEBGmqLQ8wZbE0A/edit?gid=0#gid=0" class="text-blue-400">Spreadsheets.</a>
    </h4>
  </div>

  <footer class="mt-8 text-center text-gray-500 text-sm">
    By Pandapa Project @2025
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { supabase } from './supabase';
import LeaderboardEntry from './components/LeaderboardEntry.vue';

interface LeaderboardEntry {
  rank: number;
  teamName: string;
  institution: string;
  currentScore: number;
  teamMembers: string[];
}

const leaderboardData = ref<LeaderboardEntry[]>([]);

async function fetchLeaderboard() {
  const { data: teams, error } = await supabase
    .from('teams')
    .select('*')
    .order('score', { ascending: false });

  if (error) {
    console.error('Error fetching teams:', error);
    return;
  }

  // Fetch team members for each team
  const entries = await Promise.all(
    teams.map(async (team) => {
      const { data: members, error: memberError } = await supabase
        .from('team_members')
        .select('name')
        .eq('team_id', team.id);

      if (memberError) {
        console.error('Error fetching team members:', memberError);
        return null;
      }

      return {
        rank: 0, // Will be updated below
        teamName: team.team_name,
        institution: team.institution_name,
        currentScore: team.score,
        teamMembers: members.map((member) => member.name),
      };
    })
  );

  // Filter out null entries and assign ranks
  leaderboardData.value = entries
    .filter((entry): entry is LeaderboardEntry => entry !== null)
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
}

onMounted(() => {
  fetchLeaderboard();
});
</script>

<style scoped>
/* Add custom styles here if needed */
</style>