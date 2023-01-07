<template>
    <div class="fill-height">
        <v-app-bar app>
            <NuxtLink to="/" class="link ml-5">
                <v-toolbar-title>SimpleTrackz</v-toolbar-title>
            </NuxtLink>
            <v-spacer></v-spacer>
            <NuxtLink to="/login" class="link mr-5">
                <v-icon>mdi-account</v-icon>
            </NuxtLink>
        </v-app-bar>
        <v-main class="fill-height">
            <slot></slot>
        </v-main>
    </div>
</template>
<script>
export default {

}
</script>
<style scoped>
.link {
    text-decoration: none;
    color: inherit;
}
</style>