# type: ignore
from flask import send_from_directory, render_template, url_for
from werkzeug import Response
from app import app
from config import client_build_dir


@app.route("/")
def index():
    url = url_for("static", filename="bundle.js")
    return render_template("index.html", bundle=url)


@app.route("/web/static/<path:path>")
def serve(path) -> Response:
    return send_from_directory("client/build/static", path)


@app.route("/web/fonts/<path:path>")
def serve_fonts(path) -> Response:
    return send_from_directory("client/build/fonts", path)


@app.route("/web/service-worker.js")
def serviceworkerForReact() -> Response:
    return send_from_directory("client/build", "service-worker.js")


@app.route("/web/favicon.ico")
def favicon() -> Response:
    return send_from_directory("client/build", "favicon.ico")


@app.route("/web/assets/<path:path>")
def serve_assets(path) -> Response:
    return send_from_directory(client_build_dir + "/assets", path)


@app.route("/web/og-image.png")
def og_image() -> Response:
    return send_from_directory("client/build", "og-image.png")
