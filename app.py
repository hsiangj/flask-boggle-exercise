from boggle import Boggle
from flask import Flask, request, redirect, session, jsonify, render_template
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)


app.config['SECRET_KEY'] = 'bogglesecret'

app.debug = True
toolbar = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def index():
  """Display Board"""
  board = boggle_game.make_board()
  session['board'] = board
  return render_template("index.html", board=board)

@app.route('/check_word')
def check_word():
  """Check if word is in dictionary"""
  word = request.args['guess']
  board = session['board']
  word_result = boggle_game.check_valid_word(board, word)

  return jsonify({'result': word_result})
