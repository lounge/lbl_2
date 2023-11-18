from spin_http import Response


def handle_request(request):

    return Response(200,
                    {"content-type": "text/plain"},
                    bytes(f"jiddi jadda BE 0.1.0 osv...", "utf-8"))
