(ns flickruploader.server
  (:require [noir.server :as server]))

(server/load-views "src/flickruploader/views/")

(defn -main [& m]
  (let [mode (keyword (or (first m) :dev))
        port (Integer. (get (System/getenv) "FLICKRUPLOADR_PORT" "7070"))]
    (server/start port {:mode mode
                        :ns 'flickruploader})))
