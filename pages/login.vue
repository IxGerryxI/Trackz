<template>
  <div class="main">
    <v-btn v-if="currentUser" @click="signout">SignOut</v-btn>
    <v-btn v-else @click="signIn">SignIn</v-btn>
    <div>loggedIn User: {{ currentUser?.email }}</div>
  </div>
</template>
<script setup>
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";

const AUTH = getAuth();
let currentUser = ref(AUTH.currentUser);

const signIn = () => {
  const provider = new GoogleAuthProvider();
  signInWithPopup(AUTH, provider)
    .then((result) => {
      const user = result.user;
      console.log(currentUser);
      currentUser.value = user
    }).catch((error) => {
      console.error('error:\n', error);
      currentUser.value = null;
    });
}

const signout = () => {
  signOut(AUTH).then(() => {
    console.log('signedOut', currentUser)
    currentUser.value = null;
  }).catch(err => {
    console.error(err);
  })
}

</script>
<style scoped>
.main {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>