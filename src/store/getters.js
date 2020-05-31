const getters = {
  isAllChecked (state) {
    let checked = true
    state.shopCartData.forEach(item => {
      if (!item.checked) {
        checked = false
      }
    })
    return checked
  },
  shopCartTotal (state) {
    let total = 0
    state.shopCartData.forEach(item => {
      total += item.count
    })
    return total
  },
  checkedGoodsTotal (state) {
    let total = 0
    state.shopCartData.forEach(item => {
      if (item.checked) {
        total += item.count
      }
    })
    return total
  },
  checkedGoodsPrice (state) {
    let total = 0
    state.shopCartData.forEach(item => {
      if (item.checked) {
        total += item.count * item.goodsPrice
      }
    })
    return total
  }
}
export default getters
