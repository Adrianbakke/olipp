from fastai.vision import Path, load_learner, open_image


class Model:
    def __init__(self, app):
        self.app = app

    def predict_season(self):
        path_to_imgs = Path(self.app.config['UPLOADED_PATH'])
        path_to_models = Path(self.app.config['MODELS_PATH'])
        learn = load_learner(path_to_models, 'seasons.pkl')
        cats = learn.data.classes
        imgs = [open_image(img_path) for img_path in path_to_imgs.ls()]
        preds = [cats[learn.predict(img)[1]] for img in imgs]
        return [(str(i), p) for i, p in zip(path_to_imgs.ls(), preds)]
