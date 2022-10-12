$("#postTextarea").keyup((event) => {
    let textbox = $(event.target);
    let textValue = textbox.val().trim();
    let submitBtn = $("#submitPostButton");

    if (submitBtn.length == 0) return alert("No submit btn found")

    if(textValue == ""){
        submitBtn.prop("disabled", true);
        return;
    }
    submitBtn.css("background-color", "#353535");

})

$("#submitPostButton").click((event) => {
    let btn = $(event.target);
    let textBox = $("postTextarea");
    //console.log("Printing textBox " + textBox)
    
    let data = {
        content: textBox.val()
    }
    console.log("Printing data---> " + data.content);
    $.post("/api/posts.routes", data, (postData, status, xhr) => {
        alert(postData);
    })
})


