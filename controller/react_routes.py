# type: ignore
from flask import (
    render_template,
    send_from_directory,
    url_for,
    redirect,
)
from werkzeug import Response

from app import app
from config import client_build_dir


@app.route("/")
def index():
    return redirect(url_for("home"))


@app.route("/web/<path:path>")
def any_root_path(path) -> Response:
    return render_template("index.html")


@app.route("/web/static/<path:path>")
def serve(path) -> Response:
    return send_from_directory(client_build_dir + "/static", path)


@app.route("/web/assets/<path:path>")
def serve_assets(path) -> Response:
    return send_from_directory(client_build_dir + "/assets", path)


@app.route("/web/manifest.json")
def serve_manifest() -> Response:
    return send_from_directory(client_build_dir, "manifest.json")


@app.route("/web/service-worker.js")
def service_worker_for_react() -> Response:
    return send_from_directory(client_build_dir, "service-worker.js")


@app.route("/web/assets/images/logo.png")
def logo() -> Response:
    return send_from_directory(client_build_dir, "logo.png")


@app.route("/web/assets/images/favicon.png")
def favicon() -> Response:
    return send_from_directory(client_build_dir, "favicon.png")


@app.route("/web/og-image.png")
def og_image() -> Response:
    return send_from_directory(client_build_dir, "og-image.png")


@app.route("/web")
def home() -> Response:
    return render_template("index.html")
