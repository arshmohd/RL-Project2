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
    btn.prop("disabled", true)
  });
});

function createPostHtml(postData) {
  let postedBy = postData.postedBy;
  let displayName = postedBy.firstName + " " + postedBy.lastName;
  let timestamp = postData.createdAt;

  return `<div class='post'>
              <div class="mainContentContainer">
                  <div class="userImageContainer w-20 h-20 mb-10">
                      <img src="${postedBy.userAvatar}">
                  </div>
                  <div class="postContentContainer">
                     <div class="header">
                         <a href="/profile/${postedBy.userName}>${displayName}</a>
                         <span class="username">${postedBy.userName}</span>
                         <span class="username">${timestamp}</span>
                     </div>
                     <div class="postBody">
                          <span>${postData.content}</span>
                     </div>
                     <div class="postFooter">
                     </div>
                  </div>
              </div>
          </div>`;
}