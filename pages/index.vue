<template>
    <div>
        <div class="tracks_container">
            <v-card v-for="(track, index) of tracks" :key="track.key" class="track">
                <NuxtLink :to="track.link" class="link">
                    <v-icon size="84">{{ track.icon }}</v-icon>
                    <div>{{ track.name }}</div>
                </NuxtLink>
            </v-card>
        </div>
    </div>
</template>

<script setup>
const tracks = [
    { name: 'Gewicht', key: 'weight', icon: 'mdi-scale-bathroom', link: "/tracks/weight" },
    { name: 'Blutdruck', key: 'bloodpressure', icon: 'mdi-meter-gas', link: "/tracks/bloodpressure" },
    { name: 'Einkaufen', key: 'shopping', icon: 'mdi-cart', link: "/tracks/shopping" },
    { name: 'Essen', key: 'food', icon: 'mdi-pasta', link: "/tracks/food" },
    { name: 'Workout', key: 'workout', icon: 'mdi-dumbbell', link: "/tracks/workout" },
]
</script>

<style scoped>
.link {
    text-decoration: none;
    color: inherit;
}

.tracks_container {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    justify-content: center;
    padding: 20px 10px;
}

.track {
    padding: 10px 23px;
    text-align: center;
}

.track div {
    margin-top: 12px;
}
</style>