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
let currentPost = document.getElementById('currentPost')
let editForm = document.getElementById('editForm')
let editPostButton = document.getElementById('edit_post')

newForm.hidden = true
editForm.hidden = true

//CREATE NEW POST BRINGS UP FORM
create_button.addEventListener('click', (ev) => {
  newForm.hidden = false
  currentPost.hidden = true
  editForm.hidden = true
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
      currentPost.hidden = false
      newForm.hidden = true
      editForm.hidden = true
      editForm.hidden = true
      editPostButton.hidden = true
      currentTitle.innerText = ev.target.innerText
      
      let blogId = ev.target.getAttribute('data-id')

      del_button.setAttribute('data-id', blogId)
      // get one
      axios.get(`/ajaxblog/${blogId}`)
      .then((response) => {
        blogContent.innerText = response.data[0].content
      })
    })

    del_button.addEventListener('click', (ev) => {
      ev.preventDefault()
      currentPost.hidden = true

      let blogId = ev.target.getAttribute('data-id')
      axios.delete(`/ajaxblog/${blogId}`)
      .then((response) => {
        console.log(response)
        location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
    })

    
    edit_button.addEventListener('click', (ev) => {
      currentPost.hidden = true
      editForm.hidden = false
      newForm.hidden = true
      editPostButton.hidden = false
    })


    editForm.addEventListener('submit', (ev) => {
      ev.preventDefault()

      // grab all values from the form
      let putData = {}
      let editedBlog = ev.target.elements

      putData.title = editedBlog[0].value
      putData.content = editedBlog[1].value
      
      let id = del_button.getAttribute('data-id')

      
      axios.put(`/ajaxblog/${id}`, putData)
      .then((response) => {
        location.reload()
        currentPost.hidden = true
        getBlogs()
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
    })

  })
  .catch((error) => {
      // handle error
    console.log(error)
  })
}
})