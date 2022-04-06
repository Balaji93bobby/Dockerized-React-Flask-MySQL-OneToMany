
from flask import Flask, jsonify, request, session, redirect, flash, Response

# from flask_script import Manager - For CMD
# from flask_migrate import Migrate, MigrateCommand
from flask_migrate import Migrate

from flask_bcrypt import Bcrypt 


from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import text
from env import KEY, PASS
#import error
from flask_cors import CORS, cross_origin
import datetime

from flask_marshmallow import Marshmallow

app = Flask(__name__)
app.secret_key = KEY

# app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql://root:{PASS}@localhost/react_flask_mysql"

app.config["SQLALCHEMY_DATABASE_URI"] = f"mysql://root:root@mysql/react_flask_mysql"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False


db = SQLAlchemy(app)
ma = Marshmallow(app)
cors = CORS(app, supports_credentials=True, resources={r"/*": {"origins": "*"}})
CORS(app)

migrate = Migrate(app, db)
bcrypt = Bcrypt(app)

# manager = Manager(app)
# manager.add_command("db", MigrateCommand)


app.config['CORS_HEADERS'] = 'Content-Type'
app.config['CORS_METHODS'] = ['GET', 'POST', 'PUT', 'DELETE']
app.config['CORS_ORIGINS'] = "*"


#@------------BLOGGERS---------------------

class Bloggers(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    email = db.Column(db.String(255))
    password = db.Column(db.String(255), nullable=False)
    image = db.Column(db.Text(), default="default.jpg")
    created_at = db.Column(db.DateTime, default = datetime.datetime.now())

    articles = db.relationship('Articles', back_populates="bloggers", cascade='all, delete, delete-orphan', passive_deletes=True)
    #* ratings = db.relationship('Ratings', back_populates="ratings", cascade='all, delete, delete-orphan', passive_deletes=True)

    def __init__(self, first_name, last_name, email, password, image):
        self.first_name = first_name
        self.last_name = last_name
        self.email = email
        self.password = password
        self.image = image


#@----------------------------------


class BloggerSchema(ma.Schema):
    class Meta:
        fields = ("id", "first_name", "last_name", "email", "password", "image", "created_at")


# For All
bloggers_schema = BloggerSchema(many=True)
# For One
blogger_schema = BloggerSchema()

#@----------------------------------

# Register
@app.route("/bloggers/register", methods=['GET', 'POST'])
@cross_origin()
def register():
    first_name = request.json["first_name"]
    last_name = request.json["last_name"]
    form_email = request.json["email"]
    image = "default"

    if len(first_name) < 1:
        return jsonify({"FNmessage":"Must include first name"}), 400

    if len(last_name) < 1:
        return jsonify({"LNmessage": "Must include a last name"}), 400

    if len(form_email) < 1:
        return jsonify({"Emailmessage": "Must include an email"}), 400

    email = Bloggers.query.filter_by(email=form_email).first()
    if email:
        print("Email in use")
        return jsonify({"Emailmessage":"Email Already Taken"}), 400


    pw_hash = bcrypt.generate_password_hash(request.json['password'])
    print(pw_hash)


    # Add user after passing email verification
    bloggers = Bloggers(first_name, last_name, form_email, pw_hash, image)

    db.session.add(bloggers)
    db.session.commit()
    session['logged_in'] = True
    session["bloggerID"] = bloggers.id

    print(session["bloggerID"])

    return blogger_schema.jsonify(bloggers)


# Login
@app.route("/bloggers/login", methods=['GET', 'POST'])
@cross_origin()
def login():
    email = request.json["email"]

    user = Bloggers.query.filter_by(email=email).first()

    if not user:
        print("Invalid Email")
        return jsonify({"Emailmessage":"Invalid Email"}), 400

    if not bcrypt.check_password_hash(user.password, request.json['password']):
        print("Invalid Password")
        return jsonify({"Passwordmessage":"Invalid Password"}), 400

    # Log in user after passing email/password verification


    session['logged_in'] = True
    session["bloggerID"] = user.id
    print(session["bloggerID"])
    return blogger_schema.jsonify(user)

# Logout
@app.route("/logout")
@cross_origin()
def logout():
    session['logged_in'] = False
    return "logged out"

# Get All
@app.route("/bloggers", methods=["GET"])
@cross_origin()
def get_all_bloggers():
    all_bloggers = Bloggers.query.all()
    results = bloggers_schema.dump(all_bloggers)
    return jsonify(results)

# Get One
@app.route("/bloggers/<int:id>", methods=["GET"])
@cross_origin()
def get_one_blogger(id):
    one_blogger = Bloggers.query.get(id)
    return blogger_schema.jsonify(one_blogger)

# Create
# @app.route("/bloggers/create", methods=['GET', 'POST'])
# def createBlogger():
#     first_name = request.json["first_name"]
#     last_name = request.json["last_name"]
#     email = request.json["email"]

#     bloggers = Bloggers(first_name, last_name, email)
    
#     db.session.add(bloggers)
#     db.session.commit()
#     session['logged_in'] = True
#     session["bloggerID"] = bloggers.id
#     print(session["bloggerID"])
#     return blogger_schema.jsonify(bloggers)

# Update
@app.route("/bloggers/update/<int:id>", methods=["PUT"])
@cross_origin()
def update_blogger(id):
    blogger = Bloggers.query.get(id)

    first_name = request.json["first_name"]
    last_name = request.json["last_name"]
    email = request.json["email"]
    image = request.json["image"]

    blogger.first_name = first_name
    blogger.last_name = last_name
    blogger.email = email
    blogger.image = image

    db.session.commit()
    return blogger_schema.jsonify(blogger)

# Delete
@app.route("/bloggers/delete/<int:id>", methods=["DELETE"])
@cross_origin()
def delete_blogger(id):
    blogger = Bloggers.query.get(id)
    db.session.delete(blogger)
    db.session.commit()
    return blogger_schema.jsonify(blogger)

@app.route("/bloggers_articles/<int:id>", methods=["GET"])
@cross_origin()
def get_blogger_with_articles(id):


    sql = text(f"SELECT * FROM bloggers LEFT JOIN articles on bloggers.id = articles.blogger_id WHERE bloggers.id = {id};")
    print(sql)
    query = db.engine.execute(sql)
    results = [row for row in query]

    print(results)
    return test_schema.jsonify(results)


#@---------------ARTICLES-------------------

class Articles(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    blogger_id = db.Column(db.Integer, db.ForeignKey('bloggers.id', ondelete='cascade'))
    title = db.Column(db.String(255))
    body = db.Column(db.Text())
    created_at = db.Column(db.DateTime, default = datetime.datetime.now())

    bloggers = db.relationship("Bloggers", back_populates="articles", passive_deletes=True)
    #* ratings = db.relationship("Ratings", back_populates="ratings", passive_deletes=True)

    #! ratings = db.relationship("Group", secondary=users_ratings, back_populates="users")

    def __init__(self, blogger_id, title, body):
        self.blogger_id = blogger_id
        self.title = title
        self.body = body


class ArticleSchema(ma.Schema):
    class Meta:
        fields = ("id", "blogger_id", "title", "body", "created_at")

# For All
articles_schema = ArticleSchema(many=True)
# For One
article_schema = ArticleSchema()

class ArticleBloggerSchema(ma.Schema):
    class Meta:
        fields = ("id", "blogger_id", "title", "body", "created_at", "blogger_id", "first_name", "last_name", "email", "image")

test_schema = ArticleBloggerSchema(many=True)

#@----------------------------------


# Get All
@app.route("/articles", methods=["GET"])
@cross_origin()
def get_all():
    # all_articles = Articles.query.all()
    sql = text(f"SELECT * FROM bloggers JOIN articles on articles.blogger_id = bloggers.id WHERE articles.blogger_id = bloggers.id;")
    query = db.engine.execute(sql)
    results2 = [row for row in query]
    # results = articles_schema.dump(all_articles)
    return test_schema.jsonify(results2)

# Get One
@app.route("/articles/<int:id>", methods=["GET"])
@cross_origin()
def get_one(id):
    one_article = Articles.query.get(id)
    print(one_article)
    return article_schema.jsonify(one_article)

# Create
@app.route("/articles/create", methods=['GET', 'POST'])
@cross_origin()
def create():
    if "blogger_ID" in session:
        print("hello")
    
    blogger_id = session["bloggerID"]
    print(blogger_id)
    
    
    title = request.json["title"]
    body = request.json["body"]

    if len(title) < 1:
        return jsonify({"Titlemessage":"Must include a title"}), 400

    if len(body) < 1:
        return jsonify({"Bodymessage": "Must include a body"}), 400

    articles = Articles(blogger_id, title, body)
    
    db.session.add(articles)
    db.session.commit()
    
    return article_schema.jsonify(articles)

# Update
@app.route("/articles/update/<int:id>", methods=["PUT"])
@cross_origin()
def update(id):
    article = Articles.query.get(id)

    title = request.json["title"]
    body = request.json["body"]

    article.title = title
    article.body = body

    db.session.commit()
    return article_schema.jsonify(article)

# Delete
@app.route("/articles/delete/<int:id>", methods=["DELETE"])
@cross_origin()
def delete(id):
    article = Articles.query.get(id)
    db.session.delete(article)
    db.session.commit()
    return article_schema.jsonify(article)

@app.route("/articles_bloggers/<int:id>", methods=["GET"])
@cross_origin()
def get_articles_with_blogger(id):

    sql = text(f"SELECT * FROM articles LEFT JOIN bloggers on bloggers.id = articles.blogger_id WHERE articles.id = {id};")
    print(sql)
    query = db.engine.execute(sql)
    results = [row for row in query]

    print(results)
    return test_schema.jsonify(results)



#!!!!!!!!!!! FOR FUTURE USE !!!!!!!!!!!!!!#

#@------------RATINGS---------------------
#! NOT READY - NEEDS TO BE LOOKED OVER, RELATIONSHIPS ETC - #* Double check
# class Ratings(db.Model):
#     id = db.Column(db.Integer, primary_key=True)
#     blogger_id = db.Column(db.Integer, db.ForeignKey('bloggers.id'), ondelete='cascade');
#     article_id = db.Column(db.Integer, db.ForeignKey('articles.id'), ondelete='cascade');
#     rating = db.Column(db.Integer) #* Double check
#     created_at = db.Column(db.DateTime, default = datetime.datetime.now())

#     bloggers = db.relationship('Bloggers', back_populates="bloggers", passive_deletes=True)
#     articles = db.relationship('Articles', back_populates="articles", passive_deletes=True)

#     def __init__(self, rating):
#         self.rating = rating

# class RatingSchema(ma.Schema):
#     class Meta:
#         fields = ("id", "blogger_id", "article_id", "rating","created_at")

# # For All
# ratings_schema = RatingSchema(many=True)
# # For One
# ratings_schema = RatingSchema()

# class ArticleBloggerRatingSchema(ma.Schema): #* Maybe just adjust the one under ArticleSchema?
#     class Meta:
#         fields = ("id", "blogger_id", "article_id", "title", "body", "created_at", "first_name", "last_name", "email", "image", "rating")

# test_schema = ArticleBloggerRatingSchema(many=True)

#@----------------------------------

# @app.route("/bloggers_articles/<int:id>", methods=["GET"])
# def get_blogger_with_articles(id):


#     sql = text(f"SELECT * FROM bloggers LEFT JOIN articles on bloggers.id = articles.blogger_id WHERE bloggers.id = {id};")
#     print(sql)
#     query = db.engine.execute(sql)
#     results = [row for row in query]

#     print(results)
#     return test_schema.jsonify(results)

db.create_all()


# if __name__ == '__main__':
#     manager.run()

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
