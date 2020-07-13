from flask import (render_template, request, url_for,
                   redirect, current_app, flash, jsonify)
from flask_user import login_required
from app.models import Ipp
from app.ipps import bp
from app.ipps.model import Model
from app.ipps.forms import CreateIppForm
import os
import json
from pathlib import Path


@bp.route('/api/i/ipps')
def ipp_index():
    ipps = Ipp.query.all()
    res = list()
    for i in ipps:
        res.append({'id': i.id, 'ippname': i.ippname})
    return jsonify(res)


@bp.route('/api/i/ipps/<ippname>', methods=['GET', 'POST'])
# @login_required
def ipp_page(ippname):
    ipp = Ipp.query.filter_by(ippname=ippname).first_or_404()
    if request.method == 'POST':
        model = Model(current_app)
        model.predict_season()
        return jsonify(model.result)
    return jsonify({'ipp': ipp.ippname})


@bp.route('/api/i/upload', methods=['POST'])
def upload():
    for key, f in request.files.items():
        f.save(os.path.join(
            current_app.config['UPLOADED_PATH'],
            f.filename
        ))
    return 'OK'


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
