package controllers

import (
	"log"
	"net/http"
	"strings"
	beego "github.com/beego/beego/v2/server/web"
)

type GetProperty struct {
	beego.Controller
}

type Property struct {
	Amenities Amenities `json:"Amenities"`
	FeatureImage string `json:"FeatureImage"`
	Price float64 `json:"Price"`
	PropertyName string `json:"PropertyName"`
	PropertyType string `json:"PropertyType"`
	
}

type Item struct {
    Property  Property `json:"Property"`
}

type Items struct {
    Items []Item `json:"Items"`
}

func (c *GetProperty) Get() {
	getItemIDsController := &UseLocationSlug{}
    itemIDs, err := getItemIDsController.Get()
	if err != nil {
		log.Println("Error fetching location slug: " + err.Error())
	} else if itemIDs == nil {
		log.Println("ItemIDs is empty")
	}
	apiKey, err := beego.AppConfig.String("API_PROPERTY")
	if err != nil {
		log.Println("Error reading API_PROPERTY: " + err.Error())
	}
	var allIDs string
	for i, id := range itemIDs {
		if i == len(itemIDs)-1 {
			allIDs += id
		} else {
			allIDs += id + ","
		}
	}
	modifiedUrl := strings.ReplaceAll(apiKey, "!REPLACE!", allIDs)
	productChan := make(chan string)
	errChan := make(chan error)
	go func() {
		req, err := http.NewRequest("GET", modifiedUrl, nil)
		if err != nil {
			errChan <- err
			return
		}
		req.Header.Set("Accept-Language", "en-US")
		req.Header.Set("Origin", "rentbyowner.com")
		client := &http.Client{}
		response, err := client.Do(req)
		if err != nil {
			errChan <- err
			return
		}
		var data Property

	}()
	c.TplName = "index.html"
}




