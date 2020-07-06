from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_migrate import Migrate
from flask_user import UserManager
from flask_dropzone import Dropzone
from config import Config


# customize class to not require positional arguments on init
# this is to make the class similar to the others (db, migrate)
class UserManagerCustomized(UserManager):
    def __init__(self, app=None, db=None, UserClass=None, **kwargs):
        self.app = app
        if app:
            self.init_app(app, db, UserClass, **kwargs)


db = SQLAlchemy()
migrate = Migrate()
user_manager = UserManagerCustomized()
dropzone = Dropzone()


def create_app(config_class=Config):
    app = Flask(__name__, static_url_path='/app/static/')
    app.config.from_object(config_class)
    db.init_app(app)
    migrate.init_app(app, db)
    user_manager.init_app(app, db, models.User)
    dropzone.init_app(app)

    from app.errors import bp as errors_bp
    app.register_blueprint(errors_bp)

    from app.users import bp as users_bp
    app.register_blueprint(users_bp)

    from app.main import bp as main_bp
    app.register_blueprint(main_bp)

    from app.ipps import bp as ipps_bp
    app.register_blueprint(ipps_bp)

    return app


from app import models
