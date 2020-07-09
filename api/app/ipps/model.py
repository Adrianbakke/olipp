from fastai.vision import Path, load_learner, open_image


class Model:
    def __init__(self, app, model_filename = 'seasons.pkl'):
        self.path_to_imgs = Path(app.config['UPLOADED_PATH'])
        self.path_to_models = Path(app.config['MODELS_PATH'])
        self.model_filename = model_filename
        self.result = []

    def predict_season(self):
        learn = load_learner(self.path_to_models, self.model_filename)
        cats = learn.data.classes
        imgs = [open_image(img_path) for img_path in path_to_imgs.ls()]
        preds = [cats[learn.predict(img)[1]] for img in imgs]
        self.result = [(str(i), p) for i, p in zip(path_to_imgs.ls(), preds)]
        return self.result
