package controllers

import (
	"log"
	"strings"
	"encoding/json"
	"net/http"
	beego "github.com/beego/beego/v2/server/web"
)

type UseLocationSlug struct {
	beego.Controller
}

type ItemIDs struct {
	ItemIDs []string `json:"ItemIDs"`
}

type Result struct {
	Result ItemIDs `json:"Result"`
}

func (c *UseLocationSlug) UseLocation() {
	locationSlug := c.Ctx.Input.GetData("location_slug").(string)
	apiUrl, err := beego.AppConfig.String("API_ITEM_IDS")
	if err != nil {
		log.Println("Error reading API_ITEM_IDS: " + err.Error())
	}
	modifiedUrl := strings.ReplaceAll(apiUrl, "bangladesh:dhaka-division:dhaka:973", locationSlug)
	itemIdsChan := make(chan []string)
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
		defer response.Body.Close()
		var data Result
		if err := json.NewDecoder(response.Body).Decode(&data); err != nil {
			errChan <- err
			return
		}
		itemIdsChan <- data.Result.ItemIDs
	}()
	select {
		case itemIds := <-itemIdsChan:
			c.Ctx.Input.SetData("item_ids", itemIds)
			propertyController := &GetProperty{}
			propertyController.Controller = c.Controller
			propertyController.Get()
			c.StopRun()
		case err := <-errChan:
			log.Println("Error fetching item IDs: " + err.Error())
	}
}
