package controllers

import (
	"encoding/json"
	"log"
	"net/http"
	"strings"
	beego "github.com/beego/beego/v2/server/web"
)
 
type GetImages struct {
	beego.Controller
}

type ImageInfo struct {
	Images []string `json:"images"`
}

func (c *GetImages) GetImagesData() {
	propertyId := c.Ctx.Input.Param(":propertyId")
	apiUrl, err := beego.AppConfig.String("API_IMAGES")
	if err != nil {
		log.Println("Error reading API_IMAGES: " + err.Error())
	}
	modifiedApiUrl := strings.ReplaceAll(apiUrl, "propertyId", propertyId)
	log.Println("something-------------->", modifiedApiUrl)
    imageChan := make(chan []string)
    errChan := make(chan error)
    go func() {
        response, err := http.Get(modifiedApiUrl)
        if err != nil {
            errChan <- err
            return
        }
		defer response.Body.Close()
		var data ImageInfo
		if err := json.NewDecoder(response.Body).Decode(&data); err != nil {
            errChan <- err
            return
        }
		imageChan <- data.Images
    }()
	select {
	case images := <-imageChan:
		c.Data["json"] = images
		c.ServeJSON()
	case err := <-errChan:
		log.Println("Error fetching location slug: " + err.Error())
	}
}