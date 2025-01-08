package controllers

import (
	"log"
	beego "github.com/beego/beego/v2/server/web"
)

type GetProduct struct {
	beego.Controller
}

func (c *GetProduct) Get() {
	getItemIDsController := &UseLocationSlug{}
    itemIDs, err := getItemIDsController.Get()
	if err != nil {
		log.Println("Error fetching location slug: " + err.Error())
	} else if itemIDs == nil {
		log.Println("ItemIDs is empty")
	}
	apiKey, err := beego.AppConfig.Strings("API_PRODUCT")
	if err != nil {
		log.Println("Error reading API_PRODUCT: " + err.Error())
	}
	log.Println("ItemIDs: ", apiKey)
	c.TplName = "index.html"
}




