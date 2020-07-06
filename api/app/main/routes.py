from flask import render_template, redirect, url_for
from flask_user import roles_required, login_required, current_user
from app.models import User
from app.main import bp


@bp.route('/')
@bp.route('/index')
def index():
    return render_template('index.html', current_user=current_user)
