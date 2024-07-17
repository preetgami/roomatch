import { createStore } from "vuex";
import axios from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";

const store = createStore({
  state: {
    uid: "hghg",
    userName: "test",
    loggedIn: false,
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logInUser(state, value) {
      state.user.loggedIn = value;
    },
  },
  actions: {
    findusers({ commit }, newUser = "hi") {
      const endpoint = "http://localhost:4000/api/users/user/" + newUser;
      axios.get(endpoint).then((response) => {
        commit("updateUser", response.data.name);
      });
    },
    async handleLogIn({ commit }, { email, password }) {
      const auth = getAuth();
      try {
        const response = await signInWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("setUser", response.user);
      } catch (error) {
        console.log(error.code);
        switch (error.code) {
          case "auth/invalid-credential":
            return { text: "Invalid email" };
          case "auth/user-not-found":
            return { text: "User Not Found" };
          case "auth/wrong-password":
            return { text: "Wrong password" };
          case "auth/invalid-email":
            return { text: "Email Not Valid" };
          case "auth/user-diabled":
            return { text: "User-disabled" };
        }
        return { text: error.code };
      }
    },
    async handleSignUp({ commit }, { email, password, username }) {
      const auth = getAuth();
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        commit("setUser", response.user);
        return true;
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-credential":
            return { text: "Invalid credential" };

          case "auth/user-not-found":
            return { text: "User Not Found" };
          case "auth/invalid-email":
            return { text: "Email Not Valid" };
          case "auth/wrong-password":
            return { text: "Wrong password" };
          case "auth/user-diabled":
            return { text: "User-disabled" };
        }
        return { text: error.code };
      }
    },
    async logOut({ commit }) {
      const auth = getAuth();
      await signOut(auth);
      commit("setUser", null);
    },
    async fetchUser({ commit }) {
      const auth = getAuth();
      onAuthStateChanged(auth, (user) => {
        if (user) {
          commit("setUser", {
            user,
          });
        } else {
          commit("setUser", null);
        }
      });
    },
  },
});

export default store;
