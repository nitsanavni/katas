I want you to create a git-commit message.
I will give you a "git diff" output.
Look for simple rename variable refactorings.
If you find one, format output like this ". r Rename variable w to width" or "Rename function hypot(x, y) to hypotenuse(x, y)"

here's the diff:

diff --git a/auto-git-committer/my_script.py b/auto-git-committer/my_script.py
index a829a25..b2357c0 100644
--- a/auto-git-committer/my_script.py
+++ b/auto-git-committer/my_script.py
@@ -4,10 +4,10 @@ def greet_world():
 
 # def calc_rect_area(w, h):
 # hypotenuse - the sqrt(x^2 + y^2), x,y - the height and width
-def hypot(x, y):
+def hypotenuse(x, y):
     return 42
 
 
 def applesauce():
-    dummy = hypot(3, 4)
-    dummy2 = hypot(5, 12)
+    dummy = hypotenuse(3, 4)
+    dummy2 = hypotenuse(5, 12)
