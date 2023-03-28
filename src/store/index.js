import Vue from 'vue'
import Vuex from 'vuex'
import students from './students/students'
import subjects from './subjects/subjects'
import classes from './classes/classes'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    students,subjects,classes
  }
})
