import Vue from 'vue'
const mutations = {
  ADD_SHOPCART (state, obj) {
    let haveData = false
    state.shopCartData.forEach((item) => {
      if (item.id === obj.data.id) {
        haveData = true
        item.count += obj.num
      }
    })
    if (!haveData) {
      Vue.set(obj.data, 'count', obj.num)
      Vue.set(obj.data, 'checked', true)
      state.shopCartData.push(obj.data)
    }
  },
  INCREASE_SHOPCART (state, id) {
    state.shopCartData.forEach(item => {
      if (item.id === id) {
        item.count++
      }
    })
  },
  DECREASE_SHOPCART (state, id) {
    state.shopCartData.forEach(item => {
      if (item.id === id && item.count > 1) {
        item.count--
      }
    })
  },
  CHECK_GOODS (state, id) {
    state.shopCartData.forEach(item => {
      if (item.id === id) {
        item.checked = !item.checked
      }
    })
  },
  CHECK_ALL_GOODS (state, checked) {
    if (checked) {
      state.shopCartData.forEach(item => {
        item.checked = false
      })
    } else {
      state.shopCartData.forEach(item => {
        item.checked = true
      })
    }
  },
  DEL_GOODS (state, id) {
    state.shopCartData.forEach((item, index) => {
      if (item.id === id) {
        state.shopCartData.splice(index, 1)
      }
    })
  },
  CLEAR_GOODS (state) {
    state.shopCartData.forEach((item, index) => {
      if (item.checked) {
        state.shopCartData.splice(index, 1)
      }
    })
  }
}
export default mutations
