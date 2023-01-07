import { unauthenticatedPages, allowedUsers } from "~~/config";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";


export default defineNuxtRouteMiddleware(async (to, from) => {
    const name: string = to.name?.toString()!;
    console.log('check auth for page', name);

    if (unauthenticatedPages.includes(name)) {
        console.log('page ' + name + ' doesn\'t need authentication')
        return;
    }

    const auth = getAuth();
    if (auth.currentUser && allowedUsers.includes(auth?.currentUser?.email!)) return;

    console.log('needs sign in');
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider)
        .catch((error) => {
            console.error('error:\n', error);
        });

    // console.log(result);
    if (allowedUsers.includes(result?.user?.email!)) return;
    navigateTo('/login');
})