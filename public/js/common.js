$("#postTextarea").keyup((event) => {
  let textbox = $(event.target);
  let textValue = textbox.val().trim();
  let submitBtn = $("#submitPostButton");

  if (submitBtn.length == 0) return alert("No submit btn found");

  if (textValue == "") {
    submitBtn.prop("disabled", true);
    return;
  }
  submitBtn.css("background-color", "#353535");
});

$("#submitPostButton").click((event) => {
  let btn = $(event.target);
  let textBox = $("#postTextarea");

  let data = {
    content: textBox.val(),
  };

  $.post("/api/posts.routes", data, (postData) => {
    let html = createPostHtml(postData);
    $(".postsContainer").prepend(html);
    textBox.val("");

    btn.prop("disabled", true);
    btn.css("background-color", "#ced4da");
  });
});

function createPostHtml(postData) {
  let postedBy = postData.postedBy;
  let displayName = postedBy.firstName + " " + postedBy.lastName;
  let timestamp = postData.createdAt;

  return `<div class='post flex-col shrink-0 p-2 border-b-2 mb-2 cursor-pointer '>
              <div class="mainContentContainer flex flex-1 ">
                  <div class="userImageContainer w-20 mb-4 h-20">
                      <img class="w-full bg-white rounded-full border" src="${postedBy.userAvatar}">
                  </div>
                  <div class="postContentContainer flex-col pl-2 mt-1 flex-1 ">
                     <div class="header">
                         <a class="displayname font-bold" href="/profile/${postedBy.userName}">${displayName}</a>
                         <span class="username  text-gray-500">@${postedBy.userName}</span>
                         <span class="date  text-gray-500">${timestamp}</span>
                     </div>
                     <div class="postBody">
                          <span>${postData.content}</span>
                     </div>
                     <div class="postFooter flex items-center">
                     <div class="postButtonContainer flex flex-1">
                     <button class="w-6 mt-3">
                     <img src="https://img.icons8.com/plumpy/24/000000/source-code.png"/>
                     </button>
                   </div>
                   <div class="postButtonContainer flex flex-1">
                   <button class="w-6 mt-3">
                   <img src="https://img.icons8.com/external-dreamstale-lineal-dreamstale/32/000000/external-bug-security-dreamstale-lineal-dreamstale-2.png"/>
                   </button>
                 </div>
                 <div class="postButtonContainer flex flex-1">
                 <button class="w-6 mt-3">
                 <img src="https://img.icons8.com/external-sbts2018-mixed-sbts2018/58/000000/external-like-social-media-basic-1-sbts2018-mixed-sbts2018.png"/>
                 </button>
               </div>
                     </div>
                  </div>
              </div>
          </div>`;
}
