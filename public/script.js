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
      blogElement.querySelector(".content-description").textContent = blog.blogContent.description;
     const tagsContainer =  blogElement.querySelector(".tag");

     blog.blogContent.tags.forEach(tag => {
      const tagElement = document.createElement("span");
      tagElement.textContent = tag ;
      tagsContainer.appendChild(tagElement );
     });


     blogElement.querySelector(".Upvote").textContent = blog.stats.upvotes;
     blogElement.querySelector(".devote").textContent = blog.stats.downvotes;
     blogElement.querySelector(".comment").textContent = blog.stats.comments;
     blogElement.querySelector(".share").textContent = blog.stats.shares;

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