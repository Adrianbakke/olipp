from flask import render_template, redirect, url_for
from flask_user import roles_required, login_required, current_user
from app.models import User
from app.users import bp


@bp.route('/admin')
@login_required
@roles_required('Admin')
def admin():
    return render_template('admin.html', user=current_user)


@bp.route('/<username>')
@login_required
def user_page(username):
    user = User.query.filter_by(username=username).first_or_404()
    if current_user.username == 'admin':
        goto = 'profile/user_page_admin.html'
    else:
        goto = 'profile/user_page.html'
    return render_template(goto, user=user)


@bp.route("/logout")
def logout():
    return redirect(url_for('main.index'))
