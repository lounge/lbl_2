from spin_sdk import http
from spin_sdk.http import Request, Response


class IncomingHandler(http.IncomingHandler):
    def handle_request(self, request: Request) -> Response:
        return Response(
            200,
            {"content-type": "text/plain"},
            bytes("jiddi jadda BE 0.2.0 osv...", "utf-8"))