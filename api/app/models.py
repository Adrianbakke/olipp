from app import db
from flask_user import UserMixin


class User(UserMixin, db.Model):
    __tablename__ = 'users'
    id = db.Column(db.Integer, primary_key=True)
    active = db.Column('is_active', db.Boolean(),
                       nullable=False, server_default='1')
    username = db.Column(db.String(64), index=True, unique=True)
    email = db.Column(db.String(120), index=True, unique=True)
    password = db.Column(db.String(128))
    roles = db.relationship('Role', secondary='user_roles')

    def __repr__(self):
        return '<User {}>'.format(self.username)


# Define the Role data-model
class Role(db.Model):
    __tablename__ = 'roles'
    id = db.Column(db.Integer(), primary_key=True)
    name = db.Column(db.String(50), unique=True)


# Define the UserRoles association table
class UserRoles(db.Model):
    __tablename__ = 'user_roles'
    id = db.Column(db.Integer(), primary_key=True)
    user_id = db.Column(db.Integer(),
                        db.ForeignKey('users.id', ondelete='CASCADE'))
    role_id = db.Column(db.Integer(),
                        db.ForeignKey('roles.id', ondelete='CASCADE'))


class Ipp(db.Model):
    __tablename__ = 'ipps'
    id = db.Column(db.Integer, primary_key=True)
    ippname = db.Column(db.String(64), index=True, unique=True)

    def __repr__(self):
        return '<ipp {}>'.format(self.ippname)

    @classmethod
    def add_new(cls, **kwargs):
        if not cls.query.filter(cls.ippname == kwargs['ippname']).first():
            new = cls(ippname=kwargs['ippname'])
            db.session.add(new)
            db.session.commit()

    @classmethod
    def remove(cls, ippname):
        remove = cls.query.filter(cls.ippname == ippname).first()
        if remove:
            db.session.delete(remove)
            db.session.commit()
