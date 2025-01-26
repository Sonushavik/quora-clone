// {
//   "authorDetails": {
//     "profileImage": "author1.jpg",
//     "name": "John Doe",
//     "time": "2 hours ago"
//   },
//   "blogContent": {
//     "title": "How to Learn JavaScript",
//     "contentImage": "content1.jpg",
//     "description": "JavaScript is a versatile language used for web development. Here’s how you can get started...",
//     "tags": ["JavaScript", "Programming", "Web Development"]
//   },
//   "stats": {
//     "upvotes": 125,
//     "downvotes": 10,
//     "comments": 15,
//     "shares": 8
//   }
// },

// import { response } from "express";


// "profiles": [
//   {
//     "name": "Adam D'Angelo",
//     "profile_photo": "https://example.com/photos/adam_dangelo.jpg",
//     "bio": "Studied Computer Science at California Institute of Technology (2006)"
//   },

const button = document.getElementById("contributer-display-btn")
const asideBlock = document.querySelector(".aside-part");

button.addEventListener("click", () => {
  if(asideBlock.style.display === "none"|| asideBlock.style.display === ""  ){
    asideBlock.style.display = "block"
  }else{
    asideBlock.style.display = "none"
  }
})


fetch('/data')
  .then(response => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Fetched Data:", data);
    const template = document.getElementById("blog-template");
    const container = document.getElementById("blog-container");
    
    data.forEach(blog => {
      const blogElement = template.content.cloneNode(true);



      blogElement.querySelector(".author-profile").src = blog.authorDetails.profileImage;
      blogElement.querySelector(".author-name").textContent = blog.authorDetails.name;
      blogElement.querySelector(".blog-time").textContent = blog.authorDetails.time;
      blogElement.querySelector(".blog-title").textContent = blog.blogContent.title;
      blogElement.querySelector(".content-image").src = blog.blogContent.contentImage;
      const contentDescription = blogElement.querySelector(".content-description");
      contentDescription.textContent = blog.blogContent.description;
     const tagsContainer =  blogElement.querySelector(".tag");

     blog.blogContent.tags.forEach(tag => {
      const tagElement = document.createElement("span");
      tagElement.textContent = `#${tag}` ;
      tagsContainer.appendChild(tagElement );
     });


     blogElement.querySelector(".Upvote").textContent = blog.stats.upvotes;
     blogElement.querySelector(".devote").textContent = blog.stats.downvotes;
     blogElement.querySelector(".comment").textContent = blog.stats.comments;
     blogElement.querySelector(".share").textContent = blog.stats.shares;

     const moreButton = blogElement.querySelector(".more");
     moreButton.style.display= "none"

     if (contentDescription.scrollWidth > contentDescription.clientWidth) {
      moreButton.style.display = "inline"; // Show the button if overflowing
    }

    // Toggle content visibility on "More" button click
    moreButton.addEventListener("click", () => {
      if (contentDescription.classList.contains("expanded")) {
        contentDescription.classList.remove("expanded");
        moreButton.textContent = "More";
      } else {
        contentDescription.classList.add("expanded");
        moreButton.textContent = "Less";
      }
    });


      container.appendChild(blogElement);
    });
  })
  .catch(error => console.error("Error fetching data:", error));


fetch("/contributer")
  .then(response => {
    if(!response.ok){
      throw new Error(`HTTP error status: ${response.status}`);
    }return response.json();
  })
  .then(data => {
    const contributors = data.profiles;
    const contributerSize = contributors.length;
    document.querySelector(".no-of-contributer").textContent =contributerSize;

    const contributerBlock = document.querySelector(".contributer-list-block");
    const template = document.querySelector("#contributer-list-template");

    	
    contributors.forEach(contributor => {
      const listElement = template.content.cloneNode(true);

      const img = listElement.querySelector(".contributer-img");
      const name = listElement.querySelector(".contributer-name");
      const bio = listElement.querySelector(".contributer-bio");

      img.src = contributor.profile_photo || "../quoralogo.png"
      name.textContent = contributor.name;
      bio.textContent = contributor.bio || " No bio available"

      contributerBlock.appendChild(listElement);

    });
  })
  .catch(error => {
    console.error("Error fetching contributers:", error);
  });



//   const more = document.querySelector(".more");
// const contentDescription = document.querySelector(".content-description");

// // Get the computed width of the element
// const computedStyle = window.getComputedStyle(contentDescription);
// const width = computedStyle.width;


// if(width === "63px"){
//   more.style.display = "block";
// }else{
//   more.style.display = "none"
// }

// document.addEventListener("DOMContentLoaded", () => {
//   const more = document.querySelector(".more");
//   const contentDescription = document.querySelector(".content-description");

//   // Ensure contentDescription exists before accessing its computed style
//   if (contentDescription) {
//     const computedStyle = window.getComputedStyle(contentDescription); // Define 'computedStyle' here
//     const width = parseFloat(computedStyle.width); // Convert to a number

//     console.log(`Computed width: ${width}px`); // Debugging output

//     if (width === 63) { // Compare as a number
//       more.style.display = "block";
//     } else {
//       more.style.display = "none";
//     }
//   } else {
//     console.error("Element .content-description not found.");
//   }
// });
