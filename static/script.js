$(document).ready(function () {
    showReview();
})
;

function makeReview() {

    let title = $('#title').val()
    let author = $('#author').val()
    let review = $('#review').val()


    $.ajax({
        type: "POST",
        url: "/review",
        data: {title_give: title, author_give: author, review_give: review},
        success: function (response) {
            alert(response["msg"]);
            window.location.reload();
        }
    })
}

function showReview() {
    $.ajax({
        type: "GET",
        url: "/review",
        data: {},
        success: function (response) {
            let reviews = response['all_reviews'];

            for (let i = 0; i < reviews.length; i++) {
                let title = reviews[i]['title'];
                let author = reviews[i]['author'];
                let review = reviews[i]['review'];

                let temp_html = `<tr>
                                                <td>${title}</td>
                                                <td>${author}</td>
                                                <td>${review}</td>
                                                </tr>`;

                $('#reviews-box').append(temp_html);

            }

        }
    })
}
