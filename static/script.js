$(document).ready(function () {
    showReview()
})

function openClose() {
    if ($("#post-box").css("display") == "block") {
        $("#post-box").hide();
        $("#btn-post-box").text("포스팅 박스 열기");
    } else {
        $("#post-box").show();
        $("#btn-post-box").text("포스팅 박스 닫기");
    }
}

function makeReview() {

    let title = $('#title').val()
    let link = $('#link').val()
    let review = $('#review').val()


    $.ajax({
        type: "POST",
        url: "/review-write",
        data: {title_give: title, link_give: link, review_give: review},
        success: function (response) {
            alert(response["msg"]);
            window.location.reload();
        }
    })
}

function showReview() {
    $.ajax({
        type: "GET",
        url: "/review-list",
        data: {},
        success: function (response) {
            console.log(response)
            let reviews = response['all_reviews'];

            for(let i = 0; i < reviews.length; i++){
                let title = reviews[i]['title']
                let link = reviews[i]['link']
                let review = reviews[i]['review']
                // let image = memos[i]['image']
                // let desc = memos[i]['ob_desc']
                // print(image, desc)

                let temp_html = ` 
                <div class="card">
                    
                    <div class="card-body">
                        <a target="_blank" href="#" class="card-title">${title}</a>
                        <p class="card-text comment">${review}</p>
                    </div>
                </div>`

                $('#cards-box').append(temp_html)
            }

        }
    })
}
