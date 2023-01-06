from unittest import TestCase
from app import app
from flask import session
from boggle import Boggle
import json

app.config['TESTING'] = True
app.config['DEBUG_TB_HOSTS'] = ['dont-show-debug-toolbar']


class FlaskTests(TestCase):

    # TODO -- write tests for every view function / feature!
    def test_homepage(self):
        """Make sure correct HTML displayed from index.html and info in session"""
        with app.test_client() as client:
            res = client.get('/')
            html = res.get_data(as_text=True)

            self.assertEqual(res.status_code, 200)
            self.assertIn('<h1>Boggle</h1>', html)
            self.assertIn('<span class="score">0</span>', html)
            self.assertIsNone(session.get('highscore'))
  
    def test_valid_word(self):
        """Test if word is on board and in dictionary"""
        with app.test_client() as client:
            with client.session_transaction() as sesh:
                sesh['board'] = [["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"], 
                                 ["C", "A", "T", "T", "T"]]
            res = client.get('/check_word?guess=cat')
            self.assertEqual(res.json['result'], 'ok')
        
            res_nob = client.get('/check_word?guess=fabulous')
            self.assertEqual(res_nob.json['result'], 'not-on-board')
            
            res_nw = client.get('/check_word?guess=hogwarts')
            self.assertEqual(res_nw.json['result'], 'not-word')

    def test_post_stat(self):
        """Test highscore and plays stat are in session"""
        with app.test_client() as client:
            with client.session_transaction() as stat_sesh:
                stat_sesh['plays'] = 1
                stat_sesh['highscore'] = 20
            
            
            res = client.post('/post_stat', json= {'score':22})
            self.assertEqual(res.json['result'], True)
            self.assertEqual(session['plays'],2)
            
