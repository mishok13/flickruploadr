(ns flickruploader.views.login
  (:require noir.response)
  (:use [noir.core :only [defpage]]
        [hiccup.core :only [html]]))


(defpage "/" []
  "It works!")


(defpage "/json/:key" {key :key}
  (noir.response/json {key 42}))
