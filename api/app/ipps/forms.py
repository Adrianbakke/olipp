from flask_wtf import FlaskForm
from wtforms import StringField, SubmitField
from wtforms.validators import DataRequired


class CreateIppForm(FlaskForm):
    ippname = StringField('Ippname', validators=[DataRequired()])
    submit = SubmitField('Create')
