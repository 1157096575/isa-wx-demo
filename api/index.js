
module.exports = {
  getList: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {    
        let arr = [];
        for(let i = 0; i < 20; i++){
          arr.push({
            id:  Math.random(),
            ratio: Math.random(),
            name: (Math.random() + '').substr(12)
          })
        }
        console.log(arr)
        resolve(arr);
      }, 1000)
    })
  }
}