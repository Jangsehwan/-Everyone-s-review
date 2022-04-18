from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request


app = Flask(__name__)
client = MongoClient('localhost', 27017)
db = client.dbstudy

# HTML을 주는 부분s


@app.route('/')
def home():
    return render_template('index.html')

# API 역할을 하는 부분


@app.route('/review-write', methods=['POST'])
def write_review():
    title_receive = request.form['title_give']
    link_receive = request.form['link_give']
    review_receive = request.form['review_give']
    like_receive = 0

    doc = {
        'title': title_receive,
        'link': link_receive,
        'review': review_receive,
        'like' : 0
    }
    db.review.insert_one(doc)
    return jsonify({'msg': '저장 완료'})


@app.route('/review-list', methods=['GET'])
def read_reviews():
    reviews = list(db.review.find({}, {'_id': False}))
    # print(reviews)
    return jsonify({'all_reviews': reviews})


@app.route('/review-delete', methods=['POST'])
def delete_reviews():
    title_recieve = request.form['title_give']
    reiews = db.review.delete_one({"title": title_recieve})
    return jsonify({'msg': '삭제되었습니다.'})


@app.route('/review-like', methods=['POST'])
def like_reviews():
    title_receive = request.form['title_give']
    print(title_receive)

    review = db.review.find_one({"title" : title_receive})
    print(review)

    like = review['like']
    like_temp = like + 1
    like = like_temp
    print(like)

    db.review.update_one({'title': title_receive}, {'$set' : {'like' : like}})
    return jsonify({'like': like})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
