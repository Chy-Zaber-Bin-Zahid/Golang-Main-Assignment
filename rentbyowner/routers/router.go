package routers

import (
	"rentbyowner/controllers"
	beego "github.com/beego/beego/v2/server/web"
)

func init() {
    ns := beego.NewNamespace("/api/v1",
		beego.NSRouter("/keyword/:keyword", &controllers.GetLocationSlug{}, "get:GetLocation"),
		beego.NSRouter("/locationSlug/:locationSlug", &controllers.UseLocationSlug{}, "get:UseLocation"),
		beego.NSRouter("/itemIds/:itemIds", &controllers.GetProperty{}, "get:GetPropertyData"),
    )
	beego.Router("/refine", &controllers.MainController{})
    beego.AddNamespace(ns)

}
