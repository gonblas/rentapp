import data from "./data/data.json"

export const fetchData = () => {
  return new Promise((resolve) => {
    setTimeout(
      () => {
        resolve(data)
      },
      Math.random() * 1000 + 500,
    )
  })
}

export const fetchDataById = (id) => {
  return new Promise((resolve, reject) => {
    setTimeout(
      () => {
        const restaurant = data.find((item) => item.id === id)
        if (restaurant) resolve(restaurant)
        else reject(new Error("Restaurant not found"))
      },
      Math.random() * 1000 + 500,
    )
  })
}
