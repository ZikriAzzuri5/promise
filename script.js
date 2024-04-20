// const executeTheTask = new Promise((resolve, reject) => {
//   const isCoffeeMachineReady = true

//   if (isCoffeeMachineReady) {
//     resolve('coffee sucessfully make it')
//   } else {
//     reject('sorry our coffee machine is broked')
//   }
// })


// executeTheTask.then(result => console.log(result)).catch(error => console.log(error)).finally(console.log('promise successed'))

// const executorFunction = (resolve, reject) =>{
//   const isCoffeMachineReady = false

//   if (isCoffeMachineReady){
//     resolve('Kopi berhasil di buat');
//   }else{
//     reject('Mesin kopi tidak dapat di gunakan!');
//   }
// };
// const buatKopi = new Promise(executorFunction);

// buatKopi.then(result => {
//   console.log(result)
// }).catch(error => {
//   console.log(error)
// })

// function getData(kondisi) {
//   return new Promise((resolve, reject) => {
//     if (kondisi) {
//       setTimeout(() => {
//         resolve('selamat datang di kelas mern')
//       }, 3000);
//     } else {
//       reject(new Error('maaf permintaan tidak dapat diproses'))
//     }
//   })
// }




// document.getElementById('btn').addEventListener('click', async function () {
//   this.innerHTML = 'loading ....'
//   const p = document.querySelector('p');

//   try {
//     const data = await getData(false)
//     p.innerHTML = data
//   } catch (err) {
//     p.innerHTML = err.message
//   } finally{
//     this.innerHTML = 'hi click me'
//   }



  // data.then((res) => p.innerHTML = res
  // ).catch((err) => p.innerHTML = err
  // ).finally(() => this.innerHTML = 'hi click me')
// })

// container.innerHTML = message('loading...')



const container = document.querySelector('.container')
const card = document.querySelector('.row')
const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

const apiUrl = "https://newsapi.org/v2/everything?q=bitcoin&apiKey=be7c2e756aee4c8595d12356a553b283"
const articles = fetch(apiUrl)

console.log(articles)
card.innerHTML = showMessage('loading...')


articles.then(res => res.json())
    .then(res => card.innerHTML = render(res))
    .catch(err => card.innerHTML = showMessage(err.message))
    .finally(() => {})


function showMessage(msg, isError = false) {
  const alertClass = isError ? 'alert-danger' : 'alert-info'
  return `
    <div class="alert ${alertClass}" role="alert">
      ${msg}
    </div>
  `
}


function fetchArticles(searchTerm) {
  const apiUrl = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=be7c2e756aee4c8595d12356a553b283`;

  fetch(apiUrl)
  .then(res => res.json())
  .then(data => {
    if (data.articles.length == 0) {
      card.innerHTML = showMessage('No articles found.');
    } else {
      card.innerHTML = render(data);
    }
  })
  .catch(err => card.innerHTML = showMessage(err.message));
}

searchForm.addEventListener('submit', function (e) {
  e.preventDefault()
  const searchTerm = searchInput.value.trim()

  if(searchTerm !== '') {
    fetchArticles(searchTerm);
  }
})

searchForm.addEventListener('keyup', function () {
  const searchTerm = searchInput.value.trim()
  if(searchTerm !== '') {
    fetchArticles(searchTerm);
  }
})


render = (articles) => {
  cardData = ''
  articles.articles.forEach(article =>  {
    cardData += `
        <div class="col col-md-6 col-lg-4">
          <div class="card m-2">
            <img src="${article.urlToImage}" class="card-img-top" alt="article image">
            <div class="card-body">
              <h5 class="card-title">${article.title}</h5>
              <p class="card-text">${article.description}</p>
              <a href="${article.url}" class="btn btn-primary">Go somewhere</a>
            </div>
          </div>
        </div>

    `
  });
  return card.innerHTML = cardData
}




