from boggle import Boggle
from flask import Flask, request, redirect, session, render_template
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)


app.config['SECRET_KEY'] = 'bogglesecret'

app.debug = True
toolbar = DebugToolbarExtension(app)

boggle_game = Boggle()

@app.route('/')
def display_board():
  """Display Board"""
  board = boggle_game.make_board()
  session['board'] = board
  return render_template("board.html", board=board)