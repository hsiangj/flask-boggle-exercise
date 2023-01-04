from boggle import Boggle
from flask import Flask
from flask_debugtoolbar import DebugToolbarExtension

app = Flask(__name__)

## set secret key when session is set up
# app.config['SECRET_KEY'] = ''
app.debug = True
toolbar = DebugToolbarExtension(app)

boggle_game = Boggle()
