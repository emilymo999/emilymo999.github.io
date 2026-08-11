import http.server
import os
import posixpath
import urllib.parse

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def translate_path(self, path):
        parsed = urllib.parse.urlsplit(path)
        clean_path = posixpath.normpath(urllib.parse.unquote(parsed.path))
        fs_path = os.path.join(os.getcwd(), clean_path.lstrip("/"))

        if clean_path == "/" or os.path.isdir(fs_path):
            candidate = os.path.join(fs_path, "index.html")
            if os.path.isfile(candidate):
                return candidate
        elif not os.path.exists(fs_path):
            candidate = fs_path + ".html"
            if os.path.isfile(candidate):
                return candidate

        return super().translate_path(path)

if __name__ == "__main__":
    http.server.test(HandlerClass=CleanURLHandler, port=8000)
