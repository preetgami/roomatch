import { createStore } from "vuex";
import axios from 'axios';
const store = createStore({
    state: {
        user: 'hghg'
    },
    getters: {
        getuser(state) {
            return state.user
        }
    },
    mutations: {
        updateUser(state, newUser) {
            state.user = newUser
        }
    },
    actions: {
        findusers({ commit }, newUser = 'hi') {
            const endpoint = 'http://localhost:4000/api/users/user/' + newUser
            axios.get(endpoint)
                .then(response => {
                    commit('updateUser', response.data.name)
                })

        }
    }
})
export default store