from flask import (render_template, request, url_for,
                   redirect, current_app, flash)
from flask_user import login_required
from app.models import Ipp
from app.ipps import bp
from app.ipps.model import Model
from app.ipps.forms import CreateIppForm
import os


@bp.route('/i')
@bp.route('/ipps')
@bp.route('/ipps_index')
def ipp_index():
    ipps = Ipp.query.all()
    return {'ipps': ipps}


@bp.route('/i/<ippname>', methods=['GET', 'POST'])
@login_required
def ipp_page(ippname, model=None):
    if request.method == 'POST':
        model = Model(current_app)
    ipp = Ipp.query.filter_by(ippname=ippname).first_or_404()
    return {'ipp': ipp, 'model': model}


@bp.route('/ipps/upload', methods=['GET', 'POST'])
def upload():
    print(current_app.config['UPLOADED_PATH'])
    if request.method == 'POST':
        for key, f in request.files.items():
            if key.startswith('file'):
                f.save(os.path.join(
                    current_app.config['UPLOADED_PATH'],
                    f.filename
                    )
                )
    return redirect(url_for('ipps.ipp_create'))


@bp.route('/ipps/create-ipp', methods=['GET', 'POST'])
@login_required
def ipp_create():
    form = CreateIppForm()
    if form.validate_on_submit():
        result = request.form
        Ipp.add_new(**result)
        flash('Created ipp {}'.format(form.ippname))
        return redirect(url_for('ipps.ipp_index'))
    return {'form': form}
