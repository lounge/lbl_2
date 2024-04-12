from spin_sdk import http, sqlite
from spin_sdk.http import Request, Response
from spin_sdk.sqlite import Value_Integer, Value_Text
from datetime import date


# def handle_request(request):

#     datetime.date().
#     return Response(200,
#                     {"content-type": "text/plain"},
#                     bytes(f"jiddi jadda BE 0.1.0 osv...", "utf-8"))


class IncomingHandler(http.IncomingHandler):
    def handle_request(self, request: Request) -> Response:
            print(date.today())

            with sqlite.open_default() as db:
                print("Connected to SQLite")
                db.execute("INSERT INTO todos (description, due) VALUES (?, ?)", [Value_Text("test"), Value_Text("2024-04-11")])
                            
            return Response(
                200,
                {"content-type": "text/plain"},
                bytes(f"jiddi jadda BE 0.2.0 osv...", "utf-8"))