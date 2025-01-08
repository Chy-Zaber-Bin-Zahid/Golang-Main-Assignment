package controllers

import (
	"encoding/json"
	"log"
	"net/http"

	beego "github.com/beego/beego/v2/server/web"
)

type LocationSlug struct {
	beego.Controller
}

type slug struct {
	LocationSlug string `json:"LocationSlug"`
}

type GeoInfo struct {
	GeoInfo slug `json:"GeoInfo"`
}

func (c *LocationSlug) Get() {
	apiUrl, err := beego.AppConfig.String("API_LOCATION_SLUG")
	if err != nil {
		log.Println("Error reading API_LOCATION_SLUG: " + err.Error())
	}	
	response, err := http.Get(apiUrl)
	if err != nil {
		log.Printf("Error making GET request: %v", err)
	}
	defer response.Body.Close()
	var data GeoInfo
	if err := json.NewDecoder(response.Body).Decode(&data); err != nil {
		log.Printf("Error decoding JSON response: %v", err)
	}
	locationSlug := data.GeoInfo.LocationSlug
	log.Println("LocationSlug: " + locationSlug)
	c.TplName = "index.html"
}
