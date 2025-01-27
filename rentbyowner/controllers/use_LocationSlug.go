package controllers

import (
	"fmt"
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
	locationSlug := c.Ctx.Input.Param(":locationSlug")
	var startDate, endDate string
	var guestNumber, pLow, pHigh interface{}
	parts := strings.Split(locationSlug, "|")
	log.Println("Hello -------------------------------", parts)
	if len(parts) == 6 {
		locationSlug = parts[0]
		startDate = parts[1]
		endDate = parts[2]
		guestNumber = parts[3]
		pLow = parts[4]
		pHigh = parts[5]
	} else {
		locationSlug = parts[0]
		guestNumber = parts[1]
		pLow = parts[2]
		pHigh = parts[3]
	}
	apiUrl, err := beego.AppConfig.String("API_ITEM_IDS")
	if err != nil {
		log.Println("Error reading API_ITEM_IDS: " + err.Error())
	}
	modifiedUrl := strings.ReplaceAll(apiUrl, "bangladesh:dhaka-division:dhaka:973", locationSlug)
	log.Println(pLow, pHigh)
	if startDate != "" {
		if pLow == "0" && pHigh == "0" {
			modifiedUrl = fmt.Sprintf("%s&dateStart=%s&dateEnd=%s&pax=%s", modifiedUrl, startDate, endDate, guestNumber)
			log.Println("changes---------------------------", modifiedUrl)
		} else {
			modifiedUrl = fmt.Sprintf("%s&dateStart=%s&dateEnd=%s&pax=%s&amount=%v-%v", modifiedUrl, startDate, endDate, guestNumber, pLow, pHigh)
			log.Println("changes---------------------------", modifiedUrl)
		}
	} else {
		if pLow == "0" && pHigh == "0" {
			modifiedUrl = fmt.Sprintf("%s&pax=%v", modifiedUrl, guestNumber)
			log.Println("asdas---------------------------", modifiedUrl)
		} else {
			modifiedUrl = fmt.Sprintf("%s&pax=%v&amount=%v-%v", modifiedUrl, guestNumber, pLow, pHigh)
			log.Println("asdas---------------------------", modifiedUrl)
		}
	}
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
			log.Println("ids:", itemIds)
			c.Data["json"] = itemIds
			c.ServeJSON()
		case err := <-errChan:
			log.Println("Error fetching item IDs: " + err.Error())
	}
}
