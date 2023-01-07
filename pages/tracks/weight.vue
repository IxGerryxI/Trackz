<template>
    <div class="d-flex flex-column full-height">
        <div class="flex-grow-1">
            <v-table fixed-header height="300px">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Weight</th>
                        <th>BMI</th>
                        <th>BF</th>
                        <th>Water</th>
                        <th>Muscle</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="weight of weights" :key="weight.date">
                        <td>
                            <date v-if="weight.creationdate"
                                :value="new Date(weight.creationdate?.seconds * 1000) || new Date(weight.creationdate)">
                            </date>
                        </td>
                        <td>{{ weight.weight }}kg</td>
                        <td>{{ weight.bmi }}</td>
                        <td>{{ weight.bodyfat }}%</td>
                        <td>{{ weight.water }}%</td>
                        <td>{{ weight.muscle }}%</td>
                    </tr>
                </tbody>
            </v-table>
        </div>
        <div class="footer">
            <v-btn color="primary" icon class="footer_btn" @click="addDataset">
                <v-icon size="x-large" icon="mdi-plus"></v-icon>
            </v-btn>
        </div>
        <InputDialog ref="inputDialog"></InputDialog>
    </div>
</template>
<script setup>
import { useWeightStore } from '~~/stores/weight';
const weightStore = useWeightStore();
if (!weightStore.loaded) await weightStore.load();
const weights = weightStore.items;

const questions = ref([
    { type: "number", prompt: "Weight", name: "Weight", key: "weight" },
    { type: "number", prompt: "BMI", name: "BMI", key: "bmi" },
    { type: "number", prompt: "Bodyfat", name: "Bodyfat", key: "bodyfat" },
    { type: "number", prompt: "Water", name: "Water", key: "water" },
    { type: "number", prompt: "Muscle", name: "Muscle", key: "muscle" },
]);

const inputDialog = ref(null);
async function addDataset() {
    const dataset = {};
    for (const question of questions.value) {
        const key = question.key;
        dataset[key] = await inputDialog.value.ask(question);
    }

    console.log(dataset);
    weightStore.add(dataset);
}

</script>
<style scoped>
.full-height {
    height: 100%;
}

.flex-grow-1 {
    flex-grow: 1;
}

.footer {
    position: relative;
    margin-top: 24px;
    height: 64px;
    background-color: rgba(33, 33, 33, 1);
}

.footer_btn {
    position: absolute;
    margin: auto;
    inset: -24px 0 auto 0;
    outline: 10px solid rgb(18, 18, 18);
}
</style>