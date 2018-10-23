document.addEventListener('DOMContentLoaded', () => {


getBlogs()

// CREATE NEW POST

// Use AJAX to get the blogs and append them to a buttonlist in the DOM
let newForm = document.getElementById('newPostForm')
let blogList = document.getElementById('blogList')
let create_button = document.getElementById('createButton')
let edit_button = document.getElementById('edit')
let del_button = document.getElementById('del')
let new_post = document.getElementById('post_new')

newForm.hidden = true

//CREATE NEW POST BRINGS UP FORM
create_button.addEventListener('click', (ev) => {
  newForm.hidden = false
})


function getBlogs() {
  axios.get('/ajaxblog')
  .then((response) => {
    
  // handle success
    // ADD blogposts to button list
    response.data.forEach((blog) => {
      let title = document.createElement('a')


      title.classList.add("list-group-item")
      title.classList.add("list-group-item-action")
      title.innerText = blog.title
      blogList.appendChild(title)
      title.setAttribute('data-id', blog.id)
      
    })

    //POST NEW BLOG
    newForm.addEventListener('submit', (ev) => {
      ev.preventDefault()
      let postData = {}
      let addedBlog = ev.target.elements

      for (let i = 0; i < addedBlog.length; i++) {
        let blogName = addedBlog[i].name
        if (blogName) {
          postData[blogName] = addedBlog[i].value
        }
      }
      axios.post('/ajaxblog', postData)
      .then((response) => {
        console.log(response)
        location.reload()
      })
      .catch((error) => {
        console.log(error)
      })
    })

    let currentTitle = document.getElementById('blogTitle')
    let blogContent = document.getElementById('blogContent')
    let newPostContent = document.getElementById('newPostContent')
    
    blogList.addEventListener('click', (ev) => {
      ev.preventDefault()
      currentTitle.innerText = ev.target.innerText
      
      let blogId = ev.target.getAttribute('data-id')

      // get one
      axios.get(`/ajaxblog/${blogId}`)
      .then((response) => {
        blogContent.innerText = response.data[0].content
      })

      //then append content
    })

  })
  
  .catch((error) => {
      // handle error
    console.log(error)
  })
}




// EDIT POST

// DELETE POST


      //EDIT BUTTON


        //HIDES EVERYTHING BESIDES blog TO EDIT


      //DELETE BUTTON



})



// EDIT SUBMIT BUTTON



    // grab all values from the form
