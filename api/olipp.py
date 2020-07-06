from app import create_app, db, user_manager
from app.models import User, Ipp

app = create_app()

@app.shell_context_processor
def make_shell_context():
    return {'db': db, 'User': User, 'app': app,
            'user_manager': user_manager, 'Ipp': Ipp}
