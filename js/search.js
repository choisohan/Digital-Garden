const searchBox = document.querySelector('#search-box');
const resultArea = document.querySelector('#search-results')

var documents = [];
{
  function search(){
    var searchTerm = searchBox.value;
    if (searchTerm.length> 0){
      var idx = lunr(function () {
        this.field('id');
        this.field('title', { boost: 10 });
        this.field('author');
        this.field('category');
        this.field('content');
        for (var key in window.store) {
          this.add({
            'id': key,
            'url': window.store[key].url,
            'title' : window.store[key].title,
            'content' : window.store[key].content
          })
        }

      }) 

      var results = idx.search(searchTerm)
      updateResult(results);
    }
    else{
      empty()
    }

  }


  search()
  function empty(){
    resultArea.innerHTML =""
  }

  function updateResult(results){

    empty()
    for (var i = 0; i< results.length; i++){
      var item = store[results[i].ref ];


      var span = document.createElement("A");
      span.href = item.url;

      var title = document.createElement("H4");
      title.classList.add('title')
      title.innerText = item.title;

      var content = document.createElement("H5");
      content.classList.add('content')
      content.innerText = item.content.substring(0,250);


      span.appendChild(title);
      span.appendChild(content);
      resultArea.appendChild(span)
    }

  }

} 