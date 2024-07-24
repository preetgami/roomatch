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
    userProfile: {},
    recommendation: {},
    user: {
      loggedIn: false,
      data: null,
    },
  },
  getters: {
    getUser(state) {
      return state.user;
    },
    getProfile(state) {
      return state.userProfile;
    },
    getRecommendation(state) {
      return state.recommendation;
    },
  },
  mutations: {
    setUser(state, user) {
      state.user = user;
    },
    logInUser(state, value) {
      state.user.loggedIn = value;
    },
    setUserProfile(state, profile) {
      state.userProfile = profile;
    },
    setRecommendation(state, newRec) {
      state.recommendation = newRec;
    },
  },
  actions: {
    //user routes

    //returns profile info eg name, hobby, pics etc
    async fetchUserProfile({ state, commit }) {
      const endpoint =
        "http://localhost:4000/api/users/user/" + state.user.user.uid;
      await axios.get(endpoint).then((response) => {
        commit("setUserProfile", response.data);
      });
    },
    async fetchRecommendation({ commit, state }) {
      const endpoint =
        "http://localhost:4000/api/users/user/recommendation/" +
        state.user.user.uid;
      await axios.get(endpoint).then((response) => {
        commit("setRecommendation", response.data);
      });
    },
    createUser({ commit, state }, newInfo) {
      newInfo = { ...newInfo, uid: state.user.user.uid };
      const endpoint =
        "http://localhost:4000/api/users/user/create/" + state.user.user.uid;
      axios.post(endpoint, newInfo).then((response) => {
        console.log(response.data);
      });
    },
    updateUser({ commit, state }, newInfo) {
      newInfo = { ...newInfo, uid: state.user.user.uid };
      const endpoint =
        "http://localhost:4000/api/users/user/update/" + state.user.user.uid;
      axios.patch(endpoint, newInfo).then((response) => {
        console.log(response.data);
      });
    },
    likeUser({ state }, usertoLike) {
      const endpoint =
        "http://localhost:4000/api/users/user/swipe/" + state.user.user.uid;
      axios.patch(endpoint, { like: usertoLike }).then((response) => {
        console.log(response.data);
      });
    },
    rejectUser({ state }, usertoReject) {
      const endpoint =
        "http://localhost:4000/api/users/user/reject/" + state.user.user.uid;
      axios.patch(endpoint, { reject: usertoReject }).then((response) => {
        console.log(response.data);
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
    async handleSignUp({ commit, dispatch }, { email, password, username }) {
      const auth = getAuth();
      try {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );
        let profile = {
          name: username,
        };
        dispatch("createUser", { ...profile });
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
    async uploadImage({ commit, state, dispatch }, { file }) {
      console.log(state.userProfile);
      if (state.userProfile.user[0].pictures.length >= 5) {
        return;
      }
      const endpoint = "http://localhost:4000/api/s3/" + state.user.user.uid;
      let url;
      await axios.get(endpoint).then((response) => {
        url = response.data.url;
      });
      // console.log(url);
      axios({
        method: "put",
        url: url,
        data: file,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const imageUrl = url.split("?")[0];
      dispatch("saveImage", { url: imageUrl });
    },
    async saveImage({ commit, state }, url) {
      const endpoint =
        "http://localhost:4000/api/s3/upload/" + state.user.user.uid;
      await axios.patch(endpoint, url).then((response) => {
        url = response.data.url;
      });
      console.log(url);
    },
  },
});

export default store;
