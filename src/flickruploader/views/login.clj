(ns flickruploader.views.login
  (:require noir.response
            noir.request
            [oauth.client :as oauth])
  (:use [noir.core :only [defpage]]
        [hiccup.core :only [html]]
        [clojure.core :only [slurp]]
        [clj-http.client :as httpclient]))

(def ignite-host "http://localhost:8080/v1/")


(defn get-access-token [session-token]

  session-token)


(defn upload-image [access-token image services]

  )


(defpage "/" []
  (noir.response/redirect "/index.html"))

(defpage [:post "/image"] {:keys [image services session_token]}
  (let [access-token (get-access-token session_token)]
    (str (clojure.string/split services #","))))



;; (defpage "/login/facebook" []
;;   "No")


;; (def consumer (oauth/make-consumer "9aa1bb3feceab6d09df87d0c6ac6d294"
;;                                    "b41d692d694c31b1"
;;                                    "http://www.flickr.com/services/oauth/request_token"
;;                                    "http://www.flickr.com/services/oauth/access_token"
;;                                    "http://www.flickr.com/services/oauth/authorize"
;;                                    :hmac-sha1))


;; (defpage "/login/flickr" []
;;   (let [callback "http://localhost:7070/auth_callback"
;;         request-token (oauth/request-token consumer callback)]
;;     (println request-token)
;;     (noir.response/redirect (oauth/user-approval-uri consumer
;;                                                      (:oauth_token request-token)))))


;; (defpage "/auth_callback" {:keys [oauth_token oauth_verifier]}
;;   "almost")
;;   ;; (oauth/access-token consumer oauth_token oauth_verifier))


;; (defpage "/json/:key" {key :key}
;;   (noir.response/json {key 42}))
