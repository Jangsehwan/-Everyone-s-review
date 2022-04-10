from pymongo import MongoClient
from flask import Flask, render_template, jsonify, request


# _id값을 받아오기 위해 import
from bson.objectid import ObjectId

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

    doc = {
        'title': title_receive,
        'link': link_receive,
        'review': review_receive
    }
    db.review.insert_one(doc)
    return jsonify({'msg': '저장 완료'})


@app.route('/review-list', methods=['GET'])
def read_reviews():
    reviews = list(db.review.find({}, {'_id': False}))
    # reviews = objectIdDecoder(list(db.reveiw.find({})))
    print(reviews)
    return jsonify({'all_reviews': reviews})

# object값을 str로 바꾸는 함수
# def objectIdDecoder(list):
#     results = []
#     for document in list:
#         document['_id'] = str(document['_id'])
#         results.append(document)
#     return results


@app.route('/review-delete', methods=['POST'])
def delete_reviews():
    title_recieve = request.form['title_give']
    reiews = db.review.delete_one({"title": title_recieve})
    return jsonify({'msg': '삭제되었습니다.'})


if __name__ == '__main__':
    app.run('0.0.0.0', port=5000, debug=True)
