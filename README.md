# Marko crash

[![Greenkeeper badge](https://badges.greenkeeper.io/SimenB/marko-crash.svg)](https://greenkeeper.io/)

To reproduce
```sh-session
$ npm install
$ npm start
$ curl http://localhost:8080
```

To avoid the crash, this diff is needed:

```diff
diff --git i/server.js w/server.js
--- i/server.js
+++ w/server.js
@@ -9,8 +9,13 @@ const app = express();
 
 app.use(markoExpress());
 
-app.get('/', (req, res) => {
-    res.marko(template);
+app.get('/', (req, res, next) => {
+    const renderStream = res.marko(template);
+
+    renderStream.on('error', e => {
+        next(e);
+    });
 });
 
 app.use((err, req, res, next) => {

```
