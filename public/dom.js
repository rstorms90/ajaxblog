document.addEventListener('DOMContentLoaded', () => {


getBlogs()

// CREATE NEW POST

// Use AJAX to get the blogs and append them to a buttonlist in the DOM
let blogList = document.getElementById('blogList')
let create_button = document.getElementById('createButton')
let new_button = document.createElement('button')
let del_button = document.createElement('button')
let edit_button = document.createElement('button')

create_button.addEventListener('click', (ev) => {

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
      
    })

    let currentTitle = document.getElementById('title')
    let currentContent = document.getElementById('content')

    
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


      // append the TDs to the TR, the TR to the TBODY


})

//ADD blog BUTTON


  //EVENT LISTENER ON CREATE blog



// EDIT SUBMIT BUTTON



    // grab all values from the form
