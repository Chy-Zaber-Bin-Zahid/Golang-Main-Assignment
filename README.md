# Golang-Main-Assignment
## Project Setup
**Clone Repo:**
```
git clone https://github.com/Chy-Zaber-Bin-Zahid/Golang-Main-Assignment.git
```
**Change Directory:**
```
cd Golang-Main-Assignment/rentbyowner
```
**Crete app.conf File**
```
mkdir conf
cd conf
touch app.conf
```
**Add These Data To app.conf:**
```
appname = rentbyowner
httpport = 8080
runmode = dev
API_LOCATION_SLUG = "http://beta-mda.refine.lefttravel.com/v1/location?keyword=Dhaka"
API_ITEM_IDS = "http://beta-mda.refine.lefttravel.com/v1/category/details/bangladesh:dhaka-division:dhaka:973?order=1&page=1&limit=192&feeds=11-12-24&items=1&locations=BD&device=desktop"
API_PROPERTY = "http://beta-mda.refine.lefttravel.com/v1/property/bookmark?propertyIdList=!REPLACE!&countryCode=%20US&locations=%20BD&device=%20desktop"
```
**Change Directory To rentbyowner:**
```
cd ..
```
**Install Beego:**
```
go install github.com/beego/bee/v2@latest
go mod tidy
```
**Run Beego:**
```
bee run
```
**Open Browser And Go To This URL:**
```
http://localhost:8080/refine?search=Dhaka
```