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
    let like = 0

    $.ajax({
        type: "POST",
        url: "/review-write",
        data: {title_give: title, link_give: link, review_give: review, like_give : like},
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
                let like = reviews[i]['like']
                // let image = memos[i]['image']
                // let desc = memos[i]['ob_desc']


                let temp_html = ` 
                <div class="card" xmlns="http://www.w3.org/1999/html">
                    <div class="card-body">
                        <a target="_blank" href="${link}" class="card-title" id="title">${title}</a>
                        <a href="#" onclick="click_like('${title}')" id="like">
                            <i class="fa-solid fa-thumbs-up">${like}</i>
                        </a>
                        <a href="#" onclick="delete_review('${title}')" class="card-footer-item has-text-danger">
                            삭제
<!--                            <span class="icon"><i class="fas fa-ban"></i></span>-->
                        </a>
                        <p class="card-text comment" id="review">${review}</p>
                    </div>
                </div>`

                $('#cards-box').append(temp_html)
            }

        }
    })
}


function click_like(title){
    $.ajax({
        type: "POST",
        url: "/review-like",
        data: {title_give : title},
        success: function (response) {
            console.log(response)
            window.location.reload();
        }
    })
}


function delete_review(title){

    $.ajax({
        type: "POST",
        url: "/review-delete",
        data: {title_give : title},
        success: function (response) {
            window.location.reload();
        }
    })
}