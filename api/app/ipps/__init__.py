from flask import Blueprint

bp = Blueprint('ipps', __name__)

from app.ipps import routes
