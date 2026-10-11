"""Completes the onboarding of the devcontainer's Home Assistant on its own.

Creates the test account admin / admin and goes through the remaining
onboarding steps, so http://localhost:8123 opens on the login page. Does
nothing once the onboarding is done (an existing instance keeps its users).
"""

import json
import time
import urllib.error
import urllib.parse
import urllib.request

BASE = "http://127.0.0.1:8123"
CLIENT_ID = f"{BASE}/"
USER = {"name": "Admin", "username": "admin", "password": "admin", "language": "fr"}


def request(path, data=None, token=None, form=False):
    headers = {}
    body = None
    if token:
        headers["Authorization"] = f"Bearer {token}"
    if data is not None:
        if form:
            body = urllib.parse.urlencode(data).encode()
            headers["Content-Type"] = "application/x-www-form-urlencoded"
        else:
            body = json.dumps(data).encode()
            headers["Content-Type"] = "application/json"
    req = urllib.request.Request(BASE + path, data=body, headers=headers)
    with urllib.request.urlopen(req, timeout=10) as response:
        text = response.read().decode()
        return json.loads(text) if text else None


def wait_for_home_assistant(timeout=900):
    """Onboarding steps, once the HTTP server answers."""
    deadline = time.time() + timeout
    while time.time() < deadline:
        try:
            return request("/api/onboarding")
        except (urllib.error.URLError, ConnectionError, TimeoutError):
            time.sleep(5)
    raise SystemExit("onboard: Home Assistant did not answer, onboarding skipped")


def main():
    steps = {step["step"]: step["done"] for step in wait_for_home_assistant()}
    if steps.get("user"):
        return
    code = request("/api/onboarding/users", {**USER, "client_id": CLIENT_ID})["auth_code"]
    token = request(
        "/auth/token",
        {"grant_type": "authorization_code", "code": code, "client_id": CLIENT_ID},
        form=True,
    )["access_token"]
    request("/api/onboarding/core_config", {}, token)
    request("/api/onboarding/analytics", {}, token)
    request(
        "/api/onboarding/integration",
        {"client_id": CLIENT_ID, "redirect_uri": f"{BASE}/?auth_callback=1"},
        token,
    )
    print("onboard: account admin / admin created")


if __name__ == "__main__":
    main()
