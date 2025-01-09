package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	beego "github.com/beego/beego/v2/server/web"
)

type GetLocationSlug struct {
	beego.Controller
}

type slug struct {
	LocationSlug string `json:"LocationSlug"`
}

type GeoInfo struct {
	GeoInfo slug `json:"GeoInfo"`
}

func (c *GetLocationSlug) GetLocation() {
	search := c.GetString("search")
	apiUrl, err := beego.AppConfig.String("API_LOCATION_SLUG")
	if err != nil {
		log.Println("Error reading API_LOCATION_SLUG: " + err.Error())
	}
	modifiedApiUrl := strings.ReplaceAll(apiUrl, "Dhaka", search)
    locationSlugChan := make(chan string)
    errChan := make(chan error)
    go func() {
        response, err := http.Get(modifiedApiUrl)
        if err != nil {
            errChan <- err
            return
        }
        defer response.Body.Close()
        var data GeoInfo
        if err := json.NewDecoder(response.Body).Decode(&data); err != nil {
            errChan <- err
            return
        }
        locationSlug := strings.ReplaceAll(data.GeoInfo.LocationSlug, "/", ":")
        locationSlugChan <- locationSlug
    }()
	select {
	case locationSlug := <-locationSlugChan:
		c.Ctx.Input.SetData("location_slug", locationSlug)
		useLocationSlugController := &UseLocationSlug{}
		useLocationSlugController.Controller = c.Controller
		useLocationSlugController.UseLocation()
		c.StopRun()
	case err := <-errChan:
		log.Println("Error fetching location slug: " + err.Error())
	}
}
