(ns flickruploader.views.login
  (:require noir.response)
  (:use [noir.core :only [defpage]]
        [noir.response :only [content-type]]
        [hiccup.core :only [html]]
        [clojure.core :only [slurp]]))


(defpage "/" []
  ;; (. (java.io.File. ".") getCanonicalPath))
  (content-type "text/html" (slurp "static/login.html")))


(defpage "/json/:key" {key :key}
  (noir.response/json {key 42}))
